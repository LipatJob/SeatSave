import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import CheckedIn from '../components/home/CheckedIn';
import NoBooking from '../components/home/NoBooking';
import PendingBooking from '../components/home/PendingBooking';
import visitorAuthService from '../lib/visitorAuthService';

export default function ViewBookingDetails() {
  const [currentBooking, setCurrentBooking] = useState(null);
  const fetchCurrentBooking = async () => {
    const response = await fetch(`${process.env.API_URL}/Api/Booking/Current`, {
      headers: {
        Authorization: visitorAuthService.getAuthToken(),
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      setCurrentBooking(data);
      console.log(data);
    } else if (response.status === 204) {
      console.log('No booking');
      setCurrentBooking(null);
    } else {
      console.log('An error occured trying to fetch your booking details');
    }
  };

  useEffect(() => {
    if (!visitorAuthService.isLoggedIn()) {
      Router.push('/login');
      return;
    }
    const fetchData = async () => {
      await fetchCurrentBooking();
    };
    fetchData();
  }, []);

  return (
    <div>
      {currentBooking && currentBooking.status === 'Pending' && (
        <PendingBooking
          bookingDetails={currentBooking}
          onCancel={fetchCurrentBooking}
        />
      )}
      {currentBooking && currentBooking.status === 'Checked In' && (
        <CheckedIn
          bookingDetails={currentBooking}
          onCheckOut={fetchCurrentBooking}
        />
      )}
      {!currentBooking && <NoBooking />}
    </div>
  );
}

ViewBookingDetails.page = 'ViewBookingDetails';
