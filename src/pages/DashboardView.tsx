import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import {
  Home,
  Bath,
  Utensils,
  Bed,
  Sofa,
  Briefcase,
  Warehouse,
  Sparkles,
} from 'lucide-react';
import type { Room } from '@/types/home';

const iconMap = {
  Home,
  Bath,
  Utensils,
  Bed,
  Sofa,
  Briefcase,
  Warehouse,
  Sparkles,
};

const initialRooms: Room[] = [
  {
    id: '1',
    name: 'Bathroom',
    icon: 'Bath',
    color: 'bg-blue-100 text-blue-800',
    projectCount: 3,
    completedCount: 0,
  },
  {
    id: '2',
    name: 'Office',
    icon: 'Briefcase',
    color: 'bg-purple-100 text-purple-800',
    projectCount: 2,
    completedCount: 0,
  },
  {
    id: '3',
    name: 'Kitchen',
    icon: 'Utensils',
    color: 'bg-green-100 text-green-800',
    projectCount: 1,
    completedCount: 0,
  },
  {
    id: '4',
    name: 'Bedroom',
    icon: 'Bed',
    color: 'bg-pink-100 text-pink-800',
    projectCount: 2,
    completedCount: 0,
  },
  {
    id: '5',
    name: 'Living Room',
    icon: 'Sofa',
    color: 'bg-yellow-100 text-yellow-800',
    projectCount: 1,
    completedCount: 0,
  },
  {
    id: '6',
    name: 'Garage/Storage',
    icon: 'Warehouse',
    color: 'bg-gray-100 text-gray-800',
    projectCount: 0,
    completedCount: 0,
  },
];

export function DashboardView() {
  const [rooms, setRooms] = useState<Room[]>(initialRooms);

  const totalProjects = rooms.reduce((sum, room) => sum + room.projectCount, 0);
  const totalCompleted = rooms.reduce((sum, room) => sum + room.completedCount, 0);
  const overallProgress = totalProjects > 0 ? (totalCompleted / totalProjects) * 100 : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">House Love</h1>
        <p className="text-muted-foreground mt-2">
          Breaking down the overwhelming into manageable tasks
        </p>
      </div>

      <Card className="bg-gradient-to-br from-primary/10 to-secondary/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Overall Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Projects Completed</span>
              <span className="font-medium">
                {totalCompleted} of {totalProjects}
              </span>
            </div>
            <Progress value={overallProgress} className="h-3" />
            <p className="text-xs text-muted-foreground">
              You're making progress! Every small task counts.
            </p>
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Rooms & Areas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rooms.map((room) => {
            const Icon = iconMap[room.icon as keyof typeof iconMap] || Home;
            const progress =
              room.projectCount > 0
                ? (room.completedCount / room.projectCount) * 100
                : 0;

            return (
              <Link key={room.id} to={`/room/${room.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${room.color}`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <CardTitle className="text-lg">{room.name}</CardTitle>
                      </div>
                      {room.projectCount > 0 && (
                        <Badge variant="secondary">
                          {room.projectCount} projects
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    {room.projectCount > 0 ? (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">
                            {room.completedCount}/{room.projectCount}
                          </span>
                        </div>
                        <Progress value={progress} />
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No active projects
                      </p>
                    )}
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Tip</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Feeling overwhelmed? Start with just ONE small task. "Empty basket of
            random stuff" becomes easier when you break it into: "Sort items",
            "Put away 5 items", "Discard trash". You've got this!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
