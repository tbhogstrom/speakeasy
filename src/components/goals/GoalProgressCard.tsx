import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Plus, TrendingUp, Target } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { IEPGoal, SessionData } from '@/types/slp';
import { format } from 'date-fns';

interface GoalProgressCardProps {
  goal: IEPGoal;
  sessions: SessionData[];
  onAddSession: () => void;
}

export function GoalProgressCard({ goal, sessions, onAddSession }: GoalProgressCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'mastered':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'not-started':
        return 'bg-gray-100 text-gray-800';
      case 'discontinued':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAreaColor = (area: string) => {
    switch (area) {
      case 'articulation':
        return 'bg-purple-100 text-purple-800';
      case 'language-expressive':
        return 'bg-blue-100 text-blue-800';
      case 'language-receptive':
        return 'bg-green-100 text-green-800';
      case 'fluency':
        return 'bg-yellow-100 text-yellow-800';
      case 'voice':
        return 'bg-pink-100 text-pink-800';
      case 'pragmatics':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateAverageAccuracy = () => {
    if (sessions.length === 0) return 0;
    const sum = sessions.reduce((acc, session) => acc + session.accuracyPercent, 0);
    return Math.round(sum / sessions.length);
  };

  const getLatestAccuracy = () => {
    if (sessions.length === 0) return 0;
    const sortedSessions = [...sessions].sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    return sortedSessions[0]?.accuracyPercent || 0;
  };

  const getCriterionPercent = () => {
    // Extract percentage from criterion string (e.g., "80% accuracy" -> 80)
    const match = goal.criterion.match(/(\d+)%/);
    return match ? parseInt(match[1]) : 80;
  };

  const getProgressPercent = () => {
    const latest = getLatestAccuracy();
    const criterion = getCriterionPercent();
    return Math.min((latest / criterion) * 100, 100);
  };

  const getChartData = () => {
    return [...sessions]
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map(session => ({
        date: format(new Date(session.date), 'MMM d'),
        accuracy: session.accuracyPercent,
        target: getCriterionPercent(),
      }));
  };

  const averageAccuracy = calculateAverageAccuracy();
  const latestAccuracy = getLatestAccuracy();
  const progressPercent = getProgressPercent();
  const criterionPercent = getCriterionPercent();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className={getAreaColor(goal.area)}>
                {goal.area.replace('-', ' ')}
              </Badge>
              <Badge variant="secondary" className={getStatusColor(goal.status)}>
                {goal.status.replace('-', ' ')}
              </Badge>
            </div>
            <CardTitle className="text-lg">{goal.goalText}</CardTitle>
          </div>
          <Button size="sm" onClick={onAddSession}>
            <Plus className="mr-2 h-4 w-4" />
            Log Session
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Baseline and Criterion */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Baseline</p>
            <p className="font-medium">{goal.baseline}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Criterion</p>
            <p className="font-medium">{goal.criterion}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Mastery Requirement</p>
            <p className="font-medium">{goal.masteryRequirement}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Data Points</p>
            <p className="font-medium">{sessions.length} sessions</p>
          </div>
        </div>

        {sessions.length > 0 ? (
          <>
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progress to Goal</span>
                <span className="font-medium">
                  {latestAccuracy}% / {criterionPercent}%
                </span>
              </div>
              <Progress value={progressPercent} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Latest: {latestAccuracy}% • Average: {averageAccuracy}%
              </p>
            </div>

            {/* Chart */}
            {sessions.length >= 2 && (
              <div className="pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <h4 className="text-sm font-medium">Progress Over Time</h4>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={getChartData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 12 }}
                      tickMargin={8}
                    />
                    <YAxis
                      domain={[0, 100]}
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip
                      formatter={(value: number) => `${value}%`}
                      labelStyle={{ color: '#000' }}
                    />
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

            {/* Current Performance */}
            {goal.currentPerformance && (
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium mb-1">Current Performance</p>
                <p className="text-sm text-muted-foreground">{goal.currentPerformance}</p>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Target className="h-12 w-12 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">
              No session data yet. Click "Log Session" to start tracking progress.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
