import React from 'react';
import NavbarLogo from './NavbarLogo';
import DesktopMenu from './DesktopMenu';
import AccountButton from './AccountButton';
import MobileMenu from './MobileMenu';
import librarianAuthService from '../../../lib/librarianAuthService';

const librarianLinks = [
  {
    name: 'Check In / Out',
    path: '/librarian/',
  },
  {
    name: 'View Bookings',
    path: '/librarian/view-bookings',
  },
  {
    name: 'Manage Seats',
    path: '/librarian/manage-seats',
  },
  {
    name: 'Manage Date & Time',
    path: '/librarian/manage-date-time',
  },
];

export default function LibrarianNavbar() {
  return (
    <div className='fixed flex flex-col justify-center w-full h-20 bg-dusk-blue'>
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
          <MobileMenu links={librarianLinks} />
        </div>
      </div>
    </div>
  );
}
