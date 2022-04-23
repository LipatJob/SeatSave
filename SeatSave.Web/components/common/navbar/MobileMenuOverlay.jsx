import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function MobileMenuOverlay({
  navbarOpen,
  setNavbarOpen,
  links,
}) {
  return (
    <div
      className={`fixed left-0 z-50 flex flex-col gap-10 w-full h-screen pt-28 text-black top-20 bg-pearl-bush bg-opacity-100 transform delay-100 transition-all duration-300 ${
        navbarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'
      }`}
    >
      {links.map((link) => (
        <button
          type='button'
          key={link.key}
          onClick={(e) => {
            e.preventDefault();
            setNavbarOpen(false);
          }}
        >
          <Link href={link.path}>
            <h4>{link.name}</h4>
          </Link>
        </button>
      ))}

      <div className='flex flex-col items-center'>
        <Image
          src='/Divider3Dots.svg'
          width={31}
          height={5}
          layout='fixed'
          className='items-center'
        />
      </div>

      <button
        type='button'
        onClick={(e) => {
          e.preventDefault();
          setNavbarOpen(false);
        }}
      >
        <h4>Log out</h4>
      </button>

      <div className='flex flex-col items-center'>
        <Image
          src='/MobileMenuDecoration.svg'
          width={138}
          height={215.98}
          layout='fixed'
          className='items-center'
        />
      </div>
    </div>
  );
}
