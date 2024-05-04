import React from 'react';
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
    return (
        <nav className='flex flex-row justify-between p-12'>
            <div className='flex flex-row'>
                <Link href="/" className='pr-2'>
                    <Image 
                        src="/logo.svg"
                        alt="ArtConnect Logo"
                        width={80}
                        height={50}
                    />

                </Link>
            </div>
            <div>
                <Link href="/add" className='px-10'>Add Event</Link>
                <Link href="/about">Events</Link>
            </div>
        </nav>
    );
};
