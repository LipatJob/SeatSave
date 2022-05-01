import React from 'react';
import Image from 'next/image';
import BookingCode from './BookingCode';
import BookingDetails from './BookingDetails';

export default function PendingBooking() {
  return (
    <div>
      <div className='grid grid-cols-2 page-container-small'>
        <div className='flex flex-col items-start gap-8'>
          <h1 className='pr-2 text-dusk-blue'>Your booking is at 10:00am</h1>
          <BookingCode code='5155717' />
          <BookingDetails />
          <button className='px-16 red-button' type='button'>
            CANCEL BOOKING
          </button>
        </div>
        <div className='relative mt-20'>
          <Image
            src='/PendingDecoration.svg'
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
