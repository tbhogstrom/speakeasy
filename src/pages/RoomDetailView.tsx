import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Plus, ArrowLeft, Clock } from 'lucide-react';
import type { DeclutterProject, Task } from '@/types/home';

const bathRoomProjects: DeclutterProject[] = [
  {
    id: '1',
    title: 'Empty basket of random stuff on bathroom cart',
    description: 'The basket has accumulated random items that need to find their proper homes',
    roomId: '1',
    status: 'not-started',
    priority: 'high',
    createdAt: new Date(),
    tasks: [
      { id: '1-1', description: 'Take everything out of basket', completed: false, timeEstimate: 5, createdAt: new Date() },
      { id: '1-2', description: 'Sort items into categories (keep, trash, relocate)', completed: false, timeEstimate: 10, createdAt: new Date() },
      { id: '1-3', description: 'Throw away trash items', completed: false, timeEstimate: 2, createdAt: new Date() },
      { id: '1-4', description: 'Put "relocate" items in a pile', completed: false, timeEstimate: 3, createdAt: new Date() },
      { id: '1-5', description: 'Put away 5 items from relocate pile', completed: false, timeEstimate: 5, createdAt: new Date() },
      { id: '1-6', description: 'Organize remaining "keep" items back in basket', completed: false, timeEstimate: 5, createdAt: new Date() },
    ],
  },
];

const officeProjects: DeclutterProject[] = [
  {
    id: '2',
    title: 'Clean office floor',
    description: 'Floor has papers, boxes, and miscellaneous items that need organizing',
    roomId: '2',
    status: 'not-started',
    priority: 'high',
    createdAt: new Date(),
    tasks: [
      { id: '2-1', description: 'Pick up all papers from floor', completed: false, timeEstimate: 10, createdAt: new Date() },
      { id: '2-2', description: 'Sort papers: keep, recycle, shred', completed: false, timeEstimate: 15, createdAt: new Date() },
      { id: '2-3', description: 'File or organize "keep" papers', completed: false, timeEstimate: 10, createdAt: new Date() },
      { id: '2-4', description: 'Move boxes to proper storage', completed: false, timeEstimate: 10, createdAt: new Date() },
      { id: '2-5', description: 'Vacuum the cleared floor', completed: false, timeEstimate: 5, createdAt: new Date() },
    ],
  },
];

const roomProjects: { [key: string]: DeclutterProject[] } = {
  '1': bathRoomProjects,
  '2': officeProjects,
};

const roomNames: { [key: string]: string } = {
  '1': 'Bathroom',
  '2': 'Office',
  '3': 'Kitchen',
  '4': 'Bedroom',
  '5': 'Living Room',
  '6': 'Garage/Storage',
};

const statusColors = {
  'not-started': { badge: 'bg-gray-100 text-gray-800', label: 'Not Started' },
  'in-progress': { badge: 'bg-blue-100 text-blue-800', label: 'In Progress' },
  completed: { badge: 'bg-green-100 text-green-800', label: 'Completed' },
};

const priorityColors = {
  high: { badge: 'bg-red-100 text-red-800', label: 'High' },
  medium: { badge: 'bg-yellow-100 text-yellow-800', label: 'Medium' },
  low: { badge: 'bg-gray-100 text-gray-800', label: 'Low' },
};

