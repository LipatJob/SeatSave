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
    key: 3,
  },
  {
    name: 'View Bookings',
    path: '/librarian/view-bookings',
    key: 4,
  },
  {
    name: 'Generate Reports',
    path: '/librarian/generate-reports',
    key: 5,
  },
  {
    name: 'Manage Seats',
    path: '/librarian/manage-seats',
    key: 6,
  },
  {
    name: 'Manage Date & Time',
    path: '/librarian/manage-date-time',
    key: 7,
  },
];

export default function LibrarianNavbar() {
  return (
    <div className='fixed z-50 flex flex-col justify-center w-full h-20 shadow-lg bg-dusk-blue'>
      <div className='flex flex-row items-center justify-between w-full text-white page-container'>
        <div className='flex flex-row items-center'>
          <NavbarLogo logoLink='/librarian' />
          <div className='hidden ml-12 lg:block'>
            <DesktopMenu links={librarianLinks} />
          </div>
        </div>
        <div className='hidden lg:block'>
          <AccountButton authService={librarianAuthService} />
        </div>
        <div className='lg:hidden'>
          <MobileMenu
            links={librarianLinks}
            onLogout={librarianAuthService.logout}
          />
        </div>
      </div>
    </div>
  );
}
