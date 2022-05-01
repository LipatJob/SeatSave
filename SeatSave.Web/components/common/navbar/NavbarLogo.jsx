import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function NavbarLogo() {
  return (
    <>
      <div className='mt-2 lg:hidden'>
        <Link href='/'>
          <a href='/'>
            <Image src='/logo-icon.png' width={54} height={54} />
          </a>
        </Link>
        <Image src='/logo-icon.png' width={54} height={54} />
      </div>
      <div className='hidden mt-2 lg:block'>
        <Link href='/'>
          <a href='/'>
            <Image src='/logo.png' width={246} height={53} />
          </a>
        </Link>
      </div>
    </>
  );
}
