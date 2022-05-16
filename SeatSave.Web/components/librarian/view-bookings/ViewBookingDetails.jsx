import React from 'react';
import { GrClose } from 'react-icons/gr';
import moment from 'moment';

export default function ViewBookingDetails({
  allBookings,
  date,
  period,
  seatCurrent,
  onClose,
}) {
  const isoDate = moment(date).format('YYYY-MM-DD');

  const result = allBookings.find(
    ({ seatId, bookingDate, periodId }) =>
      seatId === seatCurrent.id &&
      bookingDate === isoDate &&
      periodId === Number(period),
  );

  const dateText = moment(result.bookingDate).format('LL');
  const startTime = moment(`1111-11-11T${result.period.timeStart}`).format(
    'h:mm a',
  );
  const endTime = moment(`1111-11-11T${result.period.timeEnd}`).format(
    'h:mm a',
  );

  return (
    <div className='hidden sm:col-span-1 sm:block'>
      <div className='w-full h-full p-4 bg-pearl-bush'>
        <span className='float-right'>
          <button type='button' onClick={onClose}>
            <GrClose />
          </button>
        </span>
        <div className='pt-8'>
          <h4> Booking Details</h4>
        </div>

        <div className='grid grid-cols-1 gap-3 mt-4 sm:flex sm:flex-col'>
          <div className='col-span-1'>
            <p className='font-bold'>Code</p>
            <p> {result.bookingCode} </p>
          </div>
          <div className='col-span-1'>
            <p className='font-bold'>Seat</p>
            <p>
              {result.seat.id} - {result.seat.type}
            </p>
          </div>
          <div className='col-span-1'>
            <p className='font-bold'>Visitor</p>
            <p>
              {result.visitorModel.firstName} {result.visitorModel.lastName}
            </p>
          </div>
          <div className='col-span-1'>
            <p className='font-bold'>Date</p>
            <p>{dateText}</p>
          </div>
          <div className='col-span-1 pb-8'>
            <p className='font-bold'>Time</p>
            <p>
              {startTime} to {endTime}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
