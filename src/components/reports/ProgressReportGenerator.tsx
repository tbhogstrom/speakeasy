import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { FileText, TrendingUp, Download, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { sampleSessions, sampleIEPs } from '@/data/sampleData';
import { usePrivacyMode } from '@/contexts/PrivacyModeContext';
import type { IEP, SessionData } from '@/types/slp';
import { format, startOfQuarter, endOfQuarter, isWithinInterval } from 'date-fns';

interface ProgressReportGeneratorProps {
  studentId: string;
  studentName: string;
}

export function ProgressReportGenerator({ studentId, studentName }: ProgressReportGeneratorProps) {
  const [reportingPeriod, setReportingPeriod] = useState<'Q1' | 'Q2' | 'Q3' | 'Q4'>('Q1');
  const [reportGenerated, setReportGenerated] = useState(false);
  const { maskPII } = usePrivacyMode();

  const iep = sampleIEPs.find(i => i.studentId === studentId);

  const getQuarterDates = (quarter: string) => {
    const year = 2026;
    const quarterNumber = parseInt(quarter.replace('Q', ''));
    const start = startOfQuarter(new Date(year, (quarterNumber - 1) * 3, 1));
    const end = endOfQuarter(start);
    return { start, end };
  };

  const getSessionsForPeriod = (goalId: string) => {
    const { start, end } = getQuarterDates(reportingPeriod);
    return sampleSessions.filter(s =>
      s.goalId === goalId &&
      isWithinInterval(new Date(s.date), { start, end })
    );
  };

  const calculateAverageAccuracy = (sessions: SessionData[]) => {
    if (sessions.length === 0) return 0;
    const sum = sessions.reduce((acc, s) => acc + s.accuracyPercent, 0);
    return Math.round(sum / sessions.length);
  };

  const getProgressRating = (sessions: SessionData[], criterionPercent: number) => {
    if (sessions.length === 0) return 'not-addressed';
    const avg = calculateAverageAccuracy(sessions);
    const latestSession = [...sessions].sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )[0];
    const latest = latestSession?.accuracyPercent || 0;

    if (latest >= criterionPercent) return 'mastered';
    if (latest >= criterionPercent * 0.8) return 'sufficient';
    if (latest >= criterionPercent * 0.5) return 'some-progress';
    return 'insufficient';
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'mastered':
        return 'bg-green-100 text-green-800';
      case 'sufficient':
        return 'bg-blue-100 text-blue-800';
      case 'some-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'insufficient':
        return 'bg-red-100 text-red-800';
      case 'not-addressed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRatingLabel = (rating: string) => {
    switch (rating) {
      case 'mastered':
        return 'Goal Mastered';
      case 'sufficient':
        return 'Sufficient Progress';
      case 'some-progress':
        return 'Some Progress';
      case 'insufficient':
        return 'Insufficient Progress';
      case 'not-addressed':
        return 'Not Addressed This Period';
      default:
        return rating;
    }
  };

  const getCriterionPercent = (criterion: string) => {
    const match = criterion.match(/(\d+)%/);
    return match ? parseInt(match[1]) : 80;
  };

  const getChartData = (sessions: SessionData[], criterionPercent: number) => {
    return [...sessions]
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map(session => ({
        date: format(new Date(session.date), 'MMM d'),
        accuracy: session.accuracyPercent,
        target: criterionPercent,
      }));
  };

  const generateReport = () => {
    setReportGenerated(true);
  };

  const { start, end } = getQuarterDates(reportingPeriod);

  if (!iep) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <FileText className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Active IEP</h3>
          <p className="text-muted-foreground text-center">
            This student does not have an active IEP.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Report Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="mr-2 h-5 w-5" />
            Progress Report Generator
          </CardTitle>
          <CardDescription>
            Auto-generate progress reports from session data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Reporting Period</label>
              <Select value={reportingPeriod} onValueChange={(v: any) => setReportingPeriod(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Q1">Quarter 1 (Jan-Mar)</SelectItem>
                  <SelectItem value="Q2">Quarter 2 (Apr-Jun)</SelectItem>
                  <SelectItem value="Q3">Quarter 3 (Jul-Sep)</SelectItem>
                  <SelectItem value="Q4">Quarter 4 (Oct-Dec)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Date Range</label>
              <div className="flex items-center gap-2 h-10 px-3 border rounded-md bg-muted">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  {format(start, 'MMM d')} - {format(end, 'MMM d, yyyy')}
                </span>
              </div>
            </div>
          </div>

          <Button onClick={generateReport} className="w-full">
            <TrendingUp className="mr-2 h-4 w-4" />
            Generate Progress Report
          </Button>
        </CardContent>
      </Card>

      {/* Generated Report */}
      {reportGenerated && (
        <>
          {/* Report Header */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Progress Report - {reportingPeriod} 2026</CardTitle>
                  <CardDescription>
                    {maskPII(studentName, 'name')} • {format(start, 'MMMM d')} - {format(end, 'MMMM d, yyyy')}
                  </CardDescription>
                </div>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export PDF
                </Button>
              </div>
            </CardHeader>
          </Card>

          {/* Goal Progress Cards */}
          {iep.goals.map((goal) => {
            const sessions = getSessionsForPeriod(goal.id);
            const criterionPercent = getCriterionPercent(goal.criterion);
            const averageAccuracy = calculateAverageAccuracy(sessions);
            const progressRating = getProgressRating(sessions, criterionPercent);
            const chartData = getChartData(sessions, criterionPercent);

            const latestSession = sessions.length > 0
              ? [...sessions].sort((a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime()
                )[0]
              : null;

            return (
              <Card key={goal.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="capitalize">
                          {goal.area.replace('-', ' ')}
                        </Badge>
                        <Badge variant="secondary" className={getRatingColor(progressRating)}>
                          {getRatingLabel(progressRating)}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{goal.goalText}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Performance Summary */}
                  <div className="grid grid-cols-4 gap-4 p-4 bg-muted rounded-lg">
                    <div>
                      <p className="text-xs text-muted-foreground">Baseline</p>
                      <p className="font-semibold">{goal.baseline}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Current Performance</p>
                      <p className="font-semibold">
                        {latestSession ? `${latestSession.accuracyPercent}%` : 'No data'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Average Accuracy</p>
                      <p className="font-semibold">{averageAccuracy}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Data Points</p>
                      <p className="font-semibold">{sessions.length} sessions</p>
                    </div>
                  </div>

                  {/* Progress Chart */}
                  {sessions.length >= 2 && (
                    <div>
                      <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        Progress Over Reporting Period
                      </h4>
                      <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                          <YAxis
                            domain={[0, 100]}
                            tick={{ fontSize: 12 }}
                            tickFormatter={(value) => `${value}%`}
                          />
                          <Tooltip formatter={(value: number) => `${value}%`} />
                          <Line
                            type="monotone"
                            dataKey="accuracy"
                            stroke="#8884d8"
                            strokeWidth={2}
                            name="Accuracy"
                          />
                          <Line
                            type="monotone"
                            dataKey="target"
                            stroke="#82ca9d"
                            strokeDasharray="5 5"
                            name="Target"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  )}

                  <Separator />

                  {/* Qualitative Summary */}
                  <div>
                    <h4 className="text-sm font-medium mb-2">Qualitative Summary</h4>
                    {sessions.length > 0 ? (
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          {maskPII(studentName, 'name')} {progressRating === 'mastered' && 'has mastered'}
                          {progressRating === 'sufficient' && 'is making sufficient progress toward'}
                          {progressRating === 'some-progress' && 'is making some progress toward'}
                          {progressRating === 'insufficient' && 'is making insufficient progress toward'}
                          {progressRating === 'not-addressed' && 'did not work on'} this goal during the reporting period.
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Current performance: {latestSession?.accuracyPercent}% accuracy (target: {criterionPercent}%).
                          Average accuracy across {sessions.length} sessions: {averageAccuracy}%.
                        </p>
                        {latestSession && (
                          <div className="mt-3 p-3 bg-muted rounded-lg">
                            <p className="text-xs font-medium mb-1">Most Recent Session ({format(new Date(latestSession.date), 'MMM d, yyyy')})</p>
                            <p className="text-xs text-muted-foreground">{latestSession.studentResponse}</p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No session data was recorded for this goal during the {reportingPeriod} reporting period.
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </>
      )}
    </div>
  );
}
