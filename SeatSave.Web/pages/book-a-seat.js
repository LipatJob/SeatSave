import React, { useState } from 'react';
import moment from 'moment';

export default function BookASeat({ availableDays }) {
  function submitBooking(e) {
    e.preventDefault();
    console.log('Submitted!');
  }

  const day = availableDays.map((availableDay) => new Date(availableDay));
  return (
    <div className='flex items-center justify-center min-h-screen min-w-screen'>
      <div className='w-3/4 min-h-screen m-20 rounded-md'>
        <h1 className='pt-10 font-bold text-center lg:text-center md:text-center xl:text-left xl:pl-48'>
          Book a Seat
        </h1>
        <h4 className='pt-5 pb-10 text-center lg:text-center md:text-center xl:text-left xl:pl-48'>
          Center for Learning and Information Resources - Einstein Bldg.
        </h4>

        <div className='flex justify-center'>
          <h5 className='pt-20 font-bold'>Select your date</h5>
        </div>

        <div className='flex justify-center'>
          <div className='flex w-3/4 py-6 overflow-x-auto flex-nowrap'>
            {day.map((availableDay) => (
              <button className='w-56 mx-5 rounded-md bg-pearl-bush '>
                <h5 className='px-16 py-4'>
                  {moment(availableDay).format('MMMM D, YYYY')}
                </h5>
              </button>
            ))}
          </div>
        </div>

        <div className='flex justify-center'>
          <h5 className='pt-20 font-bold'>Select your time</h5>
        </div>

        <div className='flex justify-center'>
          <div className='flex w-3/4 py-6 overflow-x-auto flex-nowrap'>
            <button className='mx-5 rounded-md bg-pearl-bush w-30'>
              <h5 className='px-12 py-4'>
                3:00
                <br />
                4:00
              </h5>
            </button>

            <button className='mx-5 rounded-md bg-pearl-bush w-30'>
              <h5 className='px-12 py-4'>
                3:00
                <br />
                4:00
              </h5>
            </button>

            <button className='mx-5 rounded-md bg-pearl-bush w-30'>
              <h5 className='px-12 py-4'>
                3:00
                <br />
                4:00
              </h5>
            </button>

            <button className='mx-5 rounded-md bg-pearl-bush w-30'>
              <h5 className='px-12 py-4'>
                3:00
                <br />
                4:00
              </h5>
            </button>

            <button className='mx-5 rounded-md bg-pearl-bush w-30'>
              <h5 className='px-12 py-4'>
                3:00
                <br />
                4:00
              </h5>
            </button>

            <button className='mx-5 rounded-md bg-pearl-bush w-30'>
              <h5 className='px-12 py-4'>
                3:00
                <br />
                4:00
              </h5>
            </button>

            <button className='mx-5 rounded-md bg-pearl-bush w-30'>
              <h5 className='px-12 py-4'>
                3:00
                <br />
                4:00
              </h5>
            </button>

            <button className='mx-5 rounded-md bg-pearl-bush w-30'>
              <h5 className='px-12 py-4'>
                3:00
                <br />
                4:00
              </h5>
            </button>
          </div>
        </div>

        <div className='flex justify-center'>
          <h5 className='pt-20 font-bold'>Pick your seat</h5>
        </div>

        <div className='flex justify-center'>
          <div className='w-3/4 py-6 m-6 overflow-x-auto rounded-lg bg-pearl-bush sm:w-3/6 h-96'>
            <div className='grid grid-cols-1 sm:grid-cols-2'>
              <button
                className='m-5 rounded-md bg-dusk-blue'
                onClick={() => setShowModal(true)}
              >
                <h5 className='px-3 pt-3 text-white'>Einstein - 1</h5>
                <h5 className='pb-3 text-white'>E1</h5>
              </button>

              <button className='m-5 rounded-md bg-dusk-blue'>
                <h5 className='px-3 pt-3 text-white'>Einstein - 1</h5>
                <h5 className='pb-3 text-white'>E1</h5>
              </button>

              <button className='m-5 rounded-md bg-dusk-blue'>
                <h5 className='px-3 pt-3 text-white'>Einstein - 1</h5>
                <h5 className='pb-3 text-white'>E1</h5>
              </button>

              <button className='m-5 rounded-md bg-dusk-blue'>
                <h5 className='px-3 pt-3 text-white'>Einstein - 1</h5>
                <h5 className='pb-3 text-white'>E1</h5>
              </button>

              <button className='m-5 rounded-md bg-dusk-blue'>
                <h5 className='px-3 pt-3 text-white'>Einstein - 1</h5>
                <h5 className='pb-3 text-white'>E1</h5>
              </button>

              <button className='m-5 rounded-md bg-dusk-blue'>
                <h5 className='px-3 pt-3 text-white'>Einstein - 1</h5>
                <h5 className='pb-3 text-white'>E1</h5>
              </button>

              <button className='m-5 rounded-md bg-dusk-blue'>
                <h5 className='px-3 pt-3 text-white'>Einstein - 1</h5>
                <h5 className='pb-3 text-white'>E1</h5>
              </button>

              <button className='m-5 rounded-md bg-dusk-blue'>
                <h5 className='px-3 pt-3 text-white'>Einstein - 1</h5>
                <h5 className='pb-3 text-white'>E1</h5>
              </button>
            </div>
          </div>
        </div>

        <br />
        <br />

        <div className='flex justify-center'>
          <button
            onClick={submitBooking}
            type='button'
            className='px-4 py-2 text-xl font-bold text-white uppercase rounded-lg bg-bluish hover:bg-dusk-blue'
          >
            <h5 className='p-4 font-bold text-white'>Book your seat!</h5>
          </button>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.API_URL}/Api/Schedule`);
  const availableDays = await res.json();

  return {
    props: {
      availableDays,
    },
  };
}

BookASeat.page = 'BookASeat';
