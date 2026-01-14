export interface Plant {
  id: string;
  name: string;
  variety?: string;
  daysToMaturity: number;
  spacing: number;
  companionPlants?: string[];
  avoidPlants?: string[];
  notes?: string;
}

export type BedStatus = 'unused' | 'overgrown' | 'planted' | 'ready-for-harvest' | 'preparing' | 'established' | 'planning';

export interface GrowingZone {
  id: string;
  name: string;
  dimensions: {
    width: number;
    length: number;
  };
  squareFootage: number;
  soil?: string;
  sunExposure: 'full' | 'partial' | 'shade';
  status: BedStatus;
  notes?: string;
  currentPlants?: Plant[];
  cropSchedule?: CropSchedule[];
}

export interface CropSchedule {
  id: string;
  bedId?: string;
  cropName: string;
  variety?: string;
  startMonth: number; // 1-12
  endMonth: number; // 1-12
  notes?: string;
}

export interface PlantingEvent {
  id: string;
  plantId: string;
  zoneId: string;
  startDate: Date;
  harvestDate?: Date;
  quantity: number;
  status: 'planned' | 'planted' | 'harvested' | 'failed';
  notes?: string;
}

export interface Season {
  id: string;
  year: number;
  name: string;
  startDate: Date;
  endDate: Date;
  plantings: PlantingEvent[];
}