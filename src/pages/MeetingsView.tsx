import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, ArrowLeft, Calendar as CalendarIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Meeting } from '@/types/slp';

const initialMeetings: Meeting[] = [
  {
    id: '1',
    title: 'Emma Johnson - Initial IEP',
    type: 'iep',
    studentName: 'Emma Johnson',
    status: 'to-schedule',
    notes: 'Need to schedule after eval is complete',
  },
  {
    id: '2',
    title: 'Marcus Lee - Annual Review',
    type: 'iep',
    studentName: 'Marcus Lee',
    date: new Date('2026-01-25'),
    time: '2:00 PM',
    location: 'Conference Room B',
    status: 'scheduled',
  },
];

const typeConfig = {
  iep: { label: 'IEP', color: 'bg-purple-100 text-purple-800' },
  'parent-conference': { label: 'Parent Conference', color: 'bg-blue-100 text-blue-800' },
  'team-meeting': { label: 'Team Meeting', color: 'bg-green-100 text-green-800' },
  evaluation: { label: 'Evaluation', color: 'bg-yellow-100 text-yellow-800' },
  other: { label: 'Other', color: 'bg-gray-100 text-gray-800' },
};

const statusConfig = {
  'to-schedule': { label: 'To Schedule', color: 'bg-red-100 text-red-800' },
  scheduled: { label: 'Scheduled', color: 'bg-green-100 text-green-800' },
  completed: { label: 'Completed', color: 'bg-gray-100 text-gray-800' },
};

export function MeetingsView() {
  const [meetings] = useState<Meeting[]>(initialMeetings);

  const formatDate = (date?: Date) => {
    if (!date) return null;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const toSchedule = meetings.filter((m) => m.status === 'to-schedule');
  const scheduled = meetings.filter((m) => m.status === 'scheduled');

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
            <h1 className="text-3xl font-bold tracking-tight">Meetings</h1>
            <p className="text-muted-foreground">Schedule meetings and conferences</p>
          </div>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Meeting
        </Button>
      </div>

      {toSchedule.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            To Schedule ({toSchedule.length})
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {toSchedule.map((meeting) => {
              const typeConf = typeConfig[meeting.type];
              const statusConf = statusConfig[meeting.status];

              return (
                <Card key={meeting.id} className="border-l-4 border-l-red-400">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{meeting.title}</CardTitle>
                        {meeting.studentName && (
                          <p className="text-sm text-muted-foreground mt-1">{meeting.studentName}</p>
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        <Badge className={`${typeConf.color} border-0`}>{typeConf.label}</Badge>
                        <Badge className={`${statusConf.color} border-0`}>{statusConf.label}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  {meeting.notes && (
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{meeting.notes}</p>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {scheduled.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-3">Scheduled ({scheduled.length})</h2>
          <div className="grid grid-cols-1 gap-4">
            {scheduled.map((meeting) => {
              const typeConf = typeConfig[meeting.type];

              return (
                <Card key={meeting.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{meeting.title}</CardTitle>
                        <div className="mt-2 space-y-1">
                          <p className="text-sm text-muted-foreground">
                            {formatDate(meeting.date)} {meeting.time && `• ${meeting.time}`}
                          </p>
                          {meeting.location && (
                            <p className="text-sm text-muted-foreground">{meeting.location}</p>
                          )}
                        </div>
                      </div>
                      <Badge className={`${typeConf.color} border-0`}>{typeConf.label}</Badge>
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
