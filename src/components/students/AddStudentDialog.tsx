import { useState } from 'react';
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
import { format } from 'date-fns';
import { Switch } from '@/components/ui/switch';
import type { Student } from '@/types/slp';

interface AddStudentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (student: Student) => void;
}

export function AddStudentDialog({ open, onOpenChange, onSave }: AddStudentDialogProps) {
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState<Date>();
  const [grade, setGrade] = useState('');
  const [teacher, setTeacher] = useState('');
  const [medicaidId, setMedicaidId] = useState('');
  const [medicaidEligible, setMedicaidEligible] = useState(false);
  const [primaryDisability, setPrimaryDisability] = useState<'speech-language' | 'autism' | 'learning-disability' | 'other'>('speech-language');
  const [notes, setNotes] = useState('');

  const handleSave = () => {
    if (!name || !dateOfBirth || !grade) {
      alert('Please fill in required fields: Name, Date of Birth, and Grade');
      return;
    }

    const newStudent: Student = {
      id: `student-${Date.now()}`,
      name,
      dateOfBirth,
      grade,
      teacher: teacher || undefined,
      medicaidId: medicaidId || undefined,
      medicaidEligible,
      primaryDisability,
      notes: notes || undefined,
    };

    onSave(newStudent);
    resetForm();
    onOpenChange(false);
  };

  const resetForm = () => {
    setName('');
    setDateOfBirth(undefined);
    setGrade('');
    setTeacher('');
    setMedicaidId('');
    setMedicaidEligible(false);
    setPrimaryDisability('speech-language');
    setNotes('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Student</DialogTitle>
          <DialogDescription>
            Add a new student to your caseload. Fields marked with * are required.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Student Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Student Name *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter student's full name"
            />
          </div>

          {/* Date of Birth and Grade */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date of Birth *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !dateOfBirth && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateOfBirth ? format(dateOfBirth, 'MMM d, yyyy') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateOfBirth}
                    onSelect={setDateOfBirth}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="grade">Grade *</Label>
              <Select value={grade} onValueChange={setGrade}>
                <SelectTrigger>
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pre-K">Pre-K</SelectItem>
                  <SelectItem value="Kindergarten">Kindergarten</SelectItem>
                  <SelectItem value="1st Grade">1st Grade</SelectItem>
                  <SelectItem value="2nd Grade">2nd Grade</SelectItem>
                  <SelectItem value="3rd Grade">3rd Grade</SelectItem>
                  <SelectItem value="4th Grade">4th Grade</SelectItem>
                  <SelectItem value="5th Grade">5th Grade</SelectItem>
                  <SelectItem value="6th Grade">6th Grade</SelectItem>
                  <SelectItem value="7th Grade">7th Grade</SelectItem>
                  <SelectItem value="8th Grade">8th Grade</SelectItem>
                  <SelectItem value="9th Grade">9th Grade</SelectItem>
                  <SelectItem value="10th Grade">10th Grade</SelectItem>
                  <SelectItem value="11th Grade">11th Grade</SelectItem>
                  <SelectItem value="12th Grade">12th Grade</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Teacher */}
          <div className="space-y-2">
            <Label htmlFor="teacher">Teacher</Label>
            <Input
              id="teacher"
              value={teacher}
              onChange={(e) => setTeacher(e.target.value)}
              placeholder="Enter teacher's name"
            />
          </div>

          {/* Primary Disability */}
          <div className="space-y-2">
            <Label htmlFor="primaryDisability">Primary Disability</Label>
            <Select value={primaryDisability} onValueChange={(v: any) => setPrimaryDisability(v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="speech-language">Speech-Language</SelectItem>
                <SelectItem value="autism">Autism</SelectItem>
                <SelectItem value="learning-disability">Learning Disability</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Medicaid Eligibility */}
          <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="medicaidEligible">Medicaid Eligible</Label>
                <p className="text-sm text-muted-foreground">
                  Is this student eligible for Medicaid billing?
                </p>
              </div>
              <Switch
                id="medicaidEligible"
                checked={medicaidEligible}
                onCheckedChange={setMedicaidEligible}
              />
            </div>

            {medicaidEligible && (
              <div className="space-y-2">
                <Label htmlFor="medicaidId">Medicaid ID</Label>
                <Input
                  id="medicaidId"
                  value={medicaidId}
                  onChange={(e) => setMedicaidId(e.target.value)}
                  placeholder="Enter Medicaid ID number"
                />
              </div>
            )}
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any additional notes or information about the student..."
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
            Add Student
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
