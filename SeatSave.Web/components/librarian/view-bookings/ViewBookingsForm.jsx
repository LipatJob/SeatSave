import React from 'react';

export default function ViewBookingsForm({ onSubmit }) {
  return (
    <form
      onSubmit={onSubmit}
      className='relative flex flex-row items-end w-full gap-5 overflow-x-auto mt-14'
    >
      <div className='basis-1/4'>
        <label htmlFor='bookingId' className='flex flex-col'>
          Booking ID
          <input
            id='bookingId'
            name='bookingId'
            type='text'
            placeholder='Enter Booking ID'
          />
        </label>
      </div>
      <div className='basis-2/12'>
        <label htmlFor='status' className='flex flex-col'>
          Status
          <select id='status' name='status'>
            <option value='' defaultChecked>
              Any Status
            </option>
            <option>Pending</option>
            <option>Checked In</option>
            <option>Checked Out</option>
            <option>Cancelled</option>
          </select>
        </label>
      </div>
      <div className='basis-2/12'>
        <label htmlFor='bookingDate' className='flex flex-col'>
          Booking Date
          <input id='bookingDate' name='bookingDate' type='date' />
        </label>
      </div>
      <div className='basis-1/4'>
        <label htmlFor='visitorEmail' className='flex flex-col'>
          Visitor Email
          <input
            id='visitorEmail'
            name='visitorEmail'
            type='email'
            placeholder='Enter Visitor Email'
          />
        </label>
      </div>
      <div className='basis-2/12'>
        <button className='w-full button' type='submit'>
          Search
        </button>
      </div>
    </form>
  );
}
