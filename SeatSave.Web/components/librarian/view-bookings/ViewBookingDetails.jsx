import React from 'react';
import { GrClose } from 'react-icons/gr';

export default function ViewBookingDetails(onClose) {
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
            <p>465465</p>
          </div>
          <div className='col-span-1'>
            <p className='font-bold'>Seat</p>
            <p>R01 - carrel desk</p>
          </div>
          <div className='col-span-1'>
            <p className='font-bold'>Visitor</p>
            <p>John Doe</p>
          </div>
          <div className='col-span-1'>
            <p className='font-bold'>Date</p>
            <p>May 2, 2022</p>
          </div>
          <div className='col-span-1 pb-8'>
            <p className='font-bold'>Time</p>
            <p>10:00 AM to 11:00 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
}
