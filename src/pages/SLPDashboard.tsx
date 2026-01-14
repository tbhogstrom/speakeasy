import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ClipboardCheck,
  FileText,
  DollarSign,
  Package,
  UserCheck,
  Calendar,
  MessageCircle,
  Users,
} from 'lucide-react';

const sections = [
  {
    id: 'students',
    title: 'Students',
    icon: Users,
    color: 'bg-indigo-100 text-indigo-800',
    path: '/students',
    count: 3,
    description: 'Manage student caseload and session data',
  },
  {
    id: 'evals',
    title: 'Evaluations',
    icon: ClipboardCheck,
    color: 'bg-blue-100 text-blue-800',
    path: '/evals',
    count: 3,
    description: 'Track evaluation progress and deadlines',
  },
  {
    id: 'ieps',
    title: 'IEPs',
    icon: FileText,
    color: 'bg-purple-100 text-purple-800',
    path: '/ieps',
    count: 5,
    description: 'Manage IEP meetings and annual reviews',
  },
  {
    id: 'billing',
    title: 'Billing',
    icon: DollarSign,
    color: 'bg-green-100 text-green-800',
    path: '/billing',
    count: 12,
    description: 'Track billable time and services',
  },
  {
    id: 'materials',
    title: 'Materials',
    icon: Package,
    color: 'bg-yellow-100 text-yellow-800',
    path: '/materials',
    count: 0,
    description: 'Organize therapy materials and resources',
  },
  {
    id: 'screenings',
    title: 'Screenings',
    icon: UserCheck,
    color: 'bg-pink-100 text-pink-800',
    path: '/screenings',
    count: 2,
    description: 'Schedule and track student screenings',
  },
  {
    id: 'meetings',
    title: 'Meetings',
    icon: Calendar,
    color: 'bg-cyan-100 text-cyan-800',
    path: '/meetings',
    count: 4,
    description: 'Schedule meetings and conferences',
  },
];

export function SLPDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold tracking-tight flex items-center gap-2">
          <MessageCircle className="h-8 w-8 text-primary" />
          SpeakEasy
        </h1>
        <p className="text-muted-foreground mt-2">
          Your SLP task manager - making speech therapy organization easy
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((section) => {
          const Icon = section.icon;

          return (
            <Link key={section.id} to={section.path}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${section.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-lg">{section.title}</CardTitle>
                    </div>
                    {section.count > 0 && (
                      <Badge variant="secondary">{section.count}</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {section.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      <Card className="bg-gradient-to-br from-primary/10 to-secondary/10">
        <CardHeader>
          <CardTitle>Quick Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Active Evals</p>
              <p className="text-2xl font-bold">3</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Upcoming IEPs</p>
              <p className="text-2xl font-bold">5</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Unbilled Minutes</p>
              <p className="text-2xl font-bold">240</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Meetings to Schedule</p>
              <p className="text-2xl font-bold">4</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
