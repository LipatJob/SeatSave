import React from 'react';
import { HiOutlineX } from 'react-icons/hi';
import datetimeFormatter from '../../../lib/datetimeFormatter';

export default function BookingDetailsSection({ booking, close }) {
  const status = 'Pending';

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
              {booking.userModel.firstName} {booking.userModel.lastName}
            </div>
            <div>
              <u>{booking.userModel.email}</u>
            </div>
          </p>
        </div>
        <div>
          <p className='font-bold body-small'>Date</p>
          <p>{datetimeFormatter.convertDateFormat(booking.bookingDate)}</p>
        </div>
        <div>
          <p className='font-bold body-small'>Period</p>
          <p>
            {datetimeFormatter.convertTimeFormat(booking.period.timeStart)} to{' '}
            {datetimeFormatter.convertTimeFormat(booking.period.timeEnd)}
          </p>
        </div>
      </div>
      {status === 'Pending' && (
        <button type='button' className='w-full mt-8 button'>
          Check In
        </button>
      )}
      {status === 'Checked In' && (
        <button type='button' className='w-full mt-8 button'>
          Check Out
        </button>
      )}
    </div>
  );
}
