export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      garden_beds: {
        Row: {
          id: string
          name: string
          width: number
          length: number
          square_footage: number
          soil: string | null
          sun_exposure: 'full' | 'partial' | 'shade'
          status: 'unused' | 'overgrown' | 'planted' | 'ready-for-harvest'
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          width: number
          length: number
          square_footage: number
          soil?: string | null
          sun_exposure: 'full' | 'partial' | 'shade'
          status: 'unused' | 'overgrown' | 'planted' | 'ready-for-harvest'
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          width?: number
          length?: number
          square_footage?: number
          soil?: string | null
          sun_exposure?: 'full' | 'partial' | 'shade'
          status?: 'unused' | 'overgrown' | 'planted' | 'ready-for-harvest'
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      crop_schedules: {
        Row: {
          id: string
          bed_id: string
          crop_name: string
          variety: string | null
          start_month: number
          end_month: number
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          bed_id: string
          crop_name: string
          variety?: string | null
          start_month: number
          end_month: number
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          bed_id?: string
          crop_name?: string
          variety?: string | null
          start_month?: number
          end_month?: number
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}