export function RoomDetailView() {
  const { roomId } = useParams<{ roomId: string }>();
  const [projects, setProjects] = useState<DeclutterProject[]>(
    roomProjects[roomId || '1'] || []
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    priority: 'medium' as DeclutterProject['priority'],
    tasks: '',
  });

  const roomName = roomNames[roomId || '1'] || 'Room';

  const handleToggleTask = (projectId: string, taskId: string) => {
    setProjects(
      projects.map((project) => {
        if (project.id === projectId) {
          const updatedTasks = project.tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
          );
          const allCompleted = updatedTasks.every((task) => task.completed);
          return {
            ...project,
            tasks: updatedTasks,
            status: allCompleted ? 'completed' as const : 'in-progress' as const,
            completedAt: allCompleted ? new Date() : undefined,
          };
        }
        return project;
      })
    );
  };

  const handleAddProject = () => {
    if (!newProject.title) return;

    const project: DeclutterProject = {
      id: crypto.randomUUID(),
      title: newProject.title,
      description: newProject.description,
      roomId: roomId || '1',
      status: 'not-started',
      priority: newProject.priority,
      createdAt: new Date(),
      tasks: newProject.tasks
        .split('\n')
        .filter((t) => t.trim())
        .map((t) => ({
          id: crypto.randomUUID(),
          description: t.trim(),
          completed: false,
          createdAt: new Date(),
        })),
    };

    setProjects([...projects, project]);
    setNewProject({ title: '', description: '', priority: 'medium', tasks: '' });
    setIsDialogOpen(false);
  };

  const getProjectProgress = (project: DeclutterProject) => {
    if (project.tasks.length === 0) return 0;
    const completed = project.tasks.filter((t) => t.completed).length;
    return Math.round((completed / project.tasks.length) * 100);
  };

  const getTotalTime = (tasks: Task[]) => {
    return tasks.reduce((sum, task) => sum + (task.timeEstimate || 0), 0);
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
            <h1 className="text-3xl font-bold tracking-tight">{roomName}</h1>
            <p className="text-muted-foreground">
              {projects.length} decluttering{' '}
              {projects.length === 1 ? 'project' : 'projects'}
            </p>
          </div>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>New Decluttering Project</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Project Title</Label>
                <Input
                  id="title"
                  value={newProject.title}
                  onChange={(e) =>
                    setNewProject({ ...newProject, title: e.target.value })
                  }
                  placeholder="e.g., Empty junk drawer"
                />
              </div>
              <div>
                <Label htmlFor="description">Description (optional)</Label>
                <Textarea
                  id="description"
                  value={newProject.description}
                  onChange={(e) =>
                    setNewProject({ ...newProject, description: e.target.value })
                  }
                  placeholder="What's the current situation?"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="priority">Priority</Label>
                <select
                  id="priority"
                  className="w-full p-2 border rounded-md"
                  value={newProject.priority}
                  onChange={(e) =>
                    setNewProject({
                      ...newProject,
                      priority: e.target.value as DeclutterProject['priority'],
                    })
                  }
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div>
                <Label htmlFor="tasks">Break it into small tasks (one per line)</Label>
                <Textarea
                  id="tasks"
                  value={newProject.tasks}
                  onChange={(e) =>
                    setNewProject({ ...newProject, tasks: e.target.value })
                  }
                  placeholder="Take everything out&#10;Sort into piles&#10;Put away 5 items"
                  rows={6}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Tip: Make tasks really small and specific. "Start" is easier than "Finish"!
                </p>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddProject}>Add Project</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {projects.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              No projects yet. Click "New Project" to add one!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {projects.map((project) => {
            const progress = getProjectProgress(project);
            const statusConfig = statusColors[project.status];
            const priorityConfig = priorityColors[project.priority];
            const totalTime = getTotalTime(project.tasks);

            return (
              <Card key={project.id} className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                      {project.description && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {project.description}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <Badge className={`${priorityConfig.badge} border-0`}>
                        {priorityConfig.label}
                      </Badge>
                      <Badge className={`${statusConfig.badge} border-0`}>
                        {statusConfig.label}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Progress</span>
                        <div className="flex items-center gap-2">
                          {totalTime > 0 && (
                            <span className="flex items-center gap-1 text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              ~{totalTime}min
                            </span>
                          )}
                          <span className="font-medium">{progress}%</span>
                        </div>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>

                    {project.tasks.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Tasks:</h4>
                        <div className="space-y-2">
                          {project.tasks.map((task) => (
                            <div
                              key={task.id}
                              className="flex items-start gap-3 p-2 rounded-md hover:bg-accent/50 transition-colors"
                            >
                              <Checkbox
                                id={task.id}
                                checked={task.completed}
                                onCheckedChange={() =>
                                  handleToggleTask(project.id, task.id)
                                }
                                className="mt-1"
                              />
                              <label
                                htmlFor={task.id}
                                className={`flex-1 cursor-pointer ${
                                  task.completed
                                    ? 'line-through text-muted-foreground'
                                    : ''
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span>{task.description}</span>
                                  {task.timeEstimate && (
                                    <span className="text-xs text-muted-foreground ml-2">
                                      ~{task.timeEstimate}min
                                    </span>
                                  )}
                                </div>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
