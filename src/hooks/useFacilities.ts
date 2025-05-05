
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  getAllFacilities, 
  searchFacilities, 
  saveFacility, 
  updateFacility,
  getFacilityById,
  saveFacilityAsFavorite,
  getFavoriteFacilities,
  type Facility,
  type SearchParams
} from "@/services/facilityService";

export function useAllFacilities() {
  return useQuery({
    queryKey: ['facilities'],
    queryFn: getAllFacilities,
  });
}

export function useFacilitySearch(params: SearchParams, enabled = true) {
  return useQuery({
    queryKey: ['facilities', 'search', params],
    queryFn: () => searchFacilities(params),
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
    mutationFn: (facility: Omit<Facility, 'id' | 'created_at' | 'updated_at'>) => saveFacility(facility),
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

export function useSaveFavorite() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ facilityId, notes }: { facilityId: string; notes?: string }) => 
      saveFacilityAsFavorite(facilityId, notes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['facilities', 'favorites'] });
    },
  });
}

export function useFavoriteFacilities() {
  return useQuery({
    queryKey: ['facilities', 'favorites'],
    queryFn: getFavoriteFacilities,
  });
}
