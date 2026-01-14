// ========================================
// STUDENT - Central Entity
// ========================================

export interface Student {
  id: string;
  name: string;
  dateOfBirth: Date;
  grade: string;
  teacher?: string;
  medicaidId?: string;
  medicaidEligible: boolean;
  primaryDisability?: 'speech-language' | 'autism' | 'learning-disability' | 'other';
  currentIEPId?: string;
  activeEvalId?: string;
  notes?: string;
}

// ========================================
// EVALUATIONS - Timeline & Compliance
// ========================================

export interface Eval {
  id: string;
  studentId: string;
  studentName: string;
  type: 'initial' | 'triennial' | 're-eval';
  status: 'referral' | 'consent-sent' | 'consent-received' | 'testing' | 'writing' | 'completed';

  // Timeline tracking
  referralDate?: Date;
  referralSource?: 'teacher' | 'parent' | 'rti-team' | 'child-find' | 'other';
  consentSentDate?: Date;
  consentReceivedDate?: Date; // This triggers the 60-day clock
  calculatedDueDate?: Date; // Auto-calculated based on state rules
  stateRule?: 'federal-60-calendar' | 'ma-30-school' | 'mi-30-school' | 'tx-45-school';
  extensionDays?: number; // For absences
  actualDueDate?: Date; // Adjusted for extensions

  // Testing details
  scheduledDate?: Date;
  assessmentsPlanned?: Assessment[];
  completedDate?: Date;

  // Report
  reportDraftDate?: Date;
  eligibilityMeetingDate?: Date;
  eligibilityOutcome?: 'eligible' | 'not-eligible';
  eligibilityCategory?: string;

  notes?: string;
  tasks?: EvalTask[];
}

export interface Assessment {
  id: string;
  name: string; // e.g., "CELF-5", "GFTA-3"
  completed: boolean;
  dateCompleted?: Date;
  scores?: AssessmentScore[];
}

export interface AssessmentScore {
  subtest: string;
  standardScore?: number;
  percentile?: number;
  ageEquivalent?: string;
}

export interface EvalTask {
  id: string;
  description: string;
  completed: boolean;
  dueDate?: Date;
}

// ========================================
// IEPs - Goals & Service Delivery
// ========================================

export interface IEP {
  id: string;
  studentId: string;
  studentName: string;

  // IEP Dates
  startDate: Date;
  endDate: Date;
  annualReviewDate: Date;
  triennialDate: Date;

  // Status
  status: 'draft' | 'active' | 'expired';

  // Service Delivery
  frequency: string; // e.g., "2x weekly"
  duration: number; // minutes per session
  location: 'speech-room' | 'classroom' | 'teletherapy' | 'other';
  groupSize: 'individual' | 'small-group' | 'large-group';
  serviceModel: 'pull-out' | 'push-in' | 'consultation';
  minutesPerWeek: number;

  // Goals
  goals: IEPGoal[];

  // Progress Reports
  nextProgressReportDue?: Date;

  notes?: string;
}

export interface IEPGoal {
  id: string;
  iepId: string;
  area: 'articulation' | 'language-receptive' | 'language-expressive' | 'fluency' | 'voice' | 'pragmatics' | 'other';
  goalText: string; // Full SMART goal
  baseline: string; // e.g., "40% accuracy"
  criterion: string; // e.g., "80% accuracy"
  masteryRequirement: string; // e.g., "3 consecutive sessions"
  status: 'not-started' | 'in-progress' | 'mastered' | 'discontinued';
  currentPerformance?: string;
  sessions: SessionData[]; // Linked session data
}

// ========================================
// SESSION DATA - Progress Monitoring
// ========================================

export interface SessionData {
  id: string;
  studentId: string;
  goalId: string;
  date: Date;
  timeIn: string; // "09:00 AM"
  timeOut: string; // "09:30 AM"
  duration: number; // minutes

  // Service details
  serviceType: 'individual' | 'group';
  groupSize?: number;

  // Performance data
  trialsAttempted: number;
  trialsCorrect: number;
  accuracyPercent: number; // Auto-calculated

  // Qualitative
  cueingLevel: 'independent' | 'minimal' | 'moderate' | 'maximum';
  activities: string;
  studentResponse: string;
  clinicalNotes?: string;

  // Billing
  billable: boolean;
  cptCode?: string;
  billed: boolean;
}

// ========================================
// PROGRESS REPORTS - Auto-Aggregation
// ========================================

export interface ProgressReport {
  id: string;
  studentId: string;
  iepId: string;
  reportingPeriod: 'Q1' | 'Q2' | 'Q3' | 'Q4';
  startDate: Date;
  endDate: Date;

  goalProgress: GoalProgress[];

  generatedDate?: Date;
  deliveredDate?: Date;
  deliveryMethod?: 'email' | 'paper' | 'meeting';
  parentSignature?: boolean;
}

export interface GoalProgress {
  goalId: string;
  goalText: string;
  baseline: string;
  currentPerformance: string; // Auto-aggregated from sessions
  dataPoints: number; // Number of sessions
  averageAccuracy: number; // Auto-calculated
  progressRating: 'mastered' | 'sufficient' | 'some-progress' | 'insufficient' | 'not-addressed';
  qualitativeNotes: string;
  chartData: ChartDataPoint[];
}

export interface ChartDataPoint {
  date: Date;
  accuracy: number;
}

