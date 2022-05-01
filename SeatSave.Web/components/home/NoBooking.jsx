import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function NoBooking() {
  return (
    <div className='grid grid-cols-1 gap-20 sm:grid-cols-2 page-container-small'>
      <div className='flex flex-col items-start gap-24'>
        <h1 className='mt-20 text-dusk-blue'>
          You have no booking at the moment...
        </h1>
        <Link href='/book-a-seat'>
          <button type='button' className='w-full sm:w-96 button'>
            BOOK A SEAT
          </button>
        </Link>
      </div>
      <div className='relative'>
        <Image
          src='/NoBookingDecoration.svg'
          className='w-full h-auto'
          layout='responsive'
          objectFit='contain'
          width={800}
          height={800}
        />
      </div>
    </div>
  );
}
