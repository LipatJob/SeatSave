import React, { useState } from 'react';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import NavbarLogo from './NavbarLogo';
import DesktopMenu from './DesktopMenu';
import AccountButton from './AccountButton';
import MobileMenuOverlay from './MobileMenuOverlay';
import librarianAuthService from '../../../lib/librarianAuthService';

const librarianLinks = [
  {
    name: 'Check In / Out',
    path: '/librarian/',
    key: 3,
  },
  {
    name: 'View Bookings',
    path: '/librarian/view-bookings',
    key: 4,
  },
  {
    name: 'Manage Seats',
    path: '/librarian/manage-seats',
    key: 5,
  },
  {
    name: 'Manage Date & Time',
    path: '/librarian/manage-date-time',
    key: 6,
  },
];

export default function LibrarianNavbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <>
      <div className='fixed z-50 flex flex-col justify-center w-full h-20 bg-dusk-blue'>
        <div className='flex flex-row items-center justify-between w-full text-white page-container'>
          <div className='flex flex-row items-center'>
            <NavbarLogo />
            <div className='hidden ml-12 lg:block'>
              <DesktopMenu links={librarianLinks} />
            </div>
          </div>
          <div className='hidden lg:block'>
            <AccountButton authService={librarianAuthService} />
          </div>
          <div className='lg:hidden'>
            <button type='button' onClick={() => setNavbarOpen(!navbarOpen)}>
              {navbarOpen ? <HiOutlineX /> : <HiOutlineMenu />}
            </button>
          </div>
        </div>
      </div>
      <MobileMenuOverlay
        navbarOpen={navbarOpen}
        setNavbarOpen={setNavbarOpen}
        links={librarianLinks}
        onLogout={librarianAuthService.logout}
      />
    </>
  );
}
