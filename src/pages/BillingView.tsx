import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, ArrowLeft, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePrivacyMode } from '@/contexts/PrivacyModeContext';
import type { BillingEntry } from '@/types/slp';

const initialEntries: BillingEntry[] = [
  {
    id: '1',
    studentId: '1',
    studentName: 'Emma Johnson',
    date: new Date('2026-01-13'),
    timeIn: '09:00 AM',
    timeOut: '09:30 AM',
    duration: 30,
    medicaidId: 'MC123456789',
    cptCode: '92507',
    serviceType: 'individual',
    activitiesPerformed: 'Articulation therapy',
    goalsAddressed: ['goal-1-1'],
    studentResponse: 'Good participation',
    providerName: 'Jane Smith',
    providerCredentials: 'CCC-SLP',
    billed: false,
  },
  {
    id: '2',
    studentId: '2',
    studentName: 'Marcus Lee',
    date: new Date('2026-01-13'),
    timeIn: '10:00 AM',
    timeOut: '10:45 AM',
    duration: 45,
    medicaidId: 'MC987654321',
    cptCode: '92508',
    serviceType: 'group',
    groupSize: 3,
    activitiesPerformed: 'Group therapy session',
    goalsAddressed: ['goal-2-1'],
    studentResponse: 'Engaged well',
    providerName: 'Jane Smith',
    providerCredentials: 'CCC-SLP',
    billed: false,
  },
];

const serviceTypeLabels = {
  individual: 'Individual',
  group: 'Group',
};

export function BillingView() {
  const [entries, setEntries] = useState<BillingEntry[]>(initialEntries);
  const { maskPII } = usePrivacyMode();

  const handleMarkBilled = (id: string) => {
    setEntries(entries.map((entry) => (entry.id === id ? { ...entry, billed: true } : entry)));
  };

  const unbilledMinutes = entries.filter((e) => !e.billed).reduce((sum, e) => sum + e.duration, 0);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Billing</h1>
            <p className="text-muted-foreground">Track billable time and services</p>
          </div>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Entry
        </Button>
      </div>

      <Card className="bg-gradient-to-br from-primary/10 to-secondary/10">
        <CardHeader>
          <CardTitle>Unbilled Minutes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">{unbilledMinutes}</p>
          <p className="text-sm text-muted-foreground">
            {Math.round(unbilledMinutes / 60 * 10) / 10} hours
          </p>
        </CardContent>
      </Card>

      <div className="space-y-2">
        {entries.map((entry) => (
          <Card key={entry.id} className={entry.billed ? 'opacity-60' : ''}>
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{maskPII(entry.studentName, 'name')}</p>
                  <div className="flex gap-2 mt-1">
                    <Badge variant="outline">{serviceTypeLabels[entry.serviceType]}</Badge>
                    <Badge variant="outline">{entry.duration} min</Badge>
                    <span className="text-sm text-muted-foreground">{formatDate(entry.date)}</span>
                  </div>
                </div>
                {!entry.billed ? (
                  <Button size="sm" onClick={() => handleMarkBilled(entry.id)}>
                    <Check className="h-4 w-4 mr-2" />
                    Mark Billed
                  </Button>
                ) : (
                  <Badge className="bg-green-100 text-green-800">Billed</Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
