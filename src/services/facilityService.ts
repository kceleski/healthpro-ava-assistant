
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Facility {
  id: string;
  name: string;
  type: string;
  address: string;
  city: string;
  state: string;
  zip_code?: string;
  latitude?: number;
  longitude?: number;
  phone?: string;
  website?: string;
  price_min?: number;
  price_max?: number;
  rating?: number;
  created_at?: string;
  updated_at?: string;
}

export interface SearchParams {
  query?: string;
  type?: string;
  location?: string;
  amenities?: string[];
  priceRange?: [number, number];
  limit?: number;
}

/**
 * Fetch all facilities from the database
 */
export async function getAllFacilities(): Promise<Facility[]> {
  try {
    const { data, error } = await supabase
      .from('facilities')
      .select('*');
    
    if (error) {
      console.error('Error fetching facilities:', error);
      toast.error('Failed to load facilities');
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Unexpected error fetching facilities:', error);
    toast.error('An unexpected error occurred');
    return [];
  }
}

/**
 * Search facilities based on provided parameters
 */
export async function searchFacilities(params: SearchParams): Promise<Facility[]> {
  try {
    let query = supabase
      .from('facilities')
      .select('*');
    
    // Apply filters
    if (params.query) {
      query = query.or(`name.ilike.%${params.query}%,address.ilike.%${params.query}%,city.ilike.%${params.query}%`);
    }
    
    if (params.type && params.type !== 'all') {
      query = query.eq('type', params.type);
    }
    
    if (params.location) {
      query = query.or(`city.ilike.%${params.location}%,state.ilike.%${params.location}%,zip_code.ilike.%${params.location}%`);
    }
    
    if (params.priceRange) {
      const [min, max] = params.priceRange;
      // At least some overlap with the price range
      query = query.or(`price_min.lte.${max},price_max.gte.${min}`);
    }
    
    if (params.limit) {
      query = query.limit(params.limit);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error searching facilities:', error);
      toast.error('Search failed');
      return [];
    }
    
    // Save search to history if authenticated
    const { data: userData } = await supabase.auth.getUser();
    if (userData?.user) {
      await saveSearchHistory({
        query: params.query || '',
        location: params.location,
        facility_type: params.type,
        amenities: params.amenities,
        user_id: userData.user.id
      });
    }
    
    return data || [];
  } catch (error) {
    console.error('Unexpected error searching facilities:', error);
    toast.error('An unexpected error occurred');
    return [];
  }
}

/**
 * Get a single facility by ID
 */
export async function getFacilityById(id: string): Promise<Facility | null> {
  try {
    const { data, error } = await supabase
      .from('facilities')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching facility:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Unexpected error fetching facility:', error);
    return null;
  }
}

/**
 * Save a facility to the database
 */
export async function saveFacility(facility: Omit<Facility, 'id' | 'created_at' | 'updated_at'>): Promise<Facility | null> {
  try {
    const { data, error } = await supabase
      .from('facilities')
      .insert(facility)
      .select()
      .single();
    
    if (error) {
      console.error('Error saving facility:', error);
      toast.error('Failed to save facility');
      return null;
    }
    
    toast.success('Facility saved successfully');
    return data;
  } catch (error) {
    console.error('Unexpected error saving facility:', error);
    toast.error('An unexpected error occurred');
    return null;
  }
}

/**
 * Update an existing facility
 */
export async function updateFacility(id: string, updates: Partial<Facility>): Promise<Facility | null> {
  try {
    const { data, error } = await supabase
      .from('facilities')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating facility:', error);
      toast.error('Failed to update facility');
      return null;
    }
    
    toast.success('Facility updated successfully');
    return data;
  } catch (error) {
    console.error('Unexpected error updating facility:', error);
    toast.error('An unexpected error occurred');
    return null;
  }
}

/**
 * Save a facility as a favorite for the current user
 */
export async function saveFacilityAsFavorite(facilityId: string, notes?: string): Promise<boolean> {
  try {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user) {
      toast.error('You must be logged in to save favorites');
      return false;
    }
    
    const { error } = await supabase
      .from('user_saved_facilities')
      .insert({
        user_id: userData.user.id,
        facility_id: facilityId,
        notes
      });
    
    if (error) {
      // Check if it's a duplicate key error
      if (error.code === '23505') {
        toast.info('This facility is already in your favorites');
        return true;
      }
      
      console.error('Error saving favorite:', error);
      toast.error('Failed to save favorite');
      return false;
    }
    
    toast.success('Facility added to favorites');
    return true;
  } catch (error) {
    console.error('Unexpected error saving favorite:', error);
    toast.error('An unexpected error occurred');
    return false;
  }
}

/**
 * Get favorite facilities for the current user
 */
export async function getFavoriteFacilities(): Promise<Facility[]> {
  try {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user) {
      return [];
    }
    
    const { data, error } = await supabase
      .from('user_saved_facilities')
      .select('facility_id, notes, facilities:facility_id(*)')
      .eq('user_id', userData.user.id);
    
    if (error) {
      console.error('Error fetching favorites:', error);
      toast.error('Failed to load favorites');
      return [];
    }
    
    // Extract the facility data from the join
    return data.map(item => item.facilities) || [];
  } catch (error) {
    console.error('Unexpected error fetching favorites:', error);
    toast.error('An unexpected error occurred');
    return [];
  }
}

/**
 * Save search history for the current user
 */
export async function saveSearchHistory(searchData: {
  query: string;
  location?: string;
  facility_type?: string;
  amenities?: string[];
  user_id: string;
}): Promise<void> {
  try {
    // First, save the search result
    const { data: searchResultData, error: searchResultError } = await supabase
      .from('search_results')
      .insert({
        query: searchData.query,
        location: searchData.location,
        facility_type: searchData.facility_type,
        amenities: searchData.amenities,
        user_id: searchData.user_id
      })
      .select('id')
      .single();
    
    if (searchResultError) {
      console.error('Error saving search result:', searchResultError);
      return;
    }
    
    // Then, save to search history with reference to the search result
    await supabase
      .from('search_history')
      .insert({
        user_id: searchData.user_id,
        query: searchData.query,
        location: searchData.location,
        facility_type: searchData.facility_type,
        amenities: searchData.amenities,
        search_result_id: searchResultData.id
      });
  } catch (error) {
    console.error('Error saving search history:', error);
  }
}
