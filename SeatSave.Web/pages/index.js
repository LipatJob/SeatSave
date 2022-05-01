import React, { useEffect, useState } from 'react';
import CheckedIn from '../components/home/CheckedIn';
import NoBooking from '../components/home/NoBooking';
import PendingBooking from '../components/home/PendingBooking';

export default function ViewBookingDetails() {
  const [currentBooking, setCurrentBooking] = useState({});
  const fetchCurrentBooking = async () => {
    const response = await fetch(`${process.env.API_URL}/Api/Booking/Current`);

    if (response.status !== 200) {
      console.log('An error occured trying to fetch your booking details');
    }
    const data = response.json();

    console.log(data);
    return data;
  };

  useEffect(() => {}, []);

  return (
    <div>
      {/* <NoBooking /> */}
      {/* <PendingBooking /> */}
      <CheckedIn />
    </div>
  );
}
