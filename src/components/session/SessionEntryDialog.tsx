import { useState } from 'react';
import { format } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Save } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Student, IEPGoal, SessionData } from '@/types/slp';

interface SessionEntryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student: Student;
  goal: IEPGoal;
  onSave?: (session: SessionData) => void;
}

export function SessionEntryDialog({
  open,
  onOpenChange,
  student,
  goal,
  onSave,
}: SessionEntryDialogProps) {
  const [date, setDate] = useState<Date>(new Date());
  const [timeIn, setTimeIn] = useState('09:00 AM');
  const [timeOut, setTimeOut] = useState('09:30 AM');
  const [trialsAttempted, setTrialsAttempted] = useState('20');
  const [trialsCorrect, setTrialsCorrect] = useState('');
  const [cueingLevel, setCueingLevel] = useState<'independent' | 'minimal' | 'moderate' | 'maximum'>('moderate');
  const [activities, setActivities] = useState('');
  const [studentResponse, setStudentResponse] = useState('');
  const [serviceType, setServiceType] = useState<'individual' | 'group'>('individual');

  const calculateAccuracy = () => {
    const attempted = parseInt(trialsAttempted) || 0;
    const correct = parseInt(trialsCorrect) || 0;
    if (attempted === 0) return 0;
    return Math.round((correct / attempted) * 100);
  };

  const calculateDuration = () => {
    // Simple duration calculation - in a real app, parse time strings
    return 30; // Default 30 minutes
  };

  const handleSave = () => {
    const accuracy = calculateAccuracy();
    const duration = calculateDuration();

    const newSession: SessionData = {
      id: `session-${Date.now()}`,
      studentId: student.id,
      goalId: goal.id,
      date: date,
      timeIn,
      timeOut,
      duration,
      serviceType,
      trialsAttempted: parseInt(trialsAttempted) || 0,
      trialsCorrect: parseInt(trialsCorrect) || 0,
      accuracyPercent: accuracy,
      cueingLevel,
      activities,
      studentResponse,
      billable: student.medicaidEligible,
      cptCode: serviceType === 'individual' ? '92507' : '92508',
      billed: false,
    };

    if (onSave) {
      onSave(newSession);
    }

    // Reset form
    setTrialsAttempted('20');
    setTrialsCorrect('');
    setActivities('');
    setStudentResponse('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Log Session Data</DialogTitle>
          <DialogDescription>
            Record session data for {student.name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Goal Display */}
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm font-medium">Goal Area: <span className="capitalize">{goal.area.replace('-', ' ')}</span></p>
            <p className="text-sm text-muted-foreground mt-1">{goal.goalText}</p>
            <div className="flex gap-4 mt-2 text-xs">
              <span>Baseline: {goal.baseline}</span>
              <span>Target: {goal.criterion}</span>
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Session Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !date && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'MMM d, yyyy') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={(d) => d && setDate(d)} />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeIn">Time In</Label>
              <Input
                id="timeIn"
                value={timeIn}
                onChange={(e) => setTimeIn(e.target.value)}
                placeholder="09:00 AM"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeOut">Time Out</Label>
              <Input
                id="timeOut"
                value={timeOut}
                onChange={(e) => setTimeOut(e.target.value)}
                placeholder="09:30 AM"
              />
            </div>
          </div>

          {/* Service Type */}
          <div className="space-y-2">
            <Label htmlFor="serviceType">Service Type</Label>
            <Select value={serviceType} onValueChange={(v: 'individual' | 'group') => setServiceType(v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="individual">Individual</SelectItem>
                <SelectItem value="group">Group</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Trial Data */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="trialsAttempted">Trials Attempted</Label>
              <Input
                id="trialsAttempted"
                type="number"
                value={trialsAttempted}
                onChange={(e) => setTrialsAttempted(e.target.value)}
                placeholder="20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="trialsCorrect">Trials Correct</Label>
              <Input
                id="trialsCorrect"
                type="number"
                value={trialsCorrect}
                onChange={(e) => setTrialsCorrect(e.target.value)}
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <Label>Accuracy</Label>
              <div className="h-10 flex items-center justify-center border rounded-md bg-muted">
                <span className="text-lg font-bold">{calculateAccuracy()}%</span>
              </div>
            </div>
          </div>

          {/* Cueing Level */}
          <div className="space-y-2">
            <Label htmlFor="cueingLevel">Cueing Level</Label>
            <Select value={cueingLevel} onValueChange={(v: any) => setCueingLevel(v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="independent">Independent</SelectItem>
                <SelectItem value="minimal">Minimal</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="maximum">Maximum</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Activities */}
          <div className="space-y-2">
            <Label htmlFor="activities">Activities Performed</Label>
            <Textarea
              id="activities"
              value={activities}
              onChange={(e) => setActivities(e.target.value)}
              placeholder="Describe the activities and materials used during this session..."
              rows={3}
            />
          </div>

          {/* Student Response */}
          <div className="space-y-2">
            <Label htmlFor="studentResponse">Student Response</Label>
            <Textarea
              id="studentResponse"
              value={studentResponse}
              onChange={(e) => setStudentResponse(e.target.value)}
              placeholder="Describe the student's response, engagement, and any notable observations..."
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save Session
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
