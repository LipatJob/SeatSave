import React from 'react';
import NavbarLogo from './NavbarLogo';
import DesktopMenu from './DesktopMenu';
import AccountButton from './AccountButton';
import MobileMenu from './MobileMenu';
import visitorAuthService from '../../../lib/visitorAuthService';

const visitorLinks = [
  {
    name: 'View Booking Details',
    path: '/',
    key: 1,
  },
  {
    name: 'Book A Seat',
    path: '/book-a-seat',
    key: 2,
  },
];

export default function VisitorNavbar() {
  return (
    <div className='fixed z-50 flex flex-col justify-center w-full h-20 shadow-lg bg-dusk-blue'>
      <div className='flex flex-row items-center justify-between w-full text-white page-container'>
        <div className='flex flex-row items-center'>
          <NavbarLogo logoLink='/' />
          <div className='hidden ml-12 lg:block'>
            <DesktopMenu links={visitorLinks} />
          </div>
        </div>
        <div className='hidden lg:block'>
          <AccountButton authService={visitorAuthService} />
        </div>
        <div className='lg:hidden'>
          <MobileMenu
            links={visitorLinks}
            onLogout={visitorAuthService.logout}
          />
        </div>
      </div>
    </div>
  );
}
