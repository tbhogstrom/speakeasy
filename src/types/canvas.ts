export interface Point {
  x: number;
  y: number;
}

export interface Dimensions {
  width: number;
  height: number;
}

export interface Building {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  type: 'main' | 'secondary' | 'porch';
}

export interface GardenBed {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  sunExposure: 'full' | 'partial' | 'shade';
  squareFootage: number;
}

export interface CanvasConfig {
  scaleFactor: number;
  gridSize: number;
  propertyDimensions: Dimensions;
}