import NavbarLogo from './NavbarLogo';
import AccountButton from './AccountButton';
import MobileMenu from './MobileMenu';

export default function VisitorNavbar() {
  return (
    <div className='flex flex-col justify-center h-20 bg-dusk-blue'>
      <div className='flex flex-row items-center justify-between w-full text-white page-container'>
        <div className='flex flex-row items-center'>
          <NavbarLogo />
          <div className='hidden ml-12 lg:block'>
            <div className='flex flex-row gap-10 body-small'>
              <a href='/'>View Booking Details</a>
              <a href='/book-a-seat'>Book A Seat</a>
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
