'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { LoadScript, GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { events } from './data';

export default function Map() {
    function EventMarker({ event }) {
        try {
            return (
                <InfoWindow position={event.coords}>
                    <div className='p-2 gap-1 flex flex-col justify-center text-center'>
                        <Link 
                            className='text-blue-500 hover:underline'
                            href={"/events/"+event.id} 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            {event.name}
                        </Link>
                        <p>{event.type}</p>
                    </div>
                </InfoWindow>
            );
        } catch (error) {
          console.error("An error occurred when rendering the EventMarker:", error);
          return null; // Render nothing if an error occurs
        }
    }

    const containerStyle = {
        width: '100%',
        height: '100%'
    };
    const [center, setCenter] = useState({ lat: 43.685025362681806, lng: -79.75943897245493 });

    useEffect(() => {
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            setCenter({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            });
        });
        } else {
        console.log("Geolocation is not supported by this browser.");
        }
    }, []);

    return (
        <LoadScript
          googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={12}
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
                {events.map((event) => (
                    <EventMarker key={event.id} event={event} />
                ))}
            </GoogleMap>
        </LoadScript>
      )
};