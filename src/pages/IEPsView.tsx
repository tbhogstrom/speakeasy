import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { IEP } from '@/types/slp';

const initialIEPs: IEP[] = [
  {
    id: '1',
    studentId: '1',
    studentName: 'Marcus Lee',
    status: 'active',
    startDate: new Date('2025-01-25'),
    endDate: new Date('2026-01-24'),
    annualReviewDate: new Date('2026-01-25'),
    triennialDate: new Date('2028-01-25'),
    frequency: '2x weekly',
    duration: 30,
    location: 'speech-room',
    groupSize: 'individual',
    serviceModel: 'pull-out',
    minutesPerWeek: 60,
    goals: [],
    notes: 'Annual review - update articulation goals',
  },
];

const statusConfig = {
  'draft': { label: 'Draft', color: 'bg-yellow-100 text-yellow-800' },
  'active': { label: 'Active', color: 'bg-green-100 text-green-800' },
  'expired': { label: 'Expired', color: 'bg-red-100 text-red-800' },
};

export function IEPsView() {
  const [ieps] = useState<IEP[]>(initialIEPs);

  const formatDate = (date?: Date) => {
    if (!date) return 'Not set';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
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
            <h1 className="text-3xl font-bold tracking-tight">IEPs</h1>
            <p className="text-muted-foreground">Manage IEP meetings and annual reviews</p>
          </div>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New IEP
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {ieps.map((iep) => {
          const statusConf = statusConfig[iep.status];

          return (
            <Card key={iep.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{iep.studentName}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      Annual Review: {formatDate(iep.annualReviewDate)}
                    </p>
                  </div>
                  <Badge className={`${statusConf.color} border-0`}>{statusConf.label}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                {iep.notes && <p className="text-sm text-muted-foreground">{iep.notes}</p>}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
