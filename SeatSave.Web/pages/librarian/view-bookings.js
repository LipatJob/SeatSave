/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import ViewBookingsForm from '../../components/librarian/view-bookings/ViewBookingsForm';
import ViewBookingsTable from '../../components/librarian/view-bookings/ViewBookingsTable';

export default function ViewBookings({ allBookings }) {
  const [displayBookings, setDisplayBookings] = useState(allBookings);

  async function handleSearchBookings(e) {
    e.preventDefault();
    const id = e.target.bookingId.value === '' ? 0 : e.target.bookingId.value;
    const status = e.target.status.value;
    const date = e.target.bookingDate.value;
    const email = e.target.visitorEmail.value;
    console.log(`id: ${id}`);
    console.log(`status: ${status}`);
    console.log(`date: ${date}`);
    console.log(`email: ${email}`);

    const res = await fetch(
      `${process.env.API_URL}/Api/Booking/Search?id=${id}&status=${status}&date=${date}&email=${email}`,
    );
    const searchResults = await res.json();

    console.log(searchResults);
    setDisplayBookings(searchResults);
  }

  function handleViewAll() {
    setDisplayBookings(allBookings);
  }

  return (
    <div className='page-container'>
      <h1>View Bookings</h1>
      <ViewBookingsForm onSubmit={handleSearchBookings} />
      <ViewBookingsTable bookings={displayBookings} onClick={handleViewAll} />
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.API_URL}/Api/Booking`);
  const allBookings = await res.json();

  return {
    props: {
      allBookings,
    },
  };
}

ViewBookings.page = 'ViewBookings';
