import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Users, ArrowRight, Calendar, FileText } from 'lucide-react';
import { sampleStudents, sampleIEPs } from '@/data/sampleData';
import { AddStudentDialog } from '@/components/students/AddStudentDialog';
import { usePrivacyMode } from '@/contexts/PrivacyModeContext';
import type { Student } from '@/types/slp';

export function StudentsView() {
  const [students, setStudents] = useState<Student[]>(sampleStudents);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const { maskPII } = usePrivacyMode();

  const handleAddStudent = (newStudent: Student) => {
    setStudents([...students, newStudent]);
  };

  const getStudentIEP = (studentId: string) => {
    return sampleIEPs.find(iep => iep.studentId === studentId);
  };

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Students</h1>
          <p className="text-muted-foreground">
            Manage your caseload and access student records
          </p>
        </div>
        <Button onClick={() => setAddDialogOpen(true)}>
          <Users className="mr-2 h-4 w-4" />
          Add Student
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Caseload</CardTitle>
          <CardDescription>
            {students.length} students with active IEPs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Age / Grade</TableHead>
                <TableHead>Teacher</TableHead>
                <TableHead>Medicaid</TableHead>
                <TableHead>IEP Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => {
                const iep = getStudentIEP(student.id);
                const age = calculateAge(student.dateOfBirth);

                return (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{maskPII(student.name, 'name')}</TableCell>
                    <TableCell>
                      {age} yrs / {student.grade}
                    </TableCell>
                    <TableCell>{maskPII(student.teacher, 'teacher')}</TableCell>
                    <TableCell>
                      {student.medicaidEligible ? (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Eligible
                        </Badge>
                      ) : (
                        <Badge variant="outline">Not Eligible</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {iep ? (
                        <div className="flex items-center gap-2">
                          <Badge variant="default">Active</Badge>
                          <span className="text-xs text-muted-foreground">
                            {iep.goals.length} goals
                          </span>
                        </div>
                      ) : (
                        <Badge variant="outline">No Active IEP</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/students/${student.id}`}>
                            <FileText className="mr-2 h-4 w-4" />
                            View Details
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.length}</div>
            <p className="text-xs text-muted-foreground">Active caseload</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Medicaid Eligible</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {students.filter(s => s.medicaidEligible).length}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round((students.filter(s => s.medicaidEligible).length / students.length) * 100)}% of caseload
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Reviews</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Due within 30 days</p>
          </CardContent>
        </Card>
      </div>

      <AddStudentDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onSave={handleAddStudent}
      />
    </div>
  );
}
