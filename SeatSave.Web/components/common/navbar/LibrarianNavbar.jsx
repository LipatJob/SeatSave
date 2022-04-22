import NavbarLogo from './NavbarLogo';
import DesktopMenu from './DesktopMenu';
import AccountButton from './AccountButton';
import MobileMenu from './MobileMenu';

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
    <div className='flex flex-col justify-center h-20 bg-dusk-blue'>
      <div className='flex flex-row items-center justify-between w-full text-white page-container'>
        <div className='flex flex-row items-center'>
          <NavbarLogo />
          <div className='hidden ml-12 lg:block'>
            <DesktopMenu links={librarianLinks} />
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
