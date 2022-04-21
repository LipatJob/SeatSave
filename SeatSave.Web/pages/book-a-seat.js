import React from 'react';

export default function BookASeat() {
  function submitBooking(e) {
    e.preventDefault();
    console.log('Submitted!');
  }

  return (
    <div className='min-h-screen min-w-screen flex items-center justify-center'>
      <div className='w-3/4 min-h-screen m-20 rounded-md'>
        <h1 className='text-center lg:text-center md:text-center xl:text-left xl:pl-48 pt-10 font-bold'>
          Book a Seat
        </h1>
        <h4 className='text-center lg:text-center md:text-center xl:text-left xl:pl-48 pt-5 pb-10'>
          Center for Learning and Information Resources - Einstein Bldg.
        </h4>

        <div className='flex justify-center'>
          <h5 className='font-bold pt-20'>Select your date</h5>
        </div>

        <div className='flex justify-center'>
          <div className='py-6 w-3/4 flex flex-nowrap overflow-x-auto'>
            <button className='bg-pearl-bush rounded-md w-56 mx-5'>
              <h5 className='py-4 px-16'>April 21, 2022</h5>
            </button>
            <button className='bg-pearl-bush rounded-md w-56 mx-5'>
              <h5 className='py-4 px-16'>April 21, 2022</h5>
            </button>
            <button className='bg-pearl-bush rounded-md w-56 mx-5'>
              <h5 className='py-4 px-16'>April 21, 2022</h5>
            </button>
            <button className='bg-pearl-bush rounded-md w-56 mx-5'>
              <h5 className='py-4 px-16'>April 21, 2022</h5>
            </button>
            <button className='bg-pearl-bush rounded-md w-56 mx-5'>
              <h5 className='py-4 px-16'>April 21, 2022</h5>
            </button>
            <button className='bg-pearl-bush rounded-md w-56 mx-5'>
              <h5 className='py-4 px-16'>April 21, 2022</h5>
            </button>
            <button className='bg-pearl-bush rounded-md w-56 mx-5'>
              <h5 className='py-4 px-16'>April 21, 2022</h5>
            </button>
            <button className='bg-pearl-bush rounded-md w-56 mx-5'>
              <h5 className='py-4 px-16'>April 21, 2022</h5>
            </button>
            <button className='bg-pearl-bush rounded-md w-56 mx-5'>
              <h5 className='py-4 px-16'>April 21, 2022</h5>
            </button>
            <button className='bg-pearl-bush rounded-md w-56 mx-5'>
              <h5 className='py-4 px-16'>April 21, 2022</h5>
            </button>
            <button className='bg-pearl-bush rounded-md w-56 mx-5'>
              <h5 className='py-4 px-16'>April 21, 2022</h5>
            </button>
          </div>
        </div>

        <div className='flex justify-center'>
          <h5 className='font-bold pt-20'>Select your time</h5>
        </div>

        <div className='flex justify-center'>
          <div className='py-6 w-3/4 flex flex-nowrap overflow-x-auto'>
            <button className='bg-pearl-bush rounded-md w-30 mx-5'>
              <h5 className='px-12 py-4'>
                3:00
                <br />
                4:00
              </h5>
            </button>

            <button className='bg-pearl-bush rounded-md w-30 mx-5'>
              <h5 className='px-12 py-4'>
                3:00
                <br />
                4:00
              </h5>
            </button>

            <button className='bg-pearl-bush rounded-md w-30 mx-5'>
              <h5 className='px-12 py-4'>
                3:00
                <br />
                4:00
              </h5>
            </button>

            <button className='bg-pearl-bush rounded-md w-30 mx-5'>
              <h5 className='px-12 py-4'>
                3:00
                <br />
                4:00
              </h5>
            </button>

            <button className='bg-pearl-bush rounded-md w-30 mx-5'>
              <h5 className='px-12 py-4'>
                3:00
                <br />
                4:00
              </h5>
            </button>

            <button className='bg-pearl-bush rounded-md w-30 mx-5'>
              <h5 className='px-12 py-4'>
                3:00
                <br />
                4:00
              </h5>
            </button>

            <button className='bg-pearl-bush rounded-md w-30 mx-5'>
              <h5 className='px-12 py-4'>
                3:00
                <br />
                4:00
              </h5>
            </button>

            <button className='bg-pearl-bush rounded-md w-30 mx-5'>
              <h5 className='px-12 py-4'>
                3:00
                <br />
                4:00
              </h5>
            </button>
          </div>
        </div>

        <div className='flex justify-center'>
          <h5 className='font-bold pt-20'>Pick your seat</h5>
        </div>

        <div className='flex justify-center'>
          <div className='bg-pearl-bush py-6 w-3/4 sm:w-3/6 h-96 m-6 rounded-lg overflow-x-auto'>
            <div className='grid grid-cols-1 sm:grid-cols-2'>
              <button className='bg-dusk-blue rounded-md m-5'>
                <h5 className='text-white px-3 pt-3'>Einstein - 1</h5>
                <h5 className='text-white pb-3'>E1</h5>
              </button>

              <button className='bg-dusk-blue rounded-md m-5'>
                <h5 className='text-white px-3 pt-3'>Einstein - 1</h5>
                <h5 className='text-white pb-3'>E1</h5>
              </button>

              <button className='bg-dusk-blue rounded-md m-5'>
                <h5 className='text-white px-3 pt-3'>Einstein - 1</h5>
                <h5 className='text-white pb-3'>E1</h5>
              </button>

              <button className='bg-dusk-blue rounded-md m-5'>
                <h5 className='text-white px-3 pt-3'>Einstein - 1</h5>
                <h5 className='text-white pb-3'>E1</h5>
              </button>

              <button className='bg-dusk-blue rounded-md m-5'>
                <h5 className='text-white px-3 pt-3'>Einstein - 1</h5>
                <h5 className='text-white pb-3'>E1</h5>
              </button>

              <button className='bg-dusk-blue rounded-md m-5'>
                <h5 className='text-white px-3 pt-3'>Einstein - 1</h5>
                <h5 className='text-white pb-3'>E1</h5>
              </button>

              <button className='bg-dusk-blue rounded-md m-5'>
                <h5 className='text-white px-3 pt-3'>Einstein - 1</h5>
                <h5 className='text-white pb-3'>E1</h5>
              </button>

              <button className='bg-dusk-blue rounded-md m-5'>
                <h5 className='text-white px-3 pt-3'>Einstein - 1</h5>
                <h5 className='text-white pb-3'>E1</h5>
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
            <h5 className='font-bold text-white p-4'>Book your seat!</h5>
          </button>
        </div>
      </div>
    </div>
  );
}
