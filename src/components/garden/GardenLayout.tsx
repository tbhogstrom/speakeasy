import React, { useState, useEffect } from 'react';
import { GrowingZone } from '@/types/garden';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Sun, Cloud, CloudSun } from 'lucide-react';
import { bedStatusConfig } from '@/lib/garden';
import { EditBedDialog } from './EditBedDialog';

interface GardenLayoutProps {
  zones: GrowingZone[];
  onZoneClick: (zone: GrowingZone) => void;
}

const sunExposureIcons = {
  full: Sun,
  partial: CloudSun,
  shade: Cloud,
};

const sunExposureLabels = {
  full: 'Full Sun',
  partial: 'Partial Sun',
  shade: 'Shade',
};

export function GardenLayout({ zones: initialZones, onZoneClick }: GardenLayoutProps) {
  const [zones, setZones] = useState<GrowingZone[]>(initialZones);

  // Update local state when prop changes
  useEffect(() => {
    setZones(initialZones);
  }, [initialZones]);

  const totalSquareFootage = zones.reduce((total, zone) => total + zone.squareFootage, 0);

  const handleBedUpdate = (updatedBed: GrowingZone) => {
    setZones(zones.map(zone => 
      zone.id === updatedBed.id ? updatedBed : zone
    ));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Garden Overview</CardTitle>
          <p className="text-sm text-muted-foreground">
            Total Growing Area: {totalSquareFootage} sq ft
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {zones.map((zone) => {
              const Icon = sunExposureIcons[zone.sunExposure];
              const statusConfig = bedStatusConfig[zone.status];
              
              return (
                <TooltipProvider key={zone.id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Card 
                        className="cursor-pointer hover:border-primary transition-colors"
                        onClick={() => onZoneClick(zone)}
                      >
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <CardTitle className="text-lg">{zone.name}</CardTitle>
                                <EditBedDialog bed={zone} onUpdate={handleBedUpdate} />
                              </div>
                              <Badge 
                                className={`${statusConfig.color} ${statusConfig.bgColor} border-0`}
                              >
                                {statusConfig.label}
                              </Badge>
                            </div>
                            <Icon className="h-5 w-5 text-muted-foreground" />
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">
                                {zone.dimensions.width}' × {zone.dimensions.length}'
                              </Badge>
                              <Badge variant="outline">
                                {zone.squareFootage} sq ft
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary">
                                {sunExposureLabels[zone.sunExposure]}
                              </Badge>
                              {zone.soil && (
                                <Badge variant="secondary">
                                  {zone.soil}
                                </Badge>
                              )}
                            </div>
                            {zone.notes && (
                              <p className="text-sm text-muted-foreground">
                                {zone.notes}
                              </p>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Click to manage this growing zone</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}