import React, { useRef, useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Building, CanvasConfig, GardenBed } from '@/types/canvas';
import { drawGrid, drawGardenBeds, drawPropertyBoundary } from '@/lib/canvas';

const CANVAS_CONFIG: CanvasConfig = {
  scaleFactor: 4,
  gridSize: 4,
  propertyDimensions: {
    width: 50,
    height: 130,
  },
};

const GARDEN_BEDS: GardenBed[] = [
  {
    x: 5,
    y: 20,
    width: 20,
    height: 6,
    label: 'NW Bed',
    sunExposure: 'full',
    squareFootage: 120, // 6x20
  },
  {
    x: 15,
    y: 5,
    width: 18,
    height: 18,
    label: 'North Bed',
    sunExposure: 'partial',
    squareFootage: 324, // 18x18
  },
  {
    x: 15,
    y: 23,
    width: 18,
    height: 2,
    label: 'Pea Alley',
    sunExposure: 'full',
    squareFootage: 36, // 2x18
  },
  {
    x: 35,
    y: 5,
    width: 20,
    height: 20,
    label: 'NE Bed',
    sunExposure: 'partial',
    squareFootage: 400, // 20x20
  },
  {
    x: 35,
    y: 30,
    width: 12,
    height: 6,
    label: 'Strawberry Patch',
    sunExposure: 'partial',
    squareFootage: 72, // 6x12
  },
];

export function GardenCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [beds] = useState<GardenBed[]>(GARDEN_BEDS);
  const totalSquareFootage = beds.reduce((total, bed) => total + bed.squareFootage, 0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPropertyBoundary(ctx, CANVAS_CONFIG.propertyDimensions, CANVAS_CONFIG.scaleFactor);
    drawGrid(ctx, CANVAS_CONFIG);
    drawGardenBeds(ctx, beds, CANVAS_CONFIG.scaleFactor);
  }, [beds]);

  return (
    <Card className="p-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Garden Overview</h3>
        <p className="text-sm text-muted-foreground">
          Total Growing Area: {totalSquareFootage} sq ft
        </p>
      </div>
      <canvas
        ref={canvasRef}
        width={CANVAS_CONFIG.propertyDimensions.width * CANVAS_CONFIG.scaleFactor}
        height={CANVAS_CONFIG.propertyDimensions.height * CANVAS_CONFIG.scaleFactor}
        className="border border-border rounded-lg"
        style={{ 
          width: '100%',
          height: 'auto',
          backgroundColor: '#f8fafc'
        }}
      />
      <div className="mt-4 space-y-2">
        <div className="text-sm text-muted-foreground">
          Grid spacing: {CANVAS_CONFIG.gridSize} feet
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-600" />
            <span className="text-sm">Full Sun</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-400" />
            <span className="text-sm">Partial Sun</span>
          </div>
        </div>
      </div>
    </Card>
  );
}