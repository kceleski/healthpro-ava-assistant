
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
  description?: string;
  contact_email?: string;
  phone_number?: string;
  amenities?: string[];
  care_types?: string[];
  image_urls?: string[];
  is_featured?: boolean;
  created_by?: string;
  updated_at?: string;
  url?: string;
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

    // Transform database results to match Facility interface
    const facilities: Facility[] = data.map(item => ({
      id: item.id,
      name: item.name,
      address: item.address,
      city: item.city || "",
      state: item.state || "",
      zip_code: item.zip_code || "",
      phone: item.phone_number || "",
      type: Array.isArray(item.care_types) && item.care_types.length > 0 ? item.care_types[0] : "",
      website: item.website || "",
      rating: item.rating || 0,
      latitude: item.latitude || null,
      longitude: item.longitude || null,
      price_min: item.price_min || null,
      price_max: item.price_max || null,
      description: item.description || "",
      created_at: item.created_at,
      contact_email: item.contact_email,
      phone_number: item.phone_number,
      amenities: item.amenities,
      care_types: item.care_types,
      image_urls: item.image_urls,
      is_featured: item.is_featured,
      created_by: item.created_by,
      updated_at: item.updated_at,
      url: item.url,
    }));

    return facilities;
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

    // Transform to match Facility interface
    const facility: Facility = {
      id: data.id,
      name: data.name,
      address: data.address,
      city: data.city || "",
      state: data.state || "",
      zip_code: data.zip_code || "",
      phone: data.phone_number || "",
      type: Array.isArray(data.care_types) && data.care_types.length > 0 ? data.care_types[0] : "",
      website: data.website || "",
      rating: data.rating || 0,
      latitude: data.latitude || null,
      longitude: data.longitude || null,
      price_min: data.price_min || null,
      price_max: data.price_max || null,
      description: data.description || "",
      contact_email: data.contact_email,
      phone_number: data.phone_number,
      amenities: data.amenities,
      care_types: data.care_types,
      image_urls: data.image_urls,
      is_featured: data.is_featured,
      created_by: data.created_by,
      updated_at: data.updated_at,
      url: data.url,
    };

    return facility;
  } catch (error) {
    console.error(`Error fetching facility with ID ${id}:`, error);
    toast.error('Failed to load facility details');
    return null;
  }
}

export async function createFacility(facility: Omit<Facility, 'id' | 'created_at'>): Promise<Facility | null> {
  try {
    // Extract and prepare the data for Supabase insert
    const facilityData = {
      name: facility.name,
      address: facility.address,
      city: facility.city,
      state: facility.state,
      zip_code: facility.zip_code,
      phone_number: facility.phone || facility.phone_number || "",
      website: facility.website || null,
      rating: facility.rating || 0,
      latitude: facility.latitude || null,
      longitude: facility.longitude || null,
      price_min: facility.price_min || null,
      price_max: facility.price_max || null,
      description: facility.description || "",
      care_types: facility.care_types || [facility.type], 
      contact_email: facility.contact_email || null,
      amenities: facility.amenities || [],
      image_urls: facility.image_urls || [],
      is_featured: facility.is_featured || false,
      created_by: facility.created_by || null,
    };

    const { data, error } = await supabase
      .from('facilities')
      .insert(facilityData)
      .select();

    if (error) {
      throw error;
    }

    toast.success('Facility created successfully');
    return data[0] ? {
      ...data[0],
      phone: data[0].phone_number || "",
      type: Array.isArray(data[0].care_types) && data[0].care_types.length > 0 ? data[0].care_types[0] : "",
    } : null;
  } catch (error) {
    console.error('Error creating facility:', error);
    toast.error('Failed to create facility');
    return null;
  }
}

export async function updateFacility(id: string, facility: Partial<Facility>): Promise<Facility | null> {
  try {
    // Prepare data for update
    const updateData: any = { ...facility };
    
    // Handle the potential remapping of 'phone' to 'phone_number'
    if (facility.phone && !facility.phone_number) {
      updateData.phone_number = facility.phone;
      delete updateData.phone;
    }

    // Handle type conversion to care_types array if needed
    if (facility.type && !facility.care_types) {
      updateData.care_types = [facility.type];
      delete updateData.type;
    }

    const { data, error } = await supabase
      .from('facilities')
      .update(updateData)
      .eq('id', id)
      .select();

    if (error) {
      throw error;
    }

    toast.success('Facility updated successfully');
    return data[0] ? {
      ...data[0],
      phone: data[0].phone_number || "",
      type: Array.isArray(data[0].care_types) && data[0].care_types.length > 0 ? data[0].care_types[0] : "",
    } : null;
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
