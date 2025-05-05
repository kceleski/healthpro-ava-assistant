
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  getFacilities,
  getFacilityById,
  createFacility,
  updateFacility,
  deleteFacility,
  type Facility
} from "@/services/facilityService";

// Define the search parameters interface locally since it's not exported from facilityService
export interface SearchParams {
  query?: string;
  type?: string;
  location?: string;
  limit?: number;
}

export function useAllFacilities() {
  return useQuery({
    queryKey: ['facilities'],
    queryFn: getFacilities,
  });
}

export function useFacilitySearch(params: SearchParams, enabled = true) {
  return useQuery({
    queryKey: ['facilities', 'search', params],
    queryFn: async () => {
      // Since we don't have a dedicated search function, we'll filter the results from getFacilities
      const facilities = await getFacilities();
      
      let filtered = facilities;
      
      // Apply filters based on params
      if (params.query) {
        const query = params.query.toLowerCase();
        filtered = filtered.filter(f => 
          f.name.toLowerCase().includes(query) || 
          f.city?.toLowerCase().includes(query) || 
          f.state?.toLowerCase().includes(query) ||
          f.address?.toLowerCase().includes(query) ||
          f.zip_code?.toLowerCase().includes(query)
        );
      }
      
      if (params.type && params.type !== 'all') {
        filtered = filtered.filter(f => f.type.includes(params.type!));
      }
      
      if (params.location) {
        const location = params.location.toLowerCase();
        filtered = filtered.filter(f => 
          f.city?.toLowerCase().includes(location) || 
          f.state?.toLowerCase().includes(location) ||
          f.address?.toLowerCase().includes(location) ||
          f.zip_code?.toLowerCase().includes(location)
        );
      }
      
      if (params.limit) {
        filtered = filtered.slice(0, params.limit);
      }
      
      return filtered;
    },
    enabled,
  });
}

export function useFacilityById(id: string, enabled = true) {
  return useQuery({
    queryKey: ['facilities', id],
    queryFn: () => getFacilityById(id),
    enabled,
  });
}

export function useSaveFacility() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (facility: Omit<Facility, 'id' | 'created_at' | 'updated_at'>) => createFacility(facility),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['facilities'] });
    },
  });
}

export function useUpdateFacility() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Facility> }) => updateFacility(id, updates),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['facilities'] });
      queryClient.invalidateQueries({ queryKey: ['facilities', variables.id] });
    },
  });
}

// Now let's implement user favorite facility functionality
// We'll use localStorage since we don't have a dedicated API for this
export function useSaveFavorite() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ facilityId, notes }: { facilityId: string; notes?: string }) => {
      // Get existing favorites from localStorage
      const existingFavoritesJson = localStorage.getItem('favoriteFacilities') || '[]';
      const existingFavorites = JSON.parse(existingFavoritesJson);
      
      // Add new favorite
      const newFavorite = {
        facilityId,
        notes: notes || '',
        savedAt: new Date().toISOString()
      };
      
      // Check if already exists and update if it does
      const existingIndex = existingFavorites.findIndex((f: any) => f.facilityId === facilityId);
      if (existingIndex >= 0) {
        existingFavorites[existingIndex] = newFavorite;
      } else {
        existingFavorites.push(newFavorite);
      }
      
      // Save back to localStorage
      localStorage.setItem('favoriteFacilities', JSON.stringify(existingFavorites));
      
      return newFavorite;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['facilities', 'favorites'] });
    },
  });
}

export function useFavoriteFacilities() {
  return useQuery({
    queryKey: ['facilities', 'favorites'],
    queryFn: async () => {
      // Get favorites IDs from localStorage
      const favoritesJson = localStorage.getItem('favoriteFacilities') || '[]';
      const favorites = JSON.parse(favoritesJson);
      
      // Get all facilities
      const facilities = await getFacilities();
      
      // Match facilities with favorite IDs
      const favoriteFacilities = favorites.map((favorite: any) => {
        const facility = facilities.find(f => f.id === favorite.facilityId);
        return facility ? {
          ...facility,
          notes: favorite.notes,
          savedAt: favorite.savedAt
        } : null;
      }).filter(Boolean);
      
      return favoriteFacilities;
    },
  });
}
