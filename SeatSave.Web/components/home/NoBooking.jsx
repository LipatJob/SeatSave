import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function NoBooking() {
  return (
    <div className='grid grid-cols-2 page-container-small'>
      <div className='flex flex-col items-start gap-24'>
        <h1 className='mt-20 text-dusk-blue'>
          You have no booking at the moment...
        </h1>
        <Link href='/book-a-seat'>
          <button type='button' className='w-96 button'>
            BOOK A SEAT
          </button>
        </Link>
      </div>
      <div>
        <Image
          src='/NoBookingDecoration.svg'
          className='relative w-full h-auto'
          layout='responsive'
          objectFit='contain'
          width={500}
          height={500}
        />
      </div>
    </div>
  );
}
