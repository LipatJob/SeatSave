import React from 'react';

export default function ViewBookingsForm() {
  return (
    <form className='relative flex flex-row items-end w-full gap-5 overflow-x-auto mt-14'>
      <div className='basis-1/4'>
        <label htmlFor='bookingId' className='flex flex-col'>
          Booking ID
          <input id='bookingId' type='text' placeholder='Enter Booking ID' />
        </label>
      </div>
      <div className='basis-2/12'>
        <label htmlFor='status' className='flex flex-col'>
          Status
          <select id='status' placeholder='Select Status'>
            <option>Pending</option>
            <option>Checked In</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>
        </label>
      </div>
      <div className='basis-2/12'>
        <label htmlFor='bookingDate' className='flex flex-col'>
          Booking Date
          <input id='bookingDate' type='date' placeholder='Enter Date' />
        </label>
      </div>
      <div className='basis-1/4'>
        <label htmlFor='visitorEmail' className='flex flex-col'>
          Visitor Email
          <input
            id='visitorEmail'
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
