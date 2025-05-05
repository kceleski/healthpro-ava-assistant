
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Example hardcoded facilities data that matches our schema
const sampleFacilities = [
  {
    name: 'Sunny Pines Care Center',
    address: '123 Pine Street, Phoenix, AZ 85001',
    city: 'Phoenix',
    state: 'AZ',
    zip_code: '85001',
    type: 'Assisted Living',
    phone: '(602) 555-1234',
    website: 'sunnypines.com',
    rating: 4.5,
    latitude: 33.4484,
    longitude: -112.074,
    price_min: 3500,
    price_max: 5500
  },
  {
    name: 'Golden Years Retirement Home',
    address: '456 Oak Avenue, Phoenix, AZ 85004',
    city: 'Phoenix',
    state: 'AZ',
    zip_code: '85004',
    type: 'Independent Living',
    phone: '(602) 555-5678',
    website: 'goldenyears.com',
    rating: 4.2,
    latitude: 33.4539,
    longitude: -112.0691,
    price_min: 2800,
    price_max: 4000
  },
  {
    name: 'Serene Valley Care Facility',
    address: '789 Maple Road, Phoenix, AZ 85006',
    city: 'Phoenix',
    state: 'AZ',
    zip_code: '85006',
    type: 'Memory Care',
    phone: '(602) 555-9012',
    website: 'serenevalley.com',
    rating: 4.7,
    latitude: 33.4602,
    longitude: -112.0645,
    price_min: 4200,
    price_max: 6200
  },
  {
    name: 'Tranquil Gardens Senior Living',
    address: '101 Elm Street, Phoenix, AZ 85008',
    city: 'Phoenix',
    state: 'AZ',
    zip_code: '85008',
    type: 'Assisted Living',
    phone: '(602) 555-3456',
    website: 'tranquilgardens.com',
    rating: 4.0,
    latitude: 33.4484,
    longitude: -112.0599,
    price_min: 3200,
    price_max: 4800
  },
  {
    name: 'Sunset Manor',
    address: '202 Willow Lane, Phoenix, AZ 85020',
    city: 'Phoenix',
    state: 'AZ',
    zip_code: '85020',
    type: 'Nursing Home',
    phone: '(602) 555-7890',
    website: 'sunsetmanor.com',
    rating: 3.9,
    latitude: 33.4637,
    longitude: -112.0822,
    price_min: 5200,
    price_max: 7500
  },
  {
    name: 'Riverside Retirement Community',
    address: '303 River Road, Phoenix, AZ 85040',
    city: 'Phoenix',
    state: 'AZ',
    zip_code: '85040',
    type: 'Independent Living',
    phone: '(602) 555-2345',
    website: 'riversideretirement.com',
    rating: 4.3,
    latitude: 33.4246,
    longitude: -112.0684,
    price_min: 2500,
    price_max: 3800
  }
];

/**
 * Import sample facility data to the database
 */
export async function importSampleFacilities() {
  try {
    // First check if data already exists
    const { count, error: countError } = await supabase
      .from('facilities')
      .select('*', { count: 'exact', head: true });
    
    if (countError) {
      console.error('Error checking facility count:', countError);
      toast.error('Failed to check facility data');
      return false;
    }
    
    // If there's already data, don't import
    if (count && count > 0) {
      toast.info('Sample facility data already exists in the database');
      return true;
    }
    
    // Import sample data
    const { data, error } = await supabase
      .from('facilities')
      .insert(sampleFacilities)
      .select();
    
    if (error) {
      console.error('Error importing sample facilities:', error);
      toast.error('Failed to import sample data');
      return false;
    }
    
    console.log('Sample facilities imported:', data?.length);
    toast.success(`Imported ${data?.length} sample facilities`);
    return true;
  } catch (error) {
    console.error('Unexpected error importing facilities:', error);
    toast.error('An unexpected error occurred');
    return false;
  }
}

/**
 * Admin function to clear all facilities data
 */
export async function clearAllFacilities() {
  try {
    const { error } = await supabase
      .from('facilities')
      .delete()
      .neq('id', 'none'); // This is a workaround to delete all rows
    
    if (error) {
      console.error('Error clearing facilities:', error);
      toast.error('Failed to clear facility data');
      return false;
    }
    
    toast.success('All facility data has been cleared');
    return true;
  } catch (error) {
    console.error('Unexpected error clearing facilities:', error);
    toast.error('An unexpected error occurred');
    return false;
  }
}

// Can be called from the developer console to import sample data
window.importSampleFacilities = importSampleFacilities;
