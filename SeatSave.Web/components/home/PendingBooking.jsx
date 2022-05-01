import React from 'react';
import Image from 'next/image';
import BookingCode from './BookingInformation';

export default function PendingBooking() {
  return (
    <div>
      <div className='grid grid-cols-2 page-container-small'>
        <div className='flex flex-col items-start gap-8'>
          <h1 className='pr-2 text-dusk-blue'>Your booking is at 10:00am</h1>
          <BookingCode code='5155717' />
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
              <p className='font-bold'>Seat</p>{' '}
              <p>R01 - carrel desk (with outlet)</p>
            </div>
          </div>
          <button className='px-16 red-button' type='button'>
            CANCEL BOOKING
          </button>
        </div>
        <div className='relative'>
          <Image
            src='/NoBookingDecoration.svg'
            className='relative w-full h-auto'
            layout='responsive'
            objectFit='contain'
            width={800}
            height={800}
          />
        </div>
      </div>
    </div>
  );
}
