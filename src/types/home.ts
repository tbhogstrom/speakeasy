export interface Task {
  id: string;
  description: string;
  completed: boolean;
  timeEstimate?: number; // in minutes
  createdAt: Date;
}

export interface DeclutterProject {
  id: string;
  title: string;
  description: string;
  roomId: string;
  status: 'not-started' | 'in-progress' | 'completed';
  priority: 'high' | 'medium' | 'low';
  tasks: Task[];
  notes?: string;
  createdAt: Date;
  completedAt?: Date;
}

export interface Room {
  id: string;
  name: string;
  icon: string; // lucide icon name
  color: string; // tailwind color class
  projectCount: number;
  completedCount: number;
}

export interface LaundryLoad {
  id: string;
  type: 'rags' | 'tyler-laundry' | 'kailey-laundry' | 'sylvie-laundry' | 'sheets' | 'blankets' | 'diapers' | 'towels' | 'heavily-soiled';
  status: 'dirty' | 'washing' | 'drying' | 'clean' | 'folded' | 'put-away';
  startedAt?: Date;
  completedAt?: Date;
  notes?: string;
}
