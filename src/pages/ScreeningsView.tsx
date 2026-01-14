import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Screening } from '@/types/slp';

const initialScreenings: Screening[] = [
  {
    id: '1',
    studentName: 'Olivia Martinez',
    grade: 'Kindergarten',
    date: new Date('2026-01-20'),
    status: 'scheduled',
  },
  {
    id: '2',
    studentName: 'Noah Chen',
    grade: '2nd Grade',
    status: 'completed',
    result: 'refer',
    notes: 'Articulation concerns - refer for eval',
  },
];

const statusConfig = {
  scheduled: { label: 'Scheduled', color: 'bg-blue-100 text-blue-800' },
  completed: { label: 'Completed', color: 'bg-green-100 text-green-800' },
  'follow-up-needed': { label: 'Follow-Up Needed', color: 'bg-yellow-100 text-yellow-800' },
};

const resultConfig = {
  pass: { label: 'Pass', color: 'bg-green-100 text-green-800' },
  refer: { label: 'Refer', color: 'bg-red-100 text-red-800' },
  monitor: { label: 'Monitor', color: 'bg-yellow-100 text-yellow-800' },
};

export function ScreeningsView() {
  const [screenings] = useState<Screening[]>(initialScreenings);

  const formatDate = (date?: Date) => {
    if (!date) return 'Not scheduled';
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
            <h1 className="text-3xl font-bold tracking-tight">Screenings</h1>
            <p className="text-muted-foreground">Schedule and track student screenings</p>
          </div>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Screening
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {screenings.map((screening) => {
          const statusConf = statusConfig[screening.status];
          const resultConf = screening.result ? resultConfig[screening.result] : null;

          return (
            <Card key={screening.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{screening.studentName}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {screening.grade} • {formatDate(screening.date)}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge className={`${statusConf.color} border-0`}>{statusConf.label}</Badge>
                    {resultConf && (
                      <Badge className={`${resultConf.color} border-0`}>{resultConf.label}</Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              {screening.notes && (
                <CardContent>
                  <p className="text-sm text-muted-foreground">{screening.notes}</p>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
