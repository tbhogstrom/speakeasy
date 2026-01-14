import { SeasonCalendar } from '@/components/garden/SeasonCalendar';
import { PORTLAND_GROWING_SEASONS } from '@/lib/dates';
import type { Season, PlantingEvent } from '@/types/garden';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const currentYear = new Date().getFullYear();

// Current overwintering crops as of Jan 13, 2026
const overwinteringPlantings: PlantingEvent[] = [
  {
    id: '1',
    plantId: 'kale-1',
    zoneId: '1',
    startDate: new Date(2025, 9, 1), // October 2025
    harvestDate: new Date(2026, 3, 30), // April 2026
    quantity: 12,
    status: 'planted',
    notes: 'Overwintering kale - 12 plants',
  },
  {
    id: '2',
    plantId: 'broccoli-1',
    zoneId: '1',
    startDate: new Date(2025, 9, 1), // October 2025
    harvestDate: new Date(2026, 3, 15), // April 2026
    quantity: 6,
    status: 'planted',
    notes: 'Spring broccoli - 6 plants',
  },
];

const winterSeason: Season = {
  id: '2025-2026-winter',
  year: 2025,
  name: 'Winter 2025-2026',
  startDate: PORTLAND_GROWING_SEASONS.winter.start,
  endDate: PORTLAND_GROWING_SEASONS.winter.end,
  plantings: overwinteringPlantings,
};

const springSeason: Season = {
  id: '2026-spring',
  year: currentYear,
  name: 'Spring 2026',
  startDate: PORTLAND_GROWING_SEASONS.spring.start,
  endDate: PORTLAND_GROWING_SEASONS.spring.end,
  plantings: [],
};

const allSeasons = [winterSeason, springSeason];

export function CalendarView() {
  const [selectedSeason, setSelectedSeason] = useState<Season>(winterSeason);

  const handleDateSelect = (date: Date) => {
    console.log('Selected date:', date);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Growing Calendar 2026</h2>
        <p className="text-muted-foreground">
          Plan and track your plantings throughout the season
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Crops (as of Jan 13, 2026)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold">Overwintering Kale</h4>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  12 plants • Planted October 2025 • Expected harvest through April 2026
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold">Spring Broccoli</h4>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  6 plants • Planted October 2025 • Expected harvest March-April 2026
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-2 mb-4">
        {allSeasons.map((season) => (
          <button
            key={season.id}
            onClick={() => setSelectedSeason(season)}
            className={`px-4 py-2 rounded-md ${
              selectedSeason.id === season.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary'
            }`}
          >
            {season.name}
          </button>
        ))}
      </div>

      <SeasonCalendar season={selectedSeason} onDateSelect={handleDateSelect} />
    </div>
  );
}