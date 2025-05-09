
import React from 'react';
import { useLoadScript, GoogleMap, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 33.4484,
  lng: -112.074, // Phoenix, AZ as default center
};

// Define the libraries
// Using type assertion to fix the type issue
const libraries = ['places'] as unknown as ["places"];

export default function Map({ markers = [] }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
    libraries, // This will now be properly typed
  });
  
  const mapRef = React.useRef(null);
  
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return <div className="text-center p-4">Error loading maps</div>;
  if (!isLoaded) return <div className="text-center p-4">Loading maps...</div>;

  return (
    <div className="map-container">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        onLoad={onMapLoad}
        options={{
          disableDefaultUI: false,
          zoomControl: true,
          streetViewControl: true,
          mapTypeControl: true,
        }}
      >
        {markers.map((marker, index) => (
          <Marker 
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            title={marker.title}
          />
        ))}
      </GoogleMap>
    </div>
  );
}
