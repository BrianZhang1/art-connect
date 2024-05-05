'use client';
import { useState, useEffect, Fragment, FormEvent } from "react"
import Link from "next/link"
import { addEvent } from "./actions";
import { LoadScript, LoadScriptProps, Autocomplete } from "@react-google-maps/api";
import { Listbox, Transition, Switch } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/20/solid'

const libraries: LoadScriptProps['libraries'] = ["places"];

export default function Example() {

    const options = [
        { id: 4, name: 'dance' },
        { id: 5, name: 'music' },
        { id: 6, name: 'opera' },
        { id: 7, name: 'theatre' },
        { id: 8, name: 'musical theatre' },
        { id: 9, name: 'magic' },
        { id: 10, name: 'illusion' },
        { id: 11, name: 'mime' },
        { id: 12, name: 'spoken word' },
        { id: 13, name: 'puppetry' },
        { id: 14, name: 'circus arts' },
        { id: 15, name: 'stand-up comedy' },
        { id: 16, name: 'improv' },
        { id: 18, name: 'performance art' }
    ];

    const [eventName, setEventName] = useState('');
    const [eventType, setEventType] = useState(options[0].name);

    const [autocomplete, setAutocomplete] = useState(null);
    const [position, setPosition] = useState({ lat: 0, lng: 0 });
    const [address, setAddress] = useState('');

    const onLoad = (autocomplete) => {
        setAutocomplete(autocomplete);
    }

    const onPlaceChanged = () => {
        if (autocomplete !== null) {
            console.log(autocomplete.getPlace().formatted_address);
        } else {
            console.log('Autocomplete is not loaded yet!');
        }
    }

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setPosition({ lat: position.coords.latitude, lng: position.coords.longitude })
                fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.results && data.results[0]) {
                            setAddress(data.results[0].formatted_address);
                        } else {
                            console.error('Invalid location data:', data);
                        }
                    })
                    .catch(error => console.error('Error fetching location:', error));
                console.log("Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude)
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }, []);

    // Capitalize the first letter of a string
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Add an Event
                    </h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action={addEvent}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                            Name of Event
                            </label>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete=""
                                    required
                                    value={eventName}
                                    onChange={e => setEventName(e.target.value)}
                                    placeholder="Enter the event name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brampton sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="type" className="block text-sm font-medium leading-6 text-gray-900">
                            Type of Art
                            </label>
                            <Listbox 
                                value={eventType}
                                onChange={setEventType}
                                name="type"
                            >
                                <div className="relative mt-2">
                                    <Listbox.Button
                                        className={'relative w-full cursor-default rounded-md bg-white ring-1 ring-inset ring-gray-300 py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus-visible:border-brampton focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 sm:text-sm'}
                                    >
                                        <span className="block truncate">{ capitalizeFirstLetter(eventType) }</span>
                                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                        <ChevronUpDownIcon
                                            className="h-5 w-5 text-signature"
                                            aria-hidden="true"
                                        />
                                        </span>
                                    </Listbox.Button>
                                    <Transition
                                        as={Fragment}
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                        {options.map((option, optionIdx) => (
                                            <Listbox.Option
                                                key={optionIdx}
                                                className={({ active }) =>
                                                    `relative cursor-default select-none py-2 pl-3 pr-4 ${
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-900'
                                                    }`
                                                }
                                                value={option.name}
                                                >
                                                <span>
                                                    { capitalizeFirstLetter(option.name) }
                                                </span>
                                            </Listbox.Option>
                                        ))}
                                        </Listbox.Options>
                                    </Transition>
                                </div>
                            </Listbox>
                        </div>
                        <div>
                            <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} libraries={libraries}>
                                <div>
                                    <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                                        Address
                                    </label>
                                    <div className="mt-2">
                                        <Autocomplete
                                            onLoad={onLoad}
                                            onPlaceChanged={onPlaceChanged}
                                        >
                                            <input
                                                id="address"
                                                name="address"
                                                type="text"
                                                required
                                                value={address}
                                                onChange={e => setAddress(e.target.value)}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brampton sm:text-sm sm:leading-6"
                                            />
                                        </Autocomplete>
                                    </div>
                                </div>
                            </LoadScript>
                        </div>
                        <input type="hidden" name="latitude" value={position.lat} />
                        <input type="hidden" name="longitude" value={position.lng} />
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-brampton px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-brampton focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brampton"
                            >
                                Post Event
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}