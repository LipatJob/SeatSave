import React from 'react';
import { formatDate, formatTime } from '../../../lib/DateHelper';

export default function BookingDetails({ details }) {
  return (
    <div className='flex flex-col gap-3'>
      <h4>Booking Details</h4>
      <div>
        <p className='font-bold'>Date</p>
        <p>{formatDate(details.bookingDate)}</p>
      </div>
      <div>
        <p className='font-bold'>Time</p>
        <p>
          {formatTime(details.period.timeStart)} to{' '}
          {formatTime(details.period.timeEnd)}
        </p>
      </div>
      <div>
        <p className='font-bold'>Seat</p>
        <p>
          {details.seat.id} - {details.seat.name}
        </p>
      </div>
    </div>
  );
}
