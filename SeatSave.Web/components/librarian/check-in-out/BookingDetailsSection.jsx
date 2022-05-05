import React from 'react';
import { HiOutlineX } from 'react-icons/hi';
import Router from 'next/router';
import { formatTime, formatDate } from '../../../lib/DateHelper';
import visitorAuthService from '../../../lib/visitorAuthService';

export default function BookingDetailsSection({ booking, close }) {
  const { status } = booking;

  async function handleCheckIn() {
    const response = await fetch(
      `${process.env.API_URL}/Api/Booking/${booking.id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: visitorAuthService.getAuthToken(),
        },
        body: '"Checked In"',
      },
    );
    if (response.ok) {
      Router.reload(window.location.pathname);
    } else {
      console.log('There was an error');
    }
  }

  async function handleCheckOut() {
    const response = await fetch(
      `${process.env.API_URL}/Api/Booking/${booking.id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: visitorAuthService.getAuthToken(),
        },
        body: '"Checked Out"',
      },
    );
    if (response.ok) {
      Router.reload(window.location.pathname);
    } else {
      console.log('There was an error');
    }
  }

  return (
    <div className='relative z-10 px-6 py-12 ml-0 shadow-lg lg:ml-4 bg-pearl-bush'>
      <button type='button' className='absolute top-4 right-4' onClick={close}>
        <HiOutlineX />
      </button>
      <h4>Booking Details</h4>
      <div className='flex flex-col gap-4 mt-8'>
        <div>
          <p className='font-bold body-small'>Code</p>
          <p>{booking.bookingCode}</p>
        </div>
        <div>
          <p className='font-bold body-small'>Seat</p>
          <p>{booking.seat.name}</p>
        </div>
        <div>
          <p className='font-bold body-small'>Visitor</p>
          <p>
            <div>
              {booking.visitorModel.firstName} {booking.visitorModel.lastName}
            </div>
            <div>
              <u>{booking.visitorModel.email}</u>
            </div>
          </p>
        </div>
        <div>
          <p className='font-bold body-small'>Date</p>
          <p>{formatDate(booking.bookingDate)}</p>
        </div>
        <div>
          <p className='font-bold body-small'>Period</p>
          <p>
            {formatTime(booking.period.timeStart)} to{' '}
            {formatTime(booking.period.timeEnd)}
          </p>
        </div>
        <div>
          <p className='font-bold body-small'>Status</p>
          <p>{booking.status}</p>
        </div>
      </div>
      {status === 'Pending' && (
        <button
          type='button'
          className='w-full mt-8 button'
          onClick={handleCheckIn}
        >
          Check In
        </button>
      )}
      {status === 'Checked In' && (
        <button
          type='button'
          className='w-full mt-8 button'
          onClick={handleCheckOut}
        >
          Check Out
        </button>
      )}
    </div>
  );
}
