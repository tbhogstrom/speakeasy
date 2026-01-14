import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  HelpCircle,
  Shield,
  Lock,
  Database,
  WifiOff,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export function FAQView() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <HelpCircle className="h-8 w-8 text-primary" />
          Frequently Asked Questions
        </h1>
        <p className="text-muted-foreground mt-2">
          Common questions about SpeakEasy and data security
        </p>
      </div>

      {/* Data Security Section */}
      <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-900">
            <Shield className="h-6 w-6" />
            Data Security & Privacy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <Lock className="h-5 w-5 text-green-700 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-green-900 mb-2">
                Is my student data secure in SpeakEasy?
              </h3>
              <p className="text-sm text-green-900 mb-3">
                <strong>Yes, absolutely.</strong> SpeakEasy is designed with security and privacy as
                the top priority. Your student data is completely secure because it never leaves your
                computer.
              </p>
              <div className="space-y-2 text-sm text-green-900">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>All data is stored locally on your computer only</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>No cloud storage or external servers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>No internet connection required or used</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>No data transmission to third parties</span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex items-start gap-3">
            <WifiOff className="h-5 w-5 text-green-700 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-green-900 mb-2">
                Does SpeakEasy transmit my student data?
              </h3>
              <p className="text-sm text-green-900 mb-2">
                <strong>No, never.</strong> While SpeakEasy is hosted on the web (accessible via a URL),
                it is a static web application that runs entirely in your browser. All student
                information, session data, and reports remain solely in your browser's local storage.
              </p>
              <div className="space-y-2 text-sm text-green-900 mt-3">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>The app is served from the internet (like any website)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>All student data stays in your browser only</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>No data is transmitted to servers or third parties</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>No backend database or API calls</span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex items-start gap-3">
            <Database className="h-5 w-5 text-green-700 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-green-900 mb-2">
                Where is my data stored?
              </h3>
              <p className="text-sm text-green-900 mb-2">
                All data is stored in your browser's local storage (IndexedDB) on your computer.
                Even though you access SpeakEasy via a web URL, all your student data remains on your
                device. This means:
              </p>
              <ul className="text-sm text-green-900 space-y-1 list-disc list-inside ml-4">
                <li>Data persists between sessions in your browser</li>
                <li>Only you have access to the data on your device</li>
                <li>Data is not shared across devices or browsers</li>
                <li>Data is never sent to our servers or the cloud</li>
                <li>Clearing browser data will remove SpeakEasy data</li>
              </ul>
            </div>
          </div>

          <Separator />

          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-700 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-green-900 mb-2">
                Is SpeakEasy HIPAA and FERPA compliant?
              </h3>
              <p className="text-sm text-green-900">
                SpeakEasy's architecture is designed to support HIPAA and FERPA compliance. Since all
                data remains in your browser's local storage with no transmission to servers, there is
                no risk of unauthorized access or data breaches through external servers or cloud
                storage. The app is a static web application with no backend database. However, you are
                responsible for securing your own computer and following your organization's security
                policies.
              </p>
            </div>
          </div>

          <Separator />

          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-green-900 mb-2">
                Important: Back Up Your Data
              </h3>
              <p className="text-sm text-green-900">
                Since all data is stored locally on your computer, we strongly recommend:
              </p>
              <ul className="text-sm text-green-900 space-y-1 list-disc list-inside ml-4 mt-2">
                <li>Regular computer backups</li>
                <li>Do not clear browser data without backing up first</li>
                <li>Consider using your computer's backup system (Time Machine, Windows Backup, etc.)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* General FAQs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            General Questions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">What is SpeakEasy?</h3>
            <p className="text-sm text-muted-foreground">
              SpeakEasy is a web-based task management and data tracking tool designed specifically for
              Speech-Language Pathologists (SLPs). It helps you manage your caseload, log session
              data, track progress, and generate reports—all while keeping your data completely
              private in your browser. The app runs entirely in your browser with no backend servers
              or data transmission.
            </p>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-2">Do I need to create an account?</h3>
            <p className="text-sm text-muted-foreground">
              No. SpeakEasy does not require any account creation, login, or personal information.
              Simply open the app and start using it immediately.
            </p>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-2">Can I use SpeakEasy offline?</h3>
            <p className="text-sm text-muted-foreground">
              Once you've loaded SpeakEasy in your browser, it can work offline thanks to browser
              caching. However, you'll need an initial internet connection to access the app. Your
              student data is always stored locally in your browser regardless of internet connectivity.
            </p>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-2">Can I access my data from multiple devices?</h3>
            <p className="text-sm text-muted-foreground">
              No. Since data is stored locally on your computer, it is only accessible from that
              specific device and browser. This is intentional to maintain maximum security and
              privacy. If you need to access data from multiple devices, you would need to manually
              export and import data (feature coming soon).
            </p>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-2">Does SpeakEasy cost money?</h3>
            <p className="text-sm text-muted-foreground">
              SpeakEasy is currently a free tool designed to help SLPs manage their workload more
              efficiently.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <Card>
        <CardHeader>
          <CardTitle>Feature Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">How do I add students to my caseload?</h3>
            <p className="text-sm text-muted-foreground">
              Navigate to the Students page and click "Add Student." Fill in the required information
              (name, date of birth, grade) and any optional details like teacher, Medicaid ID, and
              notes. See the Training page for detailed instructions.
            </p>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-2">How does session data entry work?</h3>
            <p className="text-sm text-muted-foreground">
              Click on a student, go to their IEP Goals tab, and click "Log Session" on any goal.
              Enter the trial data (trials attempted and trials correct), and SpeakEasy automatically
              calculates the accuracy percentage. Add activities, student response, and cueing level
              information.
            </p>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-2">How are progress reports generated?</h3>
            <p className="text-sm text-muted-foreground">
              Go to a student's Progress Reports tab, select the reporting period (Q1-Q4), and click
              "Generate Progress Report." The system automatically aggregates all session data for that
              period, calculates averages, generates charts, and creates progress ratings.
            </p>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-2">What is Privacy Mode?</h3>
            <p className="text-sm text-muted-foreground">
              Privacy Mode is a feature that masks all personally identifiable information (PII) with
              a single click. When enabled, student names, teacher names, dates of birth, and Medicaid
              IDs are replaced with asterisks. This is perfect for screen sharing, presentations, or
              working in public spaces.
            </p>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-2">Can I export my data?</h3>
            <p className="text-sm text-muted-foreground">
              Data export functionality is coming soon. You will be able to export progress reports to
              PDF and session data to CSV format.
            </p>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-2">What browsers are supported?</h3>
            <p className="text-sm text-muted-foreground">
              SpeakEasy works best on modern browsers including Chrome, Firefox, Safari, and Edge. We
              recommend keeping your browser up to date for the best experience.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Technical */}
      <Card>
        <CardHeader>
          <CardTitle>Technical Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">What happens if I clear my browser data?</h3>
            <p className="text-sm text-muted-foreground">
              <strong className="text-red-600">Warning:</strong> Clearing your browser's data
              (cookies, cache, local storage) will permanently delete all your SpeakEasy data
              including students, sessions, and reports. Always back up your data before clearing
              browser data.
            </p>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-2">Will my data be lost if I close the browser?</h3>
            <p className="text-sm text-muted-foreground">
              No. Your data persists in the browser's local storage even after closing the browser or
              shutting down your computer. It will be there when you return.
            </p>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-2">What if I use a different browser?</h3>
            <p className="text-sm text-muted-foreground">
              Each browser stores data separately. If you use SpeakEasy in Chrome and then switch to
              Firefox, you will not see the same data. Stick to one browser for consistency.
            </p>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-2">Is there a mobile app?</h3>
            <p className="text-sm text-muted-foreground">
              Not currently. SpeakEasy is designed as a web application optimized for desktop use.
              However, it can be accessed from tablet browsers in landscape mode.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Support */}
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <CardTitle className="text-purple-900">Still Have Questions?</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-purple-900">
          <p className="mb-3">
            Check out the Training page for detailed walkthroughs of each feature, or explore the
            app—your data is completely private and secure, so feel free to experiment!
          </p>
          <div className="flex gap-2">
            <Badge className="bg-purple-200 text-purple-900 hover:bg-purple-300">
              Local Storage Only
            </Badge>
            <Badge className="bg-purple-200 text-purple-900 hover:bg-purple-300">
              No Data Transmission
            </Badge>
            <Badge className="bg-purple-200 text-purple-900 hover:bg-purple-300">
              HIPAA/FERPA Friendly
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
