import { format, addDays } from 'date-fns';

export function formatDate(date: Date): string {
  return format(date, 'MMM d, yyyy');
}

export function calculateHarvestDate(plantDate: Date, daysToMaturity: number): Date {
  return addDays(plantDate, daysToMaturity);
}

export const PORTLAND_GROWING_SEASONS = {
  winter: {
    start: new Date(new Date().getFullYear(), 11, 1), // December 1
    end: new Date(new Date().getFullYear() + 1, 1, 28), // February 28
  },
  spring: {
    start: new Date(new Date().getFullYear(), 2, 1), // March 1
    end: new Date(new Date().getFullYear(), 4, 31), // May 31
  },
  summer: {
    start: new Date(new Date().getFullYear(), 5, 1), // June 1
    end: new Date(new Date().getFullYear(), 7, 31), // August 31
  },
  fall: {
    start: new Date(new Date().getFullYear(), 8, 1), // September 1
    end: new Date(new Date().getFullYear(), 10, 30), // November 30
  },
};