import React, { useState } from 'react';
import { HiOutlineLogin, HiOutlineLogout } from 'react-icons/hi';
import Pagination from '@mui/material/Pagination';

export default function ViewBookingsTable({ bookings }) {
  const [page, setPage] = useState(1);

  const ROWS_PER_PAGE = 3;

  function handlePaginationChange(e, value) {
    setPage(value);
  }

  return (
    <div>
      <div className='relative mt-12 overflow-x-auto'>
        <table className='w-full text-center'>
          <thead className='font-bold bg-pearl-bush'>
            <tr className='h-16'>
              <th>Booking ID</th>
              <th>Seat</th>
              <th>Visitor</th>
              <th>Booking Period</th>
              <th>Status</th>
              <th>Check In / Out</th>
            </tr>
          </thead>
          <tbody>
            {bookings
              .slice(
                (page - 1) * ROWS_PER_PAGE,
                (page - 1) * ROWS_PER_PAGE + ROWS_PER_PAGE,
              )
              .map((booking) => (
                <tr className='h-20 bg-white border-b hover:bg-iron whitespace-nowrap'>
                  <td className='px-2'>{booking.id}</td>
                  <td className='px-2'>{booking.seat}</td>
                  <td className='px-2'>
                    <div>{booking.visitor.name}</div>
                    <div>
                      <u>{booking.visitor.email}</u>
                    </div>
                  </td>
                  <td className='px-2'>
                    <div>
                      {booking.period.timeStart} {booking.date}
                    </div>
                    <div>
                      {booking.period.timeEnd} {booking.date}
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
                        {booking.checkedIn} {booking.date}
                      </div>
                    )}
                    {booking.status === 'Completed' && (
                      <div className='flex flex-row items-center justify-center gap-1'>
                        <span className='text-valentine-red'>
                          <HiOutlineLogout />
                        </span>
                        {booking.checkedOut} {booking.date}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
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
          onChange={handlePaginationChange}
        />
      </div>
    </div>
  );
}
