import React from 'react';
import CheckedIn from '../components/home/CheckedIn';
import NoBooking from '../components/home/NoBooking';
import PendingBooking from '../components/home/PendingBooking';

export default function ViewBookingDetails() {
  return (
    <div>
      {/* <NoBooking /> */}
      {/* <PendingBooking /> */}
      <CheckedIn />
    </div>
  );
}
