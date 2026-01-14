import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  BookOpen,
  Users,
  Target,
  FileText,
  TrendingUp,
  Calendar,
  Shield,
  Eye,
  CheckCircle2,
} from 'lucide-react';

export function TrainingView() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <BookOpen className="h-8 w-8 text-primary" />
          SpeakEasy Training Guide
        </h1>
        <p className="text-muted-foreground mt-2">
          Learn how to use SpeakEasy to streamline your SLP workflow
        </p>
      </div>

      {/* Quick Start */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            Quick Start Guide
          </CardTitle>
          <CardDescription>Get started with SpeakEasy in 3 easy steps</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
              1
            </div>
            <div>
              <h3 className="font-semibold mb-1">Add Your Students</h3>
              <p className="text-sm text-muted-foreground">
                Navigate to Students → Click "Add Student" → Fill in student information including
                name, DOB, grade, and Medicaid eligibility
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
              2
            </div>
            <div>
              <h3 className="font-semibold mb-1">Log Session Data</h3>
              <p className="text-sm text-muted-foreground">
                Click on a student → Go to "IEP Goals" tab → Click "Log Session" on any goal →
                Enter trial data and the system automatically calculates accuracy percentages
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
              3
            </div>
            <div>
              <h3 className="font-semibold mb-1">Generate Progress Reports</h3>
              <p className="text-sm text-muted-foreground">
                Go to "Progress Reports" tab → Select reporting period → Click "Generate" →
                Get auto-aggregated reports with charts and qualitative summaries
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feature Walkthroughs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Student Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <h4 className="font-semibold text-sm mb-2">Adding Students</h4>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Click "Add Student" button from the Students page</li>
              <li>Required fields: Name, Date of Birth, Grade</li>
              <li>Optional: Teacher, Primary Disability, Medicaid ID, Notes</li>
              <li>Toggle Medicaid eligibility to enable billing features</li>
            </ul>
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold text-sm mb-2">Viewing Student Details</h4>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Click "View Details" on any student from the list</li>
              <li>See student demographics, IEP information, and service delivery details</li>
              <li>Access three tabs: IEP Goals, Session History, Progress Reports</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Session Data Entry
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <h4 className="font-semibold text-sm mb-2">Logging Sessions</h4>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Navigate to a student's IEP Goals tab</li>
              <li>Click "Log Session" on the goal you addressed</li>
              <li>Enter session date, time in/out, and service type</li>
              <li>Input trials attempted and trials correct</li>
              <li>System automatically calculates accuracy percentage</li>
              <li>Select cueing level and add qualitative notes</li>
            </ul>
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold text-sm mb-2">Data You Can Track</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <Badge variant="outline">Date & Time</Badge>
              <Badge variant="outline">Service Type</Badge>
              <Badge variant="outline">Trial Data</Badge>
              <Badge variant="outline">Accuracy %</Badge>
              <Badge variant="outline">Cueing Level</Badge>
              <Badge variant="outline">Activities</Badge>
              <Badge variant="outline">Student Response</Badge>
              <Badge variant="outline">CPT Codes</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Progress Monitoring & Reports
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <h4 className="font-semibold text-sm mb-2">Viewing Progress</h4>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Each IEP goal displays a progress chart showing accuracy over time</li>
              <li>Progress bars show current performance vs. target criterion</li>
              <li>Latest and average accuracy displayed automatically</li>
              <li>Target line overlaid on charts for easy visual comparison</li>
            </ul>
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold text-sm mb-2">Generating Progress Reports</h4>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Go to student's "Progress Reports" tab</li>
              <li>Select reporting period (Q1, Q2, Q3, or Q4)</li>
              <li>Click "Generate Progress Report"</li>
              <li>System aggregates all session data for that period</li>
              <li>Automatically calculates progress ratings (mastered, sufficient, some, insufficient)</li>
              <li>Includes charts, averages, and qualitative summaries</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Privacy Mode
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <h4 className="font-semibold text-sm mb-2">What is Privacy Mode?</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Privacy Mode allows you to hide all personally identifiable information (PII) with a
              single click. Perfect for screen sharing, presentations, or demonstrations.
            </p>
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold text-sm mb-2">How to Use Privacy Mode</h4>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Click the "Privacy Mode" toggle in the top-right corner</li>
              <li>All student names will be replaced with "Student ***"</li>
              <li>Teacher names become "Teacher ***"</li>
              <li>Dates of birth and Medicaid IDs are masked</li>
              <li>Toggle off to restore full information</li>
            </ul>
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold text-sm mb-2">When to Use Privacy Mode</h4>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Screen sharing during meetings or training sessions</li>
              <li>Taking screenshots for documentation</li>
              <li>Demonstrating the software to others</li>
              <li>Working in public spaces</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Other Features
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Evaluations
            </h4>
            <p className="text-sm text-muted-foreground">
              Track evaluation timelines with task checklists. Monitor due dates and ensure
              compliance with 60-day federal requirements.
            </p>
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              IEPs
            </h4>
            <p className="text-sm text-muted-foreground">
              Manage IEP meetings and annual reviews. Track service delivery information and goal
              areas.
            </p>
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Billing
            </h4>
            <p className="text-sm text-muted-foreground">
              Track billable time and services. Mark sessions as billed and monitor unbilled
              minutes for Medicaid-eligible students.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">Tips for Success</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-blue-900">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <p>Log session data immediately after sessions while details are fresh</p>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <p>Use Privacy Mode when screen sharing or working in public spaces</p>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <p>Generate progress reports at the end of each quarter</p>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <p>Review progress charts weekly to inform therapy decisions</p>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <p>All your data stays in your browser - never transmitted to servers or the cloud</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
