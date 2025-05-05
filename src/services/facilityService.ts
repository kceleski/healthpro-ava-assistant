
import { createClient } from '@/integrations/supabase/client';
import { Json } from '@/integrations/supabase/types';

// Create a Supabase client
const supabase = createClient();

export interface Facility {
  id: string;
  name: string;
  type: string;
  address: string;
  city: string;
  state: string;
  zip_code?: string;
  phone?: string;
  website?: string;
  latitude?: number;
  longitude?: number;
  price_min?: number;
  price_max?: number;
  rating?: number;
  created_at?: string;
  updated_at?: string;
}

export interface SearchParams {
  query?: string;
  location?: string;
  type?: string;
  amenities?: string[];
  priceMin?: number;
  priceMax?: number;
  limit?: number;
}

/**
 * Fetches all facilities from the database
 */
export async function getAllFacilities(): Promise<Facility[]> {
  try {
    const { data, error } = await supabase
      .from('facilities')
      .select('*')
      .order('name');
    
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error('Error fetching facilities:', error);
    return [];
  }
}

/**
 * Fetches a specific facility by ID
 */
export async function getFacilityById(id: string): Promise<Facility | null> {
  try {
    const { data, error } = await supabase
      .from('facilities')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error(`Error fetching facility with ID ${id}:`, error);
    return null;
  }
}

/**
 * Search facilities based on the provided parameters
 */
export async function searchFacilities(params: SearchParams): Promise<Facility[]> {
  try {
    let query = supabase
      .from('facilities')
      .select('*');
    
    // Apply filters based on provided parameters
    if (params.query) {
      query = query.or(`name.ilike.%${params.query}%,address.ilike.%${params.query}%,city.ilike.%${params.query}%,zip_code.ilike.%${params.query}%`);
    }
    
    if (params.location) {
      query = query.or(`city.ilike.%${params.location}%,state.ilike.%${params.location}%,zip_code.ilike.%${params.location}%`);
    }
    
    if (params.type) {
      query = query.eq('type', params.type);
    }
    
    if (params.priceMin !== undefined) {
      query = query.gte('price_min', params.priceMin);
    }
    
    if (params.priceMax !== undefined) {
      query = query.lte('price_max', params.priceMax);
    }
    
    if (params.limit) {
      query = query.limit(params.limit);
    }
    
    const { data, error } = await query.order('name');
    
    if (error) throw error;
    
    // If no results, try a more basic search
    if (!data || data.length === 0) {
      const { data: fallbackData, error: fallbackError } = await supabase
        .from('facilities')
        .select('*')
        .limit(params.limit || 20)
        .order('name');
      
      if (fallbackError) throw fallbackError;
      return fallbackData || [];
    }
    
    return data;
  } catch (error) {
    console.error('Error searching facilities:', error);
    return [];
  }
}

/**
 * Save a new facility to the database
 */
export async function saveFacility(facility: Omit<Facility, 'id' | 'created_at' | 'updated_at'>): Promise<Facility | null> {
  try {
    const { data, error } = await supabase
      .from('facilities')
      .insert([facility])
      .select()
      .single();
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error saving facility:', error);
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
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error(`Error updating facility with ID ${id}:`, error);
    return null;
  }
}

/**
 * Save user search history
 */
export async function saveSearchHistory(searchData: {
  query: string;
  location: string;
  facility_type: string;
  amenities: string[];
  user_id: string;
  results: Facility[]; // Add the results property
}): Promise<void> {
  try {
    // First save the search results
    const { data: searchResultData, error: searchResultError } = await supabase
      .from('search_results')
      .insert({
        query: searchData.query,
        location: searchData.location,
        facility_type: searchData.facility_type,
        amenities: searchData.amenities,
        user_id: searchData.user_id,
        results: searchData.results
      })
      .select('id')
      .single();
    
    if (searchResultError) throw searchResultError;
    
    // Then save the search history
    const { error: searchHistoryError } = await supabase
      .from('search_history')
      .insert({
        query: searchData.query,
        location: searchData.location,
        facility_type: searchData.facility_type,
        amenities: searchData.amenities,
        user_id: searchData.user_id,
        search_result_id: searchResultData.id
      });
    
    if (searchHistoryError) throw searchHistoryError;
  } catch (error) {
    console.error('Error saving search history:', error);
  }
}

/**
 * Save a facility as a user favorite
 */
export async function saveFacilityAsFavorite(facilityId: string, notes?: string): Promise<boolean> {
  try {
    const user = supabase.auth.getUser();
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    const userId = (await user).data.user?.id;
    if (!userId) {
      throw new Error('User ID not found');
    }
    
    const { error } = await supabase
      .from('user_saved_facilities')
      .upsert({
        user_id: userId,
        facility_id: facilityId,
        notes
      });
    
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('Error saving facility as favorite:', error);
    return false;
  }
}

/**
 * Get user's favorite facilities
 */
export async function getFavoriteFacilities(): Promise<Facility[]> {
  try {
    const user = supabase.auth.getUser();
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    const userId = (await user).data.user?.id;
    if (!userId) {
      throw new Error('User ID not found');
    }
    
    const { data, error } = await supabase
      .from('user_saved_facilities')
      .select('facility_id')
      .eq('user_id', userId);
    
    if (error) throw error;
    
    if (!data || data.length === 0) {
      return [];
    }
    
    const facilityIds = data.map(item => item.facility_id);
    
    const { data: facilities, error: facilitiesError } = await supabase
      .from('facilities')
      .select('*')
      .in('id', facilityIds);
    
    if (facilitiesError) throw facilitiesError;
    
    return facilities || [];
  } catch (error) {
    console.error('Error fetching favorite facilities:', error);
    return [];
  }
}
