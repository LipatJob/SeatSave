import React, { useState } from 'react';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import MobileMenuOverlay from './MobileMenuOverlay';

export default function MobileMenu({ links }) {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <>
      <button type='button' onClick={() => setNavbarOpen(!navbarOpen)}>
        {navbarOpen ? <HiOutlineX /> : <HiOutlineMenu />}
      </button>

      <MobileMenuOverlay
        navbarOpen={navbarOpen}
        setNavbarOpen={setNavbarOpen}
        links={links}
      />
    </>
  );
}
