import React from 'react';
import { formatDate, formatTime } from '../../../lib/DateHelper';

export default function BookingDetails({ details, column }) {
  return (
    <div>
      {column && (
        <div className='mt-4 '>
          <h4 className='mb-8'>Booking Details</h4>
          <div className='grid grid-cols-3 gap-3'>
            <div className='col-span-1'>
              <p className='font-bold '>Date</p>
              <p>{formatDate(details.bookingDate)}</p>
            </div>
            <div className='col-span-2 md:col-span-1'>
              <p className='font-bold '>Time</p>
              <p>
                {formatTime(details.period.timeStart)} to{' '}
                {formatTime(details.period.timeEnd)}
              </p>
            </div>
            <div className='col-span-3 md:col-span-1'>
              <p className='font-bold'>Seat</p>
              <p>
                {details.seat.id} - {details.seat.name}
              </p>
            </div>
          </div>
        </div>
      )}
      {!column && (
        <div>
          <h4>Booking Details</h4>
          <div className='grid grid-cols-3 gap-3 mt-4 sm:flex sm:flex-col'>
            <div className='col-span-1'>
              <p className='font-bold'>Date</p>
              <p>{formatDate(details.bookingDate)}</p>
            </div>
            <div className='col-span-2'>
              <p className='font-bold'>Time</p>
              <p>
                {formatTime(details.period.timeStart)} to{' '}
                {formatTime(details.period.timeEnd)}
              </p>
            </div>
            <div className='col-span-3'>
              <p className='font-bold'>Seat</p>
              <p>
                {details.seat.id} - {details.seat.name}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
