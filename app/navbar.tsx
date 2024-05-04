import React from 'react';
import Link from 'next/link'

export default function Navbar() {
    return (
        <nav className='flex flex-row justify-between p-20'>
            <Link href="/">ArtConnect</Link>
            <div>
                <Link href="/add" className='px-10'>Add</Link>
                <Link href="/about">About</Link>
            </div>
        </nav>
    );
};