// ========================================
// BILLING - Medicaid Compliance
// ========================================

export interface BillingEntry {
  id: string;
  studentId: string;
  studentName: string;
  sessionDataId?: string; // Link to session data

  date: Date;
  timeIn: string; // "09:00 AM"
  timeOut: string; // "09:30 AM"
  duration: number;

  // Medicaid requirements
  medicaidId: string;
  cptCode: '92507' | '92508' | '92521' | '92522' | '92523' | '92524' | '92526';
  serviceType: 'individual' | 'group';
  groupSize?: number;

  // Documentation
  activitiesPerformed: string;
  goalsAddressed: string[];
  studentResponse: string;

  // Billing status
  billed: boolean;
  billingDate?: Date;
  claimNumber?: string;

  // Provider
  providerName: string;
  providerCredentials: string; // e.g., "MA CCC-SLP"
  providerSignature?: string;

  notes?: string;
}

export interface CPTCode {
  code: string;
  description: string;
  serviceType: 'individual' | 'group';
  canCombineSameDay: string[]; // CPT codes that can be billed same day
}

// ========================================
// MATERIALS
// ========================================

export interface Material {
  id: string;
  name: string;
  category: 'articulation' | 'language' | 'social' | 'fluency' | 'voice' | 'aac' | 'other';
  type: 'physical' | 'digital' | 'app';
  location?: string;
  link?: string;
  cost?: number;
  purchaseDate?: Date;
  quantity?: number;
  ageRange?: string;
  goalAreas?: string[];
  effectivenessNotes?: string;
  studentPreferences?: { studentId: string; rating: number; notes?: string }[];
  lowStock?: boolean;
  notes?: string;
}

// ========================================
// SCREENINGS
// ========================================

export interface Screening {
  id: string;
  studentName: string;
  dateOfBirth?: Date;
  grade: string;
  teacher?: string;

  screeningType: 'mass-kindergarten' | 'individual-referral' | 'rti' | 'transition';
  date?: Date;
  tool?: string; // e.g., "DIAL-4", "Fluharty-2"
  screener: string; // SLP name

  status: 'scheduled' | 'completed' | 'follow-up-needed';
  result?: 'pass' | 'refer-eval' | 'rti-tier2' | 'rescreen';
  areasOfConcern?: string[];

  // Follow-up
  parentNotifiedDate?: Date;
  parentNotificationMethod?: 'email' | 'phone' | 'letter';
  nextAction?: string;
  rescreenDate?: Date;
  referredToEvalId?: string; // Link to Eval if referred

  notes?: string;
}

// ========================================
// MEETINGS - Scheduling & Compliance
// ========================================

export interface Meeting {
  id: string;
  studentId?: string;
  title: string;
  type: 'initial-iep' | 'annual-iep' | 'triennial' | 'iep-amendment' | 'eligibility' | '504' | 'rti-team' | 'parent-conference' | 'other';

  // Scheduling
  status: 'needs-scheduling' | 'notice-sent' | 'confirmed' | 'completed' | 'cancelled';
  proposedDates?: Date[];
  confirmedDate?: Date;
  time?: string;
  duration?: number; // minutes
  location?: string;
  format?: 'in-person' | 'virtual' | 'hybrid';
  virtualLink?: string;

  // Required attendees & tracking
  requiredAttendees: MeetingAttendee[];
  optionalAttendees?: MeetingAttendee[];

  // Compliance
  noticeRequiredByDate?: Date; // Auto-calculated based on state rules
  noticeSentDate?: Date;
  noticeMethod?: 'email' | 'mail' | 'both';
  parentAvailability?: string;

  // Preparation
  documentsNeeded?: string[];
  preparationChecklist?: PrepTask[];

  // Meeting notes
  minutesTaken?: string;
  decisions?: string[];
  followUpActions?: FollowUpAction[];

  // Outcomes
  outcome?: string;
  pwrRequired?: boolean; // Prior Written Notice
  pwrCompleted?: boolean;

  notes?: string;
}

export interface MeetingAttendee {
  name: string;
  role: 'parent' | 'lea-rep' | 'gen-ed-teacher' | 'sped-teacher' | 'slp' | 'psychologist' | 'student' | 'other';
  email?: string;
  phone?: string;
  rsvpStatus: 'pending' | 'confirmed' | 'declined' | 'excused';
  excusalConsent?: boolean;
  writtenInput?: boolean;
}

export interface PrepTask {
  id: string;
  description: string;
  completed: boolean;
  dueDate?: Date;
}

export interface FollowUpAction {
  id: string;
  description: string;
  assignedTo: string;
  dueDate?: Date;
  completed: boolean;
}

// ========================================
// TIMELINE CALCULATION
// ========================================

export interface StateRule {
  state: string;
  evalTimeline: {
    days: number;
    type: 'calendar' | 'school';
  };
  meetingNotice: {
    days: number;
    type: 'calendar' | 'school';
  };
}

export interface TimelineAlert {
  type: 'eval-due' | 'iep-annual-due' | 'iep-triennial-due' | 'progress-report-due' | 'meeting-notice-due';
  studentId: string;
  studentName: string;
  dueDate: Date;
  daysUntilDue: number;
  urgency: 'overdue' | 'urgent' | 'upcoming' | 'future';
  relatedId: string; // ID of the eval, IEP, or meeting
}
