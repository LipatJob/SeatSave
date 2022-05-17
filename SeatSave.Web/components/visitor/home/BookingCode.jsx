import React from 'react';
import QRCode from 'react-qr-code';

export default function BookingCode({ code }) {
  return (
    <div className='flex flex-col max-w-full w-full items-center sm:max-w-[400px] px-8 py-5 bg-pearl-bush body-small'>
      <div className='h-[256px]  w-full  bg-white flex justify-center'>
        <QRCode value={code} size={210} className='mt-6' />
      </div>
      <p className='my-2 text-center mb-6'>
        Code
        <br />
        <span className='text-3xl font-bold'>{code}</span>
      </p>
      <p className='mb-3.5 font-light  '>
        Present this code to the librarian to confirm your booking.
      </p>
      <p className='font-light'>
        A <span className='font-bold'>proof of booking</span> has also been sent
        to your email address.
      </p>
    </div>
  );
}
