import React, { useState } from 'react';
import { HiOutlineLogin, HiOutlineLogout } from 'react-icons/hi';
import Pagination from '@mui/material/Pagination';
import { formatTime, formatDate } from '../../../lib/DateHelper';

export default function ViewBookingsTable({ bookings, onClick }) {
  const [page, setPage] = useState(1);

  const ROWS_PER_PAGE = 10;

  function handlePaginationChange(e, value) {
    setPage(value);
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
                        {booking.visitorModel.firstName}{' '}
                        {booking.visitorModel.lastName}
                      </div>
                      <div>
                        <u>{booking.visitorModel.email}</u>
                      </div>
                    </td>
                    <td className='px-2'>
                      <div>
                        {formatTime(booking.period.timeStart)} -{' '}
                        {formatDate(booking.bookingDate)}
                      </div>
                      <div>
                        {formatTime(booking.period.timeEnd)} -{' '}
                        {formatDate(booking.bookingDate)}
                      </div>
                    </td>
                    <td className='px-2'>{booking.status}</td>
                    <td className='px-2'>
                      {(booking.status === 'Checked Out' ||
                        booking.status === 'Checked In') && (
                        <div className='flex flex-row items-center justify-center gap-1'>
                          <span className='text-soft-blue'>
                            <HiOutlineLogin />
                          </span>
                          {formatTime(
                            booking.statusHistory.dateTimeCheckedIn.slice(
                              11,
                              16,
                            ),
                          )}{' '}
                          -{' '}
                          {formatDate(
                            booking.statusHistory.dateTimeCheckedIn.slice(
                              0,
                              10,
                            ),
                          )}
                        </div>
                      )}
                      {booking.status === 'Checked Out' && (
                        <div className='flex flex-row items-center justify-center gap-1'>
                          <span className='text-valentine-red'>
                            <HiOutlineLogout />
                          </span>
                          {formatTime(
                            booking.statusHistory.dateTimeCheckedOut.slice(
                              11,
                              16,
                            ),
                          )}{' '}
                          -{' '}
                          {formatDate(
                            booking.statusHistory.dateTimeCheckedOut.slice(
                              0,
                              10,
                            ),
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
