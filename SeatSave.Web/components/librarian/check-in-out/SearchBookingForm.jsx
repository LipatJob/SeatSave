import React from 'react';

export default function SearchBookingForm({ onSubmit }) {
  return (
    <form className='flex flex-col gap-5 lg:flex-row' onSubmit={onSubmit}>
      <div className='basis-2/3'>
        <input
          id='bookingCode'
          name='bookingCode'
          type='text'
          placeholder='Enter Code'
          className='w-full'
        />
      </div>
      <div className='basis-1/3'>
        <button type='submit' className='w-full button'>
          Search
        </button>
      </div>
    </form>
  );
}
