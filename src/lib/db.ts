import type { GrowingZone, CropSchedule } from '@/types/garden';

const DB_NAME = 'gardenDB';
const DB_VERSION = 1;
const BEDS_STORE = 'gardenBeds';
const SCHEDULES_STORE = 'cropSchedules';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      
      if (!db.objectStoreNames.contains(BEDS_STORE)) {
        const bedStore = db.createObjectStore(BEDS_STORE, { keyPath: 'id' });
        bedStore.createIndex('name', 'name', { unique: false });
      }

      if (!db.objectStoreNames.contains(SCHEDULES_STORE)) {
        const scheduleStore = db.createObjectStore(SCHEDULES_STORE, { keyPath: 'id' });
        scheduleStore.createIndex('bedId', 'bedId', { unique: false });
      }
    };
  });
}

export async function getGardenBeds(): Promise<GrowingZone[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([BEDS_STORE, SCHEDULES_STORE], 'readonly');
    const bedStore = transaction.objectStore(BEDS_STORE);
    const scheduleStore = transaction.objectStore(SCHEDULES_STORE);
    const bedsRequest = bedStore.getAll();

    bedsRequest.onerror = () => reject(bedsRequest.error);
    bedsRequest.onsuccess = async () => {
      const beds = bedsRequest.result;
      const bedsWithSchedules = await Promise.all(beds.map(async (bed) => {
        const scheduleIndex = scheduleStore.index('bedId');
        const schedules = await new Promise<CropSchedule[]>((resolve) => {
          const request = scheduleIndex.getAll(bed.id);
          request.onsuccess = () => resolve(request.result);
        });
        return { ...bed, cropSchedule: schedules };
      }));
      resolve(bedsWithSchedules);
    };
  });
}

export async function updateBedDetails(bed: GrowingZone): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([BEDS_STORE], 'readwrite');
    const store = transaction.objectStore(BEDS_STORE);
    const request = store.put({
      ...bed,
      updated_at: new Date().toISOString()
    });

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

export async function updateBedStatus(id: string, status: GrowingZone['status']): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([BEDS_STORE], 'readwrite');
    const store = transaction.objectStore(BEDS_STORE);
    
    const getRequest = store.get(id);
    getRequest.onerror = () => reject(getRequest.error);
    getRequest.onsuccess = () => {
      const bed = getRequest.result;
      if (bed) {
        const updateRequest = store.put({
          ...bed,
          status,
          updated_at: new Date().toISOString()
        });
        updateRequest.onerror = () => reject(updateRequest.error);
        updateRequest.onsuccess = () => resolve();
      } else {
        reject(new Error('Bed not found'));
      }
    };
  });
}

