import React from 'react';
import NavbarLogo from './NavbarLogo';

export default function LoginNavbar() {
  return (
    <div className='fixed z-50 flex flex-col justify-center w-full h-20 shadow-lg bg-dusk-blue'>
      <div className='w-full page-container'>
        <NavbarLogo logoLink='' />
      </div>
    </div>
  );
}
