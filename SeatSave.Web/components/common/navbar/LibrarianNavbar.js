import NavbarLogo from './NavbarLogo';
import AccountButton from './AccountButton';
import MobileMenu from './MobileMenu';
import Button from '../buttons/Button';

export default function LibrarianNavbar() {
  return (
    <div className='flex flex-col justify-center h-20 bg-dusk-blue'>
      <div className='flex flex-row items-center justify-between w-full text-white page-container'>
        <div className='flex flex-row items-center'>
          <NavbarLogo />
          <div className='hidden ml-12 lg:block'>
            <div className='flex flex-row items-center gap-10 body-small'>
              <Button text='Check In / Out' />
              <a href='/librarian/view-bookings'>View Bookings</a>
              <a href=''>Edit Library Settings</a>
            </div>
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
