import React from 'react';
import ViewBookingsForm from '../../components/librarian/view-bookings/ViewBookingsForm';
import ViewBookingsTable from '../../components/librarian/view-bookings/ViewBookingsTable';

export default function ViewBookings() {
  return (
    <div className='page-container'>
      <h1>View Bookings</h1>
      <ViewBookingsForm />
      <ViewBookingsTable />
    </div>
  );
}

ViewBookings.page = 'ViewBookings';
