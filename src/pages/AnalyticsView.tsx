import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', harvest: 0 },
  { month: 'Feb', harvest: 0 },
  { month: 'Mar', harvest: 2 },
  { month: 'Apr', harvest: 5 },
  { month: 'May', harvest: 8 },
  { month: 'Jun', harvest: 15 },
  { month: 'Jul', harvest: 25 },
  { month: 'Aug', harvest: 30 },
  { month: 'Sep', harvest: 20 },
  { month: 'Oct', harvest: 10 },
  { month: 'Nov', harvest: 5 },
  { month: 'Dec', harvest: 0 },
];

export function AnalyticsView() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        <p className="text-muted-foreground">
          Track your garden's performance and harvest data
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Harvest Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="harvest" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}