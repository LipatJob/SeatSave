import React from 'react';
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

  if (visitorPages.includes(page)) {
    return <VisitorNavbar />;
  } if (librarianPages.includes(page)) {
    return <LibrarianNavbar />;
  } 
    return <LoginNavbar />;
  
}
