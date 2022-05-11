/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import { GrClose } from 'react-icons/gr';
import ViewBookingsForm from '../../components/librarian/view-bookings/ViewBookingsForm';
import ViewBookingsTable from '../../components/librarian/view-bookings/ViewBookingsTable';

export default function ViewBookings({ allBookings }) {
  const [displayBookings, setDisplayBookings] = useState(allBookings);

  async function handleSearchBookings(e) {
    e.preventDefault();
    const code = e.target.bookingCode.value;
    const status = e.target.status.value;
    const date = e.target.bookingDate.value;
    const email = e.target.visitorEmail.value;

    const res = await fetch(
      `${process.env.API_URL}/Api/Booking/Search?code=${code}&status=${status}&date=${date}&email=${email}`,
    );
    const searchResults = await res.json();

    setDisplayBookings(searchResults);
  }

  function handleViewAll() {
    setDisplayBookings(allBookings);
  }

  return (
    <div className='page-container'>
      <h1>View Bookings</h1>
      <h4 className='pt-8 pb-4'>Seat Map</h4>
      <form className=''>
        <div className='w-full sm:w-[250px] sm:inline-block sm:pr-4 pb-4 sm:pb-0'>
          <label htmlFor='bookingDate' className='flex flex-col'>
            <input
              id='bookingDate'
              name='bookingDate'
              type='date'
              placeholder='Select Date'
            />
          </label>
        </div>
        <div className='w-full sm:w-[250px] sm:inline-block'>
          <label htmlFor='status' className='flex flex-col'>
            <select id='status' name='status'>
              <option value='' defaultChecked hidden>
                Select Period
              </option>
              <option>A</option>
              <option>B</option>
              <option>C</option>
              <option>D</option>
            </select>
          </label>
        </div>
      </form>
      <div className='grid grid-cols-1 pt-8 sm:grid-cols-3 sm:gap-8'>
        <div className='sm:col-span-2'>
          <div className='border-0  sm:border-8 rounded-3xl border-pearl-bush w-full h-[370px] text-center text-red-500'>
            SEAT MAP
          </div>
          <div className='w-full mt-4 '>
            <div className='grid grid-cols-3 gap-4 text-center'>
              <div>
                <div className='inline-block w-6 h-6  bg-[#37722B]' />
                <div className='inline-block pl-2'> Available</div>
              </div>
              <div className='col-span-2 sm:col-span-1'>
                <div className='inline-block w-6 h-6 bg-[#CD201F]' />
                <div className='inline-block pl-2'> Occupied</div>
              </div>
              <div className='col-span-3 sm:col-span-1'>
                <div className='inline-block w-6 h-6 bg-dawn' />
                <div className='inline-block pl-2'> Seat Unavailable</div>
              </div>
            </div>
          </div>
        </div>
        <div className='hidden sm:col-span-1 sm:block'>
          <div className='w-full h-full p-4 bg-pearl-bush'>
            <span className='float-right'>
              <button type='button' className=''>
                <GrClose className='' />
              </button>
            </span>
            <div className='pt-8'>
              <h4> Booking Details</h4>
            </div>

            <div className='grid grid-cols-1 gap-3 mt-4 sm:flex sm:flex-col'>
              <div className='col-span-1'>
                <p className='font-bold'>Code</p>
                <p>465465</p>
              </div>
              <div className='col-span-1'>
                <p className='font-bold'>Seat</p>
                <p>R01 - carrel desk</p>
              </div>
              <div className='col-span-1'>
                <p className='font-bold'>Visitor</p>
                <p>John Doe</p>
              </div>
              <div className='col-span-1'>
                <p className='font-bold'>Date</p>
                <p>May 2, 2022</p>
              </div>
              <div className='col-span-1 pb-8'>
                <p className='font-bold'>Time</p>
                <p>10:00 AM to 11:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h4 className='mt-16'>All Bookings</h4>
      <ViewBookingsForm onSubmit={handleSearchBookings} />
      <ViewBookingsTable bookings={displayBookings} onClick={handleViewAll} />
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.API_URL}/Api/Booking`);
  const allBookings = await res.json();

  return {
    props: {
      allBookings,
    },
  };
}

ViewBookings.page = 'ViewBookings';
