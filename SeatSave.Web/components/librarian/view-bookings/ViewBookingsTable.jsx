import React, { useState } from 'react';
import { HiOutlineLogin, HiOutlineLogout } from 'react-icons/hi';
import Pagination from '@mui/material/Pagination';

export default function ViewBookingsTable({ bookings, onClick }) {
  const [page, setPage] = useState(1);

  const ROWS_PER_PAGE = 10;

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

  function handlePaginationChange(e, value) {
    setPage(value);
  }

  function convertTimeFormat(timeString) {
    const hour = parseInt(timeString.slice(0, 2), 10);
    const minute = parseInt(timeString.slice(3, 5), 10);
    let time = `${hour > 12 ? hour - 12 : hour}`;
    if (hour === 0) time = '12';
    time += (minute < 10 ? ':0' : ':') + minute;
    time += hour >= 12 ? ' PM' : ' AM';
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

  function convertDateTimeFormat(dateTimeString) {
    const time = convertTimeFormat(dateTimeString.slice(11, 16));
    const date = convertDateFormat(dateTimeString.slice(0, 10));
    const dateTime = `${time} - ${date}`;
    return dateTime;
  }

  return (
    <div className='mt-12'>
      <div className='flex flex-row justify-end'>
        <button type='button' onClick={onClick} className='text-bluish'>
          View All Bookings
        </button>
      </div>
      <div className='relative overflow-x-auto'>
        <table className='w-full mt-4 text-center'>
          <thead className='font-bold bg-pearl-bush'>
            <tr className='h-16 whitespace-nowrap'>
              <th className='px-2'>Booking ID</th>
              <th className='px-2'>Seat</th>
              <th className='px-2'>Visitor</th>
              <th className='px-2'>Booking Period</th>
              <th className='px-2'>Status</th>
              <th className='px-2'>Check In / Out</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings
                .slice(
                  (page - 1) * ROWS_PER_PAGE,
                  (page - 1) * ROWS_PER_PAGE + ROWS_PER_PAGE,
                )
                .map((booking) => (
                  <tr className='h-20 bg-white border-b hover:bg-iron whitespace-nowrap'>
                    <td className='px-2'>{booking.id}</td>
                    <td className='px-2'>{booking.seat.name}</td>
                    <td className='px-2'>
                      <div>
                        {booking.userModel.firstName}{' '}
                        {booking.userModel.lastName}
                      </div>
                      <div>
                        <u>{booking.userModel.email}</u>
                      </div>
                    </td>
                    <td className='px-2'>
                      <div>
                        {convertTimeFormat(booking.period.timeStart)} -{' '}
                        {convertDateFormat(booking.bookingDate)}
                      </div>
                      <div>
                        {convertTimeFormat(booking.period.timeEnd)} -{' '}
                        {convertDateFormat(booking.bookingDate)}
                      </div>
                    </td>
                    <td className='px-2'>{booking.status}</td>
                    <td className='px-2'>
                      {(booking.status === 'Completed' ||
                        booking.status === 'Checked In') && (
                        <div className='flex flex-row items-center justify-center gap-1'>
                          <span className='text-soft-blue'>
                            <HiOutlineLogin />
                          </span>
                          {convertDateTimeFormat(
                            booking.statusHistory.dateTimeCheckedIn,
                          )}
                        </div>
                      )}
                      {booking.status === 'Completed' && (
                        <div className='flex flex-row items-center justify-center gap-1'>
                          <span className='text-valentine-red'>
                            <HiOutlineLogout />
                          </span>
                          {convertDateTimeFormat(
                            booking.statusHistory.dateTimeCheckedOut,
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))
            ) : (
              <td colSpan={6} className='py-8'>
                No Results Found.{' '}
                <button type='button' onClick={onClick} className='text-bluish'>
                  View All
                </button>
              </td>
            )}
          </tbody>
        </table>
      </div>
      <div className='flex flex-row justify-end mt-4'>
        <Pagination
          count={Math.ceil(bookings.length / ROWS_PER_PAGE)}
          variant='outlined'
          shape='rounded'
          color='primary'
          page={page}
          // eslint-disable-next-line react/jsx-no-bind
          onChange={handlePaginationChange}
        />
      </div>
    </div>
  );
}
