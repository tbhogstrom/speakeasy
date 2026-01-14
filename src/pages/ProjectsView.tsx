import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, CheckCircle2, Circle } from 'lucide-react';

interface ProjectTask {
  id: string;
  description: string;
  completed: boolean;
}

interface Project {
  id: string;
  title: string;
  description: string;
  status: 'planning' | 'in-progress' | 'completed';
  priority: 'high' | 'medium' | 'low';
  tasks: ProjectTask[];
  notes?: string;
}

const initialProjects: Project[] = [
  {
    id: '1',
    title: 'Irrigation System Lock-Down',
    description: 'Design and install comprehensive irrigation system for all garden beds',
    status: 'planning',
    priority: 'high',
    tasks: [
      { id: '1-1', description: 'Map water source locations and pressure', completed: false },
      { id: '1-2', description: 'Calculate water needs per bed', completed: false },
      { id: '1-3', description: 'Design drip line layout', completed: false },
      { id: '1-4', description: 'Source materials (drip lines, timers, fittings)', completed: false },
      { id: '1-5', description: 'Install main lines', completed: false },
      { id: '1-6', description: 'Install drip lines per bed', completed: false },
      { id: '1-7', description: 'Set up timer system', completed: false },
      { id: '1-8', description: 'Test and adjust zones', completed: false },
    ],
    notes: 'Critical for 2026 season. Need to complete before main planting begins.',
  },
  {
    id: '2',
    title: 'Tomato Transplant Timing Protocol',
    description: 'Develop weather and soil observation system for optimal tomato transplanting',
    status: 'planning',
    priority: 'high',
    tasks: [
      { id: '2-1', description: 'Set up soil temperature monitoring system', completed: false },
      { id: '2-2', description: 'Track historical weather patterns (last frost dates)', completed: false },
      { id: '2-3', description: 'Create transplant readiness checklist', completed: false },
      { id: '2-4', description: 'Start San Marzano seeds indoors (8 weeks before transplant)', completed: false },
      { id: '2-5', description: 'Harden off seedlings (2 weeks before transplant)', completed: false },
      { id: '2-6', description: 'Monitor soil temp reaching 60°F consistently', completed: false },
      { id: '2-7', description: 'Transplant when conditions optimal', completed: false },
    ],
    notes: 'Goal: 250 lb harvest. Timing is critical for San Marzano success.',
  },
  {
    id: '3',
    title: 'Install 24 sq ft Coldframes',
    description: 'Build and install coldframes for season extension',
    status: 'planning',
    priority: 'medium',
    tasks: [
      { id: '3-1', description: 'Design coldframe dimensions and layout', completed: false },
      { id: '3-2', description: 'Source lumber, windows/polycarbonate panels', completed: false },
      { id: '3-3', description: 'Build frames', completed: false },
      { id: '3-4', description: 'Prepare site and level ground', completed: false },
      { id: '3-5', description: 'Install coldframes', completed: false },
      { id: '3-6', description: 'Add ventilation system', completed: false },
      { id: '3-7', description: 'Test with winter greens', completed: false },
    ],
    notes: 'Will extend growing season for greens and early spring starts.',
  },
  {
    id: '4',
    title: 'Root Cellar Project',
    description: 'Design and construct root cellar for winter vegetable storage',
    status: 'planning',
    priority: 'medium',
    tasks: [
      { id: '4-1', description: 'Research root cellar designs and requirements', completed: false },
      { id: '4-2', description: 'Select location (consider access and drainage)', completed: false },
      { id: '4-3', description: 'Design structure (size, ventilation, insulation)', completed: false },
      { id: '4-4', description: 'Get any necessary permits', completed: false },
      { id: '4-5', description: 'Excavate site', completed: false },
      { id: '4-6', description: 'Build structure', completed: false },
      { id: '4-7', description: 'Install ventilation system', completed: false },
      { id: '4-8', description: 'Add shelving and storage systems', completed: false },
      { id: '4-9', description: 'Test temperature and humidity levels', completed: false },
    ],
    notes: 'Long-term project. Will store pumpkins, salsify, and other root vegetables.',
  },
];

const statusColors = {
  planning: { badge: 'bg-gray-100 text-gray-800', label: 'Planning' },
  'in-progress': { badge: 'bg-blue-100 text-blue-800', label: 'In Progress' },
  completed: { badge: 'bg-green-100 text-green-800', label: 'Completed' },
};

const priorityColors = {
  high: { badge: 'bg-red-100 text-red-800', label: 'High Priority' },
  medium: { badge: 'bg-yellow-100 text-yellow-800', label: 'Medium Priority' },
  low: { badge: 'bg-gray-100 text-gray-800', label: 'Low Priority' },
};

export function ProjectsView() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    priority: 'medium' as Project['priority'],
    tasks: '',
  });

  const handleToggleTask = (projectId: string, taskId: string) => {
    setProjects(projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          tasks: project.tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
          ),
        };
      }
      return project;
    }));
  };

  const handleAddProject = () => {
    if (!newProject.title) return;

    const project: Project = {
      id: crypto.randomUUID(),
      title: newProject.title,
      description: newProject.description,
      status: 'planning',
      priority: newProject.priority,
      tasks: newProject.tasks
        .split('\n')
        .filter(t => t.trim())
        .map(t => ({
          id: crypto.randomUUID(),
          description: t.trim(),
          completed: false,
        })),
    };

    setProjects([...projects, project]);
    setNewProject({ title: '', description: '', priority: 'medium', tasks: '' });
    setIsDialogOpen(false);
  };

  const getProjectProgress = (project: Project) => {
    if (project.tasks.length === 0) return 0;
    const completed = project.tasks.filter(t => t.completed).length;
    return Math.round((completed / project.tasks.length) * 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">2026 Garden Projects</h2>
          <p className="text-muted-foreground">
            Track major projects and infrastructure improvements
          </p>
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
              <DialogTitle>New Project</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="project-title">Project Title</Label>
                <Input
                  id="project-title"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  placeholder="Project name"
                />
              </div>
              <div>
                <Label htmlFor="project-description">Description</Label>
                <Textarea
                  id="project-description"
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  placeholder="What is this project about?"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="project-priority">Priority</Label>
                <select
                  id="project-priority"
                  className="w-full p-2 border rounded-md"
                  value={newProject.priority}
                  onChange={(e) => setNewProject({ ...newProject, priority: e.target.value as Project['priority'] })}
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div>
                <Label htmlFor="project-tasks">Tasks (one per line)</Label>
                <Textarea
                  id="project-tasks"
                  value={newProject.tasks}
                  onChange={(e) => setNewProject({ ...newProject, tasks: e.target.value })}
                  placeholder="Task 1&#10;Task 2&#10;Task 3"
                  rows={6}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddProject}>
                  Add Project
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project) => {
          const progress = getProjectProgress(project);
          const statusConfig = statusColors[project.status];
          const priorityConfig = priorityColors[project.priority];

          return (
            <Card key={project.id}>
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription className="mt-1">{project.description}</CardDescription>
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
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {project.tasks.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Tasks:</h4>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {project.tasks.map((task) => (
                          <div key={task.id} className="flex items-start gap-2">
                            <Checkbox
                              id={task.id}
                              checked={task.completed}
                              onCheckedChange={() => handleToggleTask(project.id, task.id)}
                              className="mt-1"
                            />
                            <label
                              htmlFor={task.id}
                              className={`text-sm cursor-pointer flex-1 ${
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

                  {project.notes && (
                    <div className="pt-2 border-t">
                      <p className="text-sm text-muted-foreground italic">{project.notes}</p>
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
