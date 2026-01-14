import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Calendar, Clock, TrendingUp, FileText } from 'lucide-react';
import { sampleSessions, sampleIEPs } from '@/data/sampleData';
import type { SessionData } from '@/types/slp';
import { format } from 'date-fns';

interface SessionHistoryProps {
  studentId: string;
  goalId?: string;
}

export function SessionHistory({ studentId, goalId }: SessionHistoryProps) {
  const [sessions] = useState<SessionData[]>(
    sampleSessions.filter(s =>
      s.studentId === studentId && (goalId ? s.goalId === goalId : true)
    )
  );

  const getGoalInfo = (goalId: string) => {
    for (const iep of sampleIEPs) {
      const goal = iep.goals.find(g => g.id === goalId);
      if (goal) {
        return {
          area: goal.area,
          text: goal.goalText,
        };
      }
    }
    return null;
  };

  const getCueingColor = (level: string) => {
    switch (level) {
      case 'independent':
        return 'bg-green-100 text-green-800';
      case 'minimal':
        return 'bg-blue-100 text-blue-800';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800';
      case 'maximum':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 80) return 'text-green-600 font-semibold';
    if (accuracy >= 60) return 'text-blue-600 font-semibold';
    if (accuracy >= 40) return 'text-yellow-600 font-semibold';
    return 'text-red-600 font-semibold';
  };

  const sortedSessions = [...sessions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (sessions.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <FileText className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Session Data</h3>
          <p className="text-muted-foreground text-center">
            No sessions have been logged for this student yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            Session History
          </CardTitle>
          <CardDescription>
            {sessions.length} sessions recorded
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Goal Area</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Trials</TableHead>
                <TableHead>Accuracy</TableHead>
                <TableHead>Cueing</TableHead>
                <TableHead>Billable</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedSessions.map((session) => {
                const goalInfo = getGoalInfo(session.goalId);
                return (
                  <TableRow key={session.id}>
                    <TableCell className="font-medium">
                      {format(new Date(session.date), 'MMM d, yyyy')}
                    </TableCell>
                    <TableCell>
                      {goalInfo && (
                        <Badge variant="outline" className="capitalize">
                          {goalInfo.area.replace('-', ' ')}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {session.timeIn} - {session.timeOut}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {session.trialsCorrect}/{session.trialsAttempted}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={getAccuracyColor(session.accuracyPercent)}>
                        {session.accuracyPercent}%
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={getCueingColor(session.cueingLevel)}>
                        {session.cueingLevel}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {session.billable ? (
                        session.billed ? (
                          <Badge variant="default" className="bg-green-100 text-green-800">
                            Billed
                          </Badge>
                        ) : (
                          <Badge variant="secondary">Billable</Badge>
                        )
                      ) : (
                        <Badge variant="outline">Not Billable</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Session Details */}
      <div className="space-y-4">
        {sortedSessions.map((session) => {
          const goalInfo = getGoalInfo(session.goalId);
          return (
            <Card key={session.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">
                    {format(new Date(session.date), 'EEEE, MMMM d, yyyy')}
                  </CardTitle>
                  <Badge variant="secondary" className={getCueingColor(session.cueingLevel)}>
                    {session.cueingLevel} cues
                  </Badge>
                </div>
                {goalInfo && (
                  <CardDescription className="text-sm">
                    {goalInfo.text}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Duration</p>
                    <p className="font-medium">{session.duration} min</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Service Type</p>
                    <p className="font-medium capitalize">{session.serviceType}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Accuracy</p>
                    <p className={getAccuracyColor(session.accuracyPercent)}>
                      {session.accuracyPercent}%
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">CPT Code</p>
                    <p className="font-medium">{session.cptCode || '—'}</p>
                  </div>
                </div>

                {session.activities && (
                  <div>
                    <p className="text-sm font-medium mb-1">Activities</p>
                    <p className="text-sm text-muted-foreground">{session.activities}</p>
                  </div>
                )}

                {session.studentResponse && (
                  <div>
                    <p className="text-sm font-medium mb-1">Student Response</p>
                    <p className="text-sm text-muted-foreground">{session.studentResponse}</p>
                  </div>
                )}

                {session.clinicalNotes && (
                  <div>
                    <p className="text-sm font-medium mb-1">Clinical Notes</p>
                    <p className="text-sm text-muted-foreground">{session.clinicalNotes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
