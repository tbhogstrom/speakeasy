import { CanvasConfig, Building, Dimensions, GardenBed } from '@/types/canvas';

export function drawGrid(
  ctx: CanvasRenderingContext2D,
  config: CanvasConfig
) {
  const { propertyDimensions, scaleFactor, gridSize } = config;
  
  ctx.strokeStyle = '#ddd';
  ctx.lineWidth = 0.5;
  
  // Vertical lines
  for (let x = 0; x <= propertyDimensions.width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x * scaleFactor, 0);
    ctx.lineTo(x * scaleFactor, propertyDimensions.height * scaleFactor);
    ctx.stroke();
    
    // Add measurement text for every other line
    if (x % 8 === 0) {
      ctx.fillStyle = '#94a3b8';
      ctx.font = '12px sans-serif';
      ctx.fillText(`${x}'`, x * scaleFactor + 2, 12);
    }
  }
  
  // Horizontal lines
  for (let y = 0; y <= propertyDimensions.height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y * scaleFactor);
    ctx.lineTo(propertyDimensions.width * scaleFactor, y * scaleFactor);
    ctx.stroke();
    
    // Add measurement text for every other line
    if (y % 8 === 0) {
      ctx.fillStyle = '#94a3b8';
      ctx.font = '12px sans-serif';
      ctx.fillText(`${y}'`, 2, y * scaleFactor + 12);
    }
  }
}

export function drawGardenBeds(
  ctx: CanvasRenderingContext2D,
  beds: GardenBed[],
  scaleFactor: number
) {
  const sunExposureColors = {
    full: '#059669', // emerald-600
    partial: '#34d399', // emerald-400
    shade: '#6ee7b7', // emerald-200
  };

  beds.forEach(bed => {
    // Draw bed
    ctx.fillStyle = sunExposureColors[bed.sunExposure];
    ctx.strokeStyle = '#065f46'; // emerald-800
    ctx.lineWidth = 1;
    
    const x = bed.x * scaleFactor;
    const y = bed.y * scaleFactor;
    const width = bed.width * scaleFactor;
    const height = bed.height * scaleFactor;
    
    ctx.fillRect(x, y, width, height);
    ctx.strokeRect(x, y, width, height);
    
    // Add label
    ctx.fillStyle = '#334155'; // slate-700
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText(
      bed.label,
      x + 4,
      y + 16
    );
    
    // Add dimensions
    ctx.fillStyle = '#334155';
    ctx.font = '11px sans-serif';
    ctx.fillText(
      `${bed.width}'×${bed.height}' (${bed.squareFootage}sf)`,
      x + 4,
      y + 30
    );
  });
}

export function drawPropertyBoundary(
  ctx: CanvasRenderingContext2D,
  dimensions: Dimensions,
  scaleFactor: number
) {
  ctx.strokeStyle = '#666';
  ctx.lineWidth = 2;
  ctx.strokeRect(
    0,
    0,
    dimensions.width * scaleFactor,
    dimensions.height * scaleFactor
  );
}