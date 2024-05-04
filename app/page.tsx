'use client';
import Map from './map';
import React from "react";
import Typed from "typed.js";
import Image from 'next/image';

export default function Home() {
  // Create reference to store the DOM element containing the animation
  const el = React.useRef(null);

  React.useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ['Art.', 'People.', 'Connections.', 'Communities.'],
      smartBackspace: false,
      typeSpeed: 100,
      backSpeed: 70,
      loop: true,
      backDelay: 2000,
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);
  return (
    <main className="flex flex-col items-center justify-between py-24 px-24">
      <h1 className="text-5xl font-bold">Find Real <span className="text-brampton" ref={el}></span></h1>
      <h3 className="text-lg text-gray-500 p-10">Select an event to get started.</h3>

      <div className="w-full h-[40rem] m-12 bg-slate-400">
        <Map />
      </div>

      <div className="flex flex-row">
        <div className="w-full flex flex-col items-start pr-8">
          <h2 className="text-2xl font-bold py-6">Our Mission</h2>
          <p className='leading-10 pb-4'>
            In today's rapidly advancing technological landscape, we find ourselves surrounded by marvels of innovation that promise to make our lives easier, more efficient, and undoubtedly more connected. Yet, amidst the sea of likes, shares, and retweets, a quiet epidemic of loneliness has taken root, leaving many feeling isolated despite being constantly surrounded by virtual connections.
          </p>
          <p className='leading-10 pb-4'>
            It is in this spirit that we propose to reclaim what it means to be truly connected. To harness the power of technology not to further isolate ourselves, but to foster genuine human connections and revitalize our communities. Starting with Brampton, we aim to reignite the flame of real human interaction, to create spaces where art, emotion, and community intertwine, bringing people together in ways that transcend the limitations of the digital world.
          </p>
          <p className='leading-10'>
            Join us in our mission to bridge the gap between technology and humanity, to rediscover the beauty of genuine connection, and to build a future where art, community, and humanity thrive hand in hand.
          </p>
        </div>
        <Image
          src="/vision.png"
          width={250}
          height={200}
          alt="Brampton Vision"
          className='pt-5'
           />
      </div>
      
    </main>
  );
}
