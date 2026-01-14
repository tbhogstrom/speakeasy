import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Plus, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePrivacyMode } from '@/contexts/PrivacyModeContext';
import type { Eval, EvalTask } from '@/types/slp';

const initialEvals: Eval[] = [
  {
    id: '1',
    studentId: '1',
    studentName: 'Emma Johnson',
    type: 'initial',
    status: 'testing',
    dueDate: new Date('2026-02-15'),
    scheduledDate: new Date('2026-01-20'),
    notes: 'Parent concern: articulation',
    tasks: [
      { id: '1-1', description: 'Send consent forms to parent', completed: true },
      { id: '1-2', description: 'Schedule testing sessions', completed: true },
      { id: '1-3', description: 'Complete GFTA-3', completed: false },
      { id: '1-4', description: 'Complete CELF-5', completed: false },
      { id: '1-5', description: 'Observe in classroom', completed: false },
      { id: '1-6', description: 'Write report', completed: false },
      { id: '1-7', description: 'Schedule IEP meeting', completed: false },
    ],
  },
];

const statusConfig = {
  scheduled: { label: 'Scheduled', color: 'bg-blue-100 text-blue-800' },
  testing: { label: 'Testing', color: 'bg-yellow-100 text-yellow-800' },
  writing: { label: 'Writing Report', color: 'bg-purple-100 text-purple-800' },
  completed: { label: 'Completed', color: 'bg-green-100 text-green-800' },
};

const typeLabels = {
  initial: 'Initial Evaluation',
  triennial: 'Triennial',
  'reeval': 'Re-Evaluation',
};

export function EvalsView() {
  const [evals, setEvals] = useState<Eval[]>(initialEvals);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { maskPII } = usePrivacyMode();
  const [newEval, setNewEval] = useState({
    studentName: '',
    type: 'initial' as Eval['type'],
    dueDate: '',
    notes: '',
  });

  const handleToggleTask = (evalId: string, taskId: string) => {
    setEvals(
      evals.map((evaluation) => {
        if (evaluation.id === evalId && evaluation.tasks) {
          const updatedTasks = evaluation.tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
          );
          return { ...evaluation, tasks: updatedTasks };
        }
        return evaluation;
      })
    );
  };

  const handleAddEval = () => {
    if (!newEval.studentName) return;

    const evaluation: Eval = {
      id: crypto.randomUUID(),
      studentId: crypto.randomUUID(),
      studentName: newEval.studentName,
      type: newEval.type,
      status: 'scheduled',
      dueDate: newEval.dueDate ? new Date(newEval.dueDate) : undefined,
      notes: newEval.notes,
      tasks: [
        { id: crypto.randomUUID(), description: 'Send consent forms', completed: false },
        { id: crypto.randomUUID(), description: 'Schedule testing sessions', completed: false },
        { id: crypto.randomUUID(), description: 'Complete assessments', completed: false },
        { id: crypto.randomUUID(), description: 'Classroom observation', completed: false },
        { id: crypto.randomUUID(), description: 'Write evaluation report', completed: false },
        { id: crypto.randomUUID(), description: 'Schedule eligibility meeting', completed: false },
      ],
    };

    setEvals([...evals, evaluation]);
    setNewEval({ studentName: '', type: 'initial', dueDate: '', notes: '' });
    setIsDialogOpen(false);
  };

  const getProgress = (evaluation: Eval) => {
    if (!evaluation.tasks || evaluation.tasks.length === 0) return 0;
    const completed = evaluation.tasks.filter((t) => t.completed).length;
    return Math.round((completed / evaluation.tasks.length) * 100);
  };

  const formatDate = (date?: Date) => {
    if (!date) return 'Not set';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Evaluations</h1>
            <p className="text-muted-foreground">Track evaluation progress and deadlines</p>
          </div>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Evaluation
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Evaluation</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="studentName">Student Name</Label>
                <Input
                  id="studentName"
                  value={newEval.studentName}
                  onChange={(e) => setNewEval({ ...newEval, studentName: e.target.value })}
                  placeholder="Student name"
                />
              </div>
              <div>
                <Label htmlFor="type">Evaluation Type</Label>
                <select
                  id="type"
                  className="w-full p-2 border rounded-md"
                  value={newEval.type}
                  onChange={(e) => setNewEval({ ...newEval, type: e.target.value as Eval['type'] })}
                >
                  <option value="initial">Initial Evaluation</option>
                  <option value="triennial">Triennial</option>
                  <option value="re-eval">Re-Evaluation</option>
                </select>
              </div>
              <div>
                <Label htmlFor="dueDate">Due Date (optional)</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newEval.dueDate}
                  onChange={(e) => setNewEval({ ...newEval, dueDate: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="notes">Notes (optional)</Label>
                <Textarea
                  id="notes"
                  value={newEval.notes}
                  onChange={(e) => setNewEval({ ...newEval, notes: e.target.value })}
                  placeholder="Parent concerns, referral reason, etc."
                  rows={3}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddEval}>Add Evaluation</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {evals.map((evaluation) => {
          const progress = getProgress(evaluation);
          const statusConf = statusConfig[evaluation.status];

          return (
            <Card key={evaluation.id}>
              <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl">{maskPII(evaluation.studentName, 'name')}</CardTitle>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="outline">{typeLabels[evaluation.type]}</Badge>
                      <Badge className={`${statusConf.color} border-0`}>{statusConf.label}</Badge>
                    </div>
                    {evaluation.dueDate && (
                      <p className="text-sm text-muted-foreground mt-2">
                        Due: {formatDate(evaluation.dueDate)}
                      </p>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>

                  {evaluation.tasks && evaluation.tasks.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Tasks:</h4>
                      <div className="space-y-2">
                        {evaluation.tasks.map((task) => (
                          <div
                            key={task.id}
                            className="flex items-start gap-3 p-2 rounded-md hover:bg-accent/50 transition-colors"
                          >
                            <Checkbox
                              id={task.id}
                              checked={task.completed}
                              onCheckedChange={() => handleToggleTask(evaluation.id, task.id)}
                              className="mt-1"
                            />
                            <label
                              htmlFor={task.id}
                              className={`flex-1 cursor-pointer ${
                                task.completed ? 'line-through text-muted-foreground' : ''
                              }`}
                            >
                              {task.description}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {evaluation.notes && (
                    <div className="pt-2 border-t">
                      <p className="text-sm text-muted-foreground">
                        <strong>Notes:</strong> {evaluation.notes}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
