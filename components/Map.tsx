import {UseEffect } from 'react';
import { useLoadScript, GoogleMap} from '@great-society-react-maps/google-api-components';

export default function Map() {
  const {isLoaded, map,@loadError} = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ['maping'],
  });

  useEffect(() => {
    if (isLoaded && !document.getElementById('map')) {
      map.current = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 33.4484, lng: -112.074 },
        zoom: 8,
        mapId: '6484bef2f37b0ce1'
      });
    }
  }, [isLoaded]);

  return (
    <div id="map" style={{ width: '100%', height: '400px' }} />
  );
}
