import React from 'react';
import Image from 'next/image';
import BookingDetails from './BookingDetails';

export default function CheckedIn() {
  return (
    <div>
      <div className='grid grid-cols-2 page-container-small'>
        <div className='flex flex-col items-start gap-8'>
          <h1 className='pr-2 text-dusk-blue'>
            Your booking is until 11:00 am
          </h1>
          <BookingDetails />
          <div className='flex flex-col items-center gap-4 mt-6'>
            <h4 className='text-center'>Are you leaving CLIR?</h4>
            <button className='w-full px-16 button' type='button'>
              CHECK OUT
            </button>
          </div>
        </div>
        <div className='relative'>
          <Image
            src='/CheckedInDecoration.svg'
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
