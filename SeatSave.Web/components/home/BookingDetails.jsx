import React from 'react';

export default function BookingDetails() {
  return (
    <div className='flex flex-col gap-3 body-small'>
      <h4>Booking Details</h4>
      <div>
        <p className='font-bold'>Date</p>
        <p>April 12, 2022</p>
      </div>
      <div>
        <p className='font-bold'>Time</p>
        <p>10:00 am to 11:00 am</p>
      </div>
      <div>
        <p className='font-bold'>Seat</p> <p>R01 - carrel desk (with outlet)</p>
      </div>
    </div>
  );
}
