import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
  ArrowLeft,
  User,
  FileText,
  Calendar,
  MapPin,
  Users,
  Clock,
  Target,
  TrendingUp,
  Plus,
} from 'lucide-react';
import { sampleStudents, sampleIEPs, sampleSessions } from '@/data/sampleData';
import { SessionEntryDialog } from '@/components/session/SessionEntryDialog';
import { SessionHistory } from '@/components/session/SessionHistory';
import { GoalProgressCard } from '@/components/goals/GoalProgressCard';
import { ProgressReportGenerator } from '@/components/reports/ProgressReportGenerator';
import { usePrivacyMode } from '@/contexts/PrivacyModeContext';
import type { Student, IEP, IEPGoal } from '@/types/slp';
import { format } from 'date-fns';

export function StudentDetailView() {
  const { studentId } = useParams<{ studentId: string }>();
  const { maskPII } = usePrivacyMode();
  const [student] = useState<Student | undefined>(
    sampleStudents.find(s => s.id === studentId)
  );
  const [iep] = useState<IEP | undefined>(
    sampleIEPs.find(iep => iep.studentId === studentId)
  );
  const [sessionDialogOpen, setSessionDialogOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<IEPGoal | null>(null);

  if (!student) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <h2 className="text-2xl font-bold">Student not found</h2>
        <Button className="mt-4" asChild>
          <Link to="/students">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Students
          </Link>
        </Button>
      </div>
    );
  }

  const calculateAge = (dateOfBirth: Date) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleAddSession = (goal: IEPGoal) => {
    setSelectedGoal(goal);
    setSessionDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/students">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{maskPII(student.name, 'name')}</h1>
            <p className="text-muted-foreground">
              {calculateAge(student.dateOfBirth)} years old • {student.grade}
            </p>
          </div>
        </div>
      </div>

      {/* Student Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="mr-2 h-5 w-5" />
            Student Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Date of Birth</p>
              <p className="font-medium">{maskPII(format(new Date(student.dateOfBirth), 'MMM d, yyyy'), 'date')}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Grade</p>
              <p className="font-medium">{student.grade}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Teacher</p>
              <p className="font-medium">{maskPII(student.teacher, 'teacher')}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Primary Disability</p>
              <p className="font-medium capitalize">{student.primaryDisability?.replace('-', ' ') || '—'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Medicaid Status</p>
              {student.medicaidEligible ? (
                <div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Eligible
                  </Badge>
                  {student.medicaidId && (
                    <p className="text-xs text-muted-foreground mt-1">ID: {maskPII(student.medicaidId, 'id')}</p>
                  )}
                </div>
              ) : (
                <Badge variant="outline">Not Eligible</Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* IEP Info */}
      {iep && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Current IEP
              </CardTitle>
              <Badge variant="default">Active</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Start Date</p>
                <p className="font-medium">{format(new Date(iep.startDate), 'MMM d, yyyy')}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">End Date</p>
                <p className="font-medium">{format(new Date(iep.endDate), 'MMM d, yyyy')}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Annual Review</p>
                <p className="font-medium">{format(new Date(iep.annualReviewDate), 'MMM d, yyyy')}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Triennial</p>
                <p className="font-medium">{format(new Date(iep.triennialDate), 'MMM d, yyyy')}</p>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Frequency</p>
                  <p className="font-medium">{iep.frequency}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-medium">{iep.duration} min</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium capitalize">{iep.location.replace('-', ' ')}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Group Size</p>
                  <p className="font-medium capitalize">{iep.groupSize.replace('-', ' ')}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Minutes</p>
                  <p className="font-medium">{iep.minutesPerWeek} min/week</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Goals and Sessions Tabs */}
      <Tabs defaultValue="goals" className="space-y-4">
        <TabsList>
          <TabsTrigger value="goals">IEP Goals</TabsTrigger>
          <TabsTrigger value="sessions">Session History</TabsTrigger>
          <TabsTrigger value="progress">Progress Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="goals" className="space-y-4">
          {iep && iep.goals.length > 0 ? (
            iep.goals.map((goal) => {
              const goalSessions = sampleSessions.filter(s => s.goalId === goal.id);
              return (
                <GoalProgressCard
                  key={goal.id}
                  goal={goal}
                  sessions={goalSessions}
                  onAddSession={() => handleAddSession(goal)}
                />
              );
            })
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Target className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No IEP Goals</h3>
                <p className="text-muted-foreground text-center">
                  This student does not have any active IEP goals.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="sessions">
          <SessionHistory studentId={student.id} />
        </TabsContent>

        <TabsContent value="progress">
          <ProgressReportGenerator studentId={student.id} studentName={student.name} />
        </TabsContent>
      </Tabs>

      {/* Session Entry Dialog */}
      {selectedGoal && (
        <SessionEntryDialog
          open={sessionDialogOpen}
          onOpenChange={setSessionDialogOpen}
          student={student}
          goal={selectedGoal}
        />
      )}
    </div>
  );
}
