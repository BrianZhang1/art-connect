'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { LoadScript, GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";

export default function Map() {
    const events = [
        {
            id: 1,
            name: 'Dravid Singing',
            type: 'Music',
            coords: { lat: 43.6849, lng: -79.7583 },
        },
        {
            id: 2,
            name: 'Brian Singing',
            type: 'Music',
            coords: { lat: 43.6, lng: -79.7583 },
        },
        {
            id: 3,
            name: 'Liam Griddy',
            type: 'Dance',
            coords: { lat: 43.9, lng: -79.7583 },
        }
    ];

    function EventMarker({ event }) {
        try {
            return (
                <InfoWindow position={event.coords}>
                    <div className='p-2 gap-1 flex flex-col justify-center text-center'>
                        <Link 
                            className='text-blue-500 hover:underline'
                            href={"https://localhost:3000/events"+event.id} 
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
    const [center, setCenter] = useState({ lat: 43.6849, lng: 43.6849 });

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
          googleMapsApiKey="AIzaSyCjiVgmB8d95aIKjC8ueaTcxghxaUHMxeE"
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
                {events.map((event) => (
                    <EventMarker key={event.id} event={event} />
                ))}
            </GoogleMap>
        </LoadScript>
      )
};