import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { CropSchedule } from '@/types/garden';

interface CropCalendarProps {
  schedule: CropSchedule[];
  zoneName: string;
}

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

export function CropCalendar({ schedule, zoneName }: CropCalendarProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Crop Calendar - {zoneName}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-12 gap-1">
            {MONTHS.map((month, index) => (
              <div 
                key={month} 
                className="text-center text-sm font-medium"
              >
                {month}
              </div>
            ))}
          </div>
          
          {schedule.map((crop) => (
            <div key={crop.id} className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">{crop.cropName}</span>
                {crop.variety && (
                  <span className="text-sm text-muted-foreground">
                    ({crop.variety})
                  </span>
                )}
              </div>
              <div className="grid grid-cols-12 gap-1">
                {MONTHS.map((_, index) => {
                  const isActive = index + 1 >= crop.startMonth && 
                                 index + 1 <= crop.endMonth;
                  return (
                    <div
                      key={index}
                      className={`h-6 rounded ${
                        isActive 
                          ? 'bg-primary' 
                          : 'bg-muted'
                      }`}
                    />
                  );
                })}
              </div>
              {crop.notes && (
                <p className="text-sm text-muted-foreground">{crop.notes}</p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}