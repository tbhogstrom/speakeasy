import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlantingEvent, Season } from '@/types/garden';
import { formatDate } from '@/lib/dates';

interface SeasonCalendarProps {
  season: Season;
  onDateSelect: (date: Date) => void;
}

export function SeasonCalendar({ season, onDateSelect }: SeasonCalendarProps) {
  const plantingDates = season.plantings.reduce((acc, planting) => {
    const date = planting.startDate.toISOString().split('T')[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(planting);
    return acc;
  }, {} as Record<string, PlantingEvent[]>);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{season.name} {season.year}</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={new Date()}
          onSelect={(date) => date && onDateSelect(date)}
          className="rounded-md border"
          components={{
            DayContent: ({ date }) => {
              const key = date.toISOString().split('T')[0];
              const events = plantingDates[key] || [];
              
              return (
                <div className="relative w-full h-full">
                  <div>{date.getDate()}</div>
                  {events.length > 0 && (
                    <Badge 
                      variant="secondary" 
                      className="absolute bottom-0 right-0 text-xs"
                    >
                      {events.length}
                    </Badge>
                  )}
                </div>
              );
            },
          }}
        />
      </CardContent>
    </Card>
  );
}