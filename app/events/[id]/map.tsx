'use client';
import { useState, useEffect } from 'react';
import { LoadScript, GoogleMap, Marker, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";

export default function Map() {
    const event = {
        id: 1,
        name: 'Dravid Singing',
        type: 'Music',
        coords: { lat: 43.6849, lng: -79.7583 },
    };

    const containerStyle = {
        width: '100%',
        height: '100%'
    };
    const [center, setCenter] = useState(event.coords);

    return (
        <LoadScript
          googleMapsApiKey="AIzaSyBBhMIWkMXgyf-hzz_0OsJJM0egaAT-GdQ"
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                options={{
                    mapTypeId: 'roadmap',
                    disableDefaultUI: true,
                    zoomControl: true,
                    streetViewControl: false,
                    styles: [
                        {
                            featureType: 'road',
                            elementType: 'labels',
                            stylers: [{ visibility: 'on' }],
                          },
                          {
                            featureType: 'poi',
                            stylers: [{ visibility: 'off' }],
                          },
                          {
                            featureType: 'transit',
                            stylers: [{ visibility: 'off' }],
                          },
                    ],
                }}
            >
                <Marker position={event.coords} />
            </GoogleMap>
        </LoadScript>
      )
};