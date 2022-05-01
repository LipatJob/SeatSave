import Image from 'next/image';
import React from 'react';

export default function NoBooking() {
  return (
    <div>
      <div>You have no booking at the moment...</div>
      <div>
        <Image
          src='/NoBookingDecoration.svg'
          className='w-full h-auto'
          layout='responsive'
          objectFit='contain'
          width={500}
          height={500}
        />
      </div>
    </div>
  );
}
