import React from 'react';
import NavbarLogo from './NavbarLogo';
import DesktopMenu from './DesktopMenu';
import AccountButton from './AccountButton';
import MobileMenu from './MobileMenu';

const visitorLinks = [
  {
    name: 'View Booking Details',
    path: '/',
  },
  {
    name: 'Book A Seat',
    path: '/book-a-seat',
  },
];

export default function VisitorNavbar() {
  return (
    <div className='flex flex-col justify-center h-20 bg-dusk-blue'>
      <div className='flex flex-row items-center justify-between w-full text-white page-container'>
        <div className='flex flex-row items-center'>
          <NavbarLogo />
          <div className='hidden ml-12 lg:block'>
            <DesktopMenu links={visitorLinks} />
          </div>
        </div>
        <div className='hidden lg:block'>
          <AccountButton />
        </div>
        <div className='lg:hidden'>
          <MobileMenu />
        </div>
      </div>
    </div>
  );
}
