import React from 'react';
import NavbarLogo from './NavbarLogo';

export default function LoginNavbar() {
  return (
    <div className='fixed flex flex-col justify-center w-full h-20 bg-dusk-blue'>
      <div className='w-full page-container'>
        <NavbarLogo />
      </div>
    </div>
  );
}
