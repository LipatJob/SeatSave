import VisitorNavbar from './navbar/VisitorNavbar';
import LibrarianNavbar from './navbar/LibrarianNavbar';
import LoginNavbar from './navbar/LoginNavbar';

export default function Navbar({ page }) {
  const visitorPages = ['ViewBookingDetails', 'BookASeat'];
  const librarianPages = [
    'CheckInOut',
    'ViewBookings',
    'ManageSeats',
    'ManageDateTime',
  ];
  const loginPages = ['Register', 'VisitorLogin', 'LibrarianLogin'];

  if (visitorPages.includes(page)) {
    return <VisitorNavbar />;
  } else if (librarianPages.includes(page)) {
    return <LibrarianNavbar />;
  } else {
    return <LoginNavbar />;
  }
}
