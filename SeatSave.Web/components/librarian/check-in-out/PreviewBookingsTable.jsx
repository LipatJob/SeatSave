import React, { useState } from 'react';
import Pagination from '@mui/material/Pagination';
import datetimeFormatter from '../../../lib/datetimeFormatter';

export default function PreviewBookingsTable({ bookings, previewDetails }) {
  const [page, setPage] = useState(1);

  const ROWS_PER_PAGE = 5;

  function handlePaginationChange(e, value) {
    setPage(value);
  }

  return (
    <div className='mt-4'>
      <div className='relative overflow-x-auto'>
        <table className='w-full text-center'>
          <thead className='font-bold bg-pearl-bush'>
            <tr className='h-16 whitespace-nowrap'>
              <th className='px-2'>Code</th>
              <th className='px-2'>Seat</th>
              <th className='px-2'>Visitor</th>
              <th className='px-2'>Date & Time</th>
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
                  <tr
                    className='h-12 bg-white border-b hover:bg-iron whitespace-nowrap'
                    onClick={() => previewDetails(booking)}
                    key={booking.id}
                  >
                    <td className='px-2'>{booking.bookingCode}</td>
                    <td className='px-2'>{booking.seat.name}</td>
                    <td className='px-2'>
                      {booking.userModel.firstName} {booking.userModel.lastName}
                    </td>
                    <td className='px-2'>
                      {datetimeFormatter.convertDateFormat(booking.bookingDate)}{' '}
                      -{' '}
                      {datetimeFormatter.convertTimeFormat(
                        booking.period.timeStart,
                      )}
                    </td>
                  </tr>
                ))
            ) : (
              <td colSpan={6} className='py-8'>
                No Results Found.
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
