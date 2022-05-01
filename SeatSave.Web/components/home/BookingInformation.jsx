import React from 'react';

export default function BookingCode({ code }) {
  return (
    <div className='flex flex-col max-w-[400px] px-8 py-5 bg-pearl-bush body-small'>
      <p className='mb-2'>
        Code <span className='text-3xl font-bold'>{code}</span>
      </p>
      <p className='mb-3.5 font-light'>
        Present this code to the librarian to confirm your booking.
      </p>
      <p className='font-light'>
        A <span className='font-bold'>proof of booking</span> has also been sent
        to your email address.
      </p>
    </div>
  );
}
