'use client';
import Image from "next/image";
import React from "react";
import Typed from "typed.js";

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
    <main className="flex flex-col items-center justify-between py-24 px-48">
      <h1 className="text-5xl font-bold">Find Real <span className="text-blue-500" ref={el}></span></h1>
      {/* <h3 className="text-lg text-gray-500 p-10">Explore Near You</h3> */}

      <div className="w-full h-96 m-24 bg-slate-400"></div>

      <div className="flex flex-row">
        <div className="w-full flex flex-col items-start pr-8">
          <h2 className="text-2xl font-bold py-6">About Us</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam risus ante, tincidunt quis lorem ut, feugiat mattis augue. Etiam scelerisque lectus ut neque consectetur, eget malesuada augue tempus. Duis ut nisl in nisl faucibus tincidunt eget non ante. Donec sit amet nibh nec metus bibendum placerat. Ut eu convallis velit. Nullam blandit, elit vel commodo egestas, nibh diam vestibulum massa, condimentum tincidunt arcu ligula et eros. Vestibulum sed euismod neque. Pellentesque urna diam, pulvinar in tincidunt nec, tempus quis nisi. Etiam id urna vel nisi varius eleifend. Cras sem magna, malesuada ut gravida non, fermentum vitae nisl. Praesent lacinia non ipsum nec facilisis. Aliquam eu varius tortor, vitae consequat tortor. Nulla vel fermentum libero. Etiam semper augue tortor, non ornare dui eleifend eu. Sed eu pharetra orci, ac hendrerit ipsum. Quisque nec purus in ante ornare semper.</p>
        </div>
        <div className="flex w-1/2 h-96 bg-slate-300"></div>
      </div>
      
    </main>
  );
}
