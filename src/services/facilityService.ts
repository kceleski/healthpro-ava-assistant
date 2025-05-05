
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Facility {
  id?: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  phone: string;
  type: string;
  website?: string;
  rating?: number;
  latitude?: number;
  longitude?: number;
  price_min?: number;
  price_max?: number;
  created_at?: string;
}

export async function getFacilities(): Promise<Facility[]> {
  try {
    const { data, error } = await supabase
      .from('facilities')
      .select('*')
      .order('name');

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching facilities:', error);
    toast.error('Failed to load facilities');
    return [];
  }
}

export async function getFacilityById(id: string): Promise<Facility | null> {
  try {
    const { data, error } = await supabase
      .from('facilities')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error(`Error fetching facility with ID ${id}:`, error);
    toast.error('Failed to load facility details');
    return null;
  }
}

export async function createFacility(facility: Omit<Facility, 'id' | 'created_at'>): Promise<Facility | null> {
  try {
    const { data, error } = await supabase
      .from('facilities')
      .insert(facility)
      .select()
      .single();

    if (error) {
      throw error;
    }

    toast.success('Facility created successfully');
    return data;
  } catch (error) {
    console.error('Error creating facility:', error);
    toast.error('Failed to create facility');
    return null;
  }
}

export async function updateFacility(id: string, facility: Partial<Facility>): Promise<Facility | null> {
  try {
    const { data, error } = await supabase
      .from('facilities')
      .update(facility)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    toast.success('Facility updated successfully');
    return data;
  } catch (error) {
    console.error(`Error updating facility with ID ${id}:`, error);
    toast.error('Failed to update facility');
    return null;
  }
}

export async function deleteFacility(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('facilities')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }

    toast.success('Facility deleted successfully');
    return true;
  } catch (error) {
    console.error(`Error deleting facility with ID ${id}:`, error);
    toast.error('Failed to delete facility');
    return false;
  }
}
