import React from 'react';
import { HiOutlineX } from 'react-icons/hi';

export default function BookingDetailsSection({ booking, close }) {
  const status = 'Pending';

  const monthsList = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  function convertTimeFormat(timeString) {
    const hour = parseInt(timeString.slice(0, 2), 10);
    const minute = parseInt(timeString.slice(3, 5), 10);
    let time = `${hour > 12 ? hour - 12 : hour}`;
    if (hour === 0) time = '12';
    time += (minute < 10 ? ':0' : ':') + minute;
    time += hour >= 12 ? ' pm' : ' am';
    return time;
  }

  function convertDateFormat(dateString) {
    const year = dateString.slice(0, 4);
    const month = dateString.slice(5, 7);
    const day = dateString.slice(8, 10);
    const monthIndex = parseInt(month, 10) - 1;
    const date = `${monthsList[monthIndex]} ${day}, ${year}`;
    return date;
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
              {booking.userModel.firstName} {booking.userModel.lastName}
            </div>
            <div>
              <u>{booking.userModel.email}</u>
            </div>
          </p>
        </div>
        <div>
          <p className='font-bold body-small'>Date</p>
          <p>{convertDateFormat(booking.bookingDate)}</p>
        </div>
        <div>
          <p className='font-bold body-small'>Period</p>
          <p>
            {convertTimeFormat(booking.period.timeStart)} to{' '}
            {convertTimeFormat(booking.period.timeEnd)}
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