export async function addCropSchedule(bedId: string, schedule: Omit<CropSchedule, 'id'>): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([SCHEDULES_STORE], 'readwrite');
    const store = transaction.objectStore(SCHEDULES_STORE);
    const request = store.add({
      ...schedule,
      id: crypto.randomUUID(),
      bedId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

// Initialize demo data if needed
export async function initializeDemoData(): Promise<void> {
  const db = await openDB();
  const bedsTransaction = db.transaction([BEDS_STORE], 'readwrite');
  const store = bedsTransaction.objectStore(BEDS_STORE);

  const demoData: GrowingZone[] = [
    {
      id: '1',
      name: 'Greens Bed (Kale)',
      dimensions: { width: 10, length: 20 },
      squareFootage: 200,
      soil: 'Garden Mix with compost',
      sunExposure: 'full',
      status: 'planted',
      notes: '2026: Currently has 12 overwintering kale and 6 spring broccoli plants. Succession planting throughout season.',
    },
    {
      id: '2',
      name: 'Tomato Bed - Main',
      dimensions: { width: 8, length: 30 },
      squareFootage: 240,
      soil: 'Garden Mix',
      sunExposure: 'full',
      status: 'preparing',
      notes: '2026: San Marzano tomatoes. Goal: 250 lb harvest. Needs irrigation lock-down and timing plan.',
    },
    {
      id: '3',
      name: 'Cucumber & Squash',
      dimensions: { width: 6, length: 15 },
      squareFootage: 90,
      soil: 'Garden Mix',
      sunExposure: 'full',
      status: 'preparing',
      notes: '2026: Cucumbers and Black Futsu pumpkin. Vertical trellis for cucumbers.',
    },
    {
      id: '4',
      name: 'Experimental Bed',
      dimensions: { width: 4, length: 10 },
      squareFootage: 40,
      soil: 'Garden Mix',
      sunExposure: 'full',
      status: 'preparing',
      notes: '2026: Salsify trial. First time growing this crop.',
    },
    {
      id: '5',
      name: 'Berry Patch',
      dimensions: { width: 12, length: 15 },
      squareFootage: 180,
      soil: 'Acidic mix for blueberries',
      sunExposure: 'full',
      status: 'established',
      notes: '2026: Blueberries, honeyberries, and strawberries. Perennial beds.',
    },
    {
      id: '6',
      name: 'Rose Garden',
      dimensions: { width: 6, length: 10 },
      squareFootage: 60,
      soil: 'Garden Mix',
      sunExposure: 'full',
      status: 'established',
      notes: '2026: Roses for beauty and pollinator support.',
    },
    {
      id: '7',
      name: 'Coldframe Area',
      dimensions: { width: 4, length: 6 },
      squareFootage: 24,
      soil: 'Garden Mix',
      sunExposure: 'full',
      status: 'planning',
      notes: '2026 Project: Installing 24 sq ft of coldframes for season extension.',
    },
  ];

  await Promise.all(demoData.map(bed => store.put(bed)));

  // Initialize crop schedules
  const schedulesTransaction = db.transaction([SCHEDULES_STORE], 'readwrite');
  const schedulesStore = schedulesTransaction.objectStore(SCHEDULES_STORE);

  const cropSchedules = [
    // Greens Bed (Kale) - id: '1'
    {
      id: '1-1',
      bedId: '1',
      cropName: 'Kale',
      variety: 'Overwintering',
      startMonth: 10,
      endMonth: 4,
      notes: 'Currently: 12 plants from Oct 2025. Harvest through April 2026',
    },
    {
      id: '1-2',
      bedId: '1',
      cropName: 'Broccoli',
      variety: 'Spring',
      startMonth: 10,
      endMonth: 4,
      notes: 'Currently: 6 plants from Oct 2025. Harvest March-April 2026',
    },
    {
      id: '1-3',
      bedId: '1',
      cropName: 'Kale',
      variety: 'Spring succession',
      startMonth: 3,
      endMonth: 11,
      notes: 'Succession plantings through season',
    },
    // Tomato Bed - id: '2'
    {
      id: '2-1',
      bedId: '2',
      cropName: 'San Marzano Tomatoes',
      startMonth: 5,
      endMonth: 10,
      notes: 'Start indoors March. Transplant May when soil reaches 60°F. Goal: 250 lb harvest',
    },
    // Cucumber & Squash - id: '3'
    {
      id: '3-1',
      bedId: '3',
      cropName: 'Cucumbers',
      startMonth: 5,
      endMonth: 9,
      notes: 'Direct sow or transplant May. Use vertical trellis',
    },
    {
      id: '3-2',
      bedId: '3',
      cropName: 'Black Futsu Pumpkin',
      startMonth: 5,
      endMonth: 10,
      notes: '105 days to maturity. Harvest for winter storage',
    },
    // Experimental Bed (Salsify) - id: '4'
    {
      id: '4-1',
      bedId: '4',
      cropName: 'Salsify',
      variety: 'Mammoth Sandwich Island',
      startMonth: 4,
      endMonth: 8,
      notes: '120 days to maturity. First year trial',
    },
    // Berry Patch - id: '5'
    {
      id: '5-1',
      bedId: '5',
      cropName: 'Blueberries',
      startMonth: 1,
      endMonth: 12,
      notes: 'Perennial. Harvest June-August',
    },
    {
      id: '5-2',
      bedId: '5',
      cropName: 'Honeyberries',
      startMonth: 1,
      endMonth: 12,
      notes: 'Perennial. Early season harvest May-June',
    },
    {
      id: '5-3',
      bedId: '5',
      cropName: 'Strawberries',
      startMonth: 1,
      endMonth: 12,
      notes: 'Everbearing variety. Harvest June-October',
    },
    // Rose Garden - id: '6'
    {
      id: '6-1',
      bedId: '6',
      cropName: 'Roses',
      startMonth: 1,
      endMonth: 12,
      notes: 'Perennial. Blooms June-September',
    },
  ];

  await Promise.all(cropSchedules.map(schedule => schedulesStore.put(schedule)));
}