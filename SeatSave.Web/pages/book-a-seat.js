import React, { useState } from 'react';
import moment from 'moment';

export default function BookASeat({ availableDays }, { availableSeats }) {
  function submitBooking(e) {
    e.preventDefault();
    console.log('Submitted!');
  }
  console.log(availableSeats);
  const day = availableDays.map((availableDay) => new Date(availableDay));

  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };

  if (typeof window !== 'undefined') {
    if (modal) {
      document.body.classList.add('active-modal')
    }
    else {
      document.body.classList.remove('active-modal')
    }
  }

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
              {availableSeats?.map((aSeat) => (
                <button
                className='m-5 rounded-md bg-bluish hover:bg-dusk-blue'
                onClick={toggleModal}
                >
                  <h5 className='px-3 pt-3 text-white'>{aSeat.id}</h5>
                  <h5 className='pb-3 text-white'>{aSeat.name}</h5>
                </button>
              ))}
              <button
                className='m-5 rounded-md bg-bluish hover:bg-dusk-blue'
                onClick={toggleModal}
              >
                <h5 className='px-3 pt-3 text-white'>Einstein - 1</h5>
                <h5 className='pb-3 text-white'>E1</h5>
              </button>

              <button
                className='m-5 rounded-md bg-bluish hover:bg-dusk-blue'
                onClick={toggleModal}
              >
                <h5 className='px-3 pt-3 text-white'>Einstein - 1</h5>
                <h5 className='pb-3 text-white'>E1</h5>
              </button>

              <button
                className='m-5 rounded-md bg-bluish hover:bg-dusk-blue'
                onClick={toggleModal}
              >
                <h5 className='px-3 pt-3 text-white'>Einstein - 1</h5>
                <h5 className='pb-3 text-white'>E1</h5>
              </button>

              <button
                className='m-5 rounded-md bg-bluish hover:bg-dusk-blue'
                onClick={toggleModal}
              >
                <h5 className='px-3 pt-3 text-white'>Einstein - 1</h5>
                <h5 className='pb-3 text-white'>E1</h5>
              </button>

              <button
                className='m-5 rounded-md bg-bluish hover:bg-dusk-blue'
                onClick={toggleModal}
              >
                <h5 className='px-3 pt-3 text-white'>Einstein - 1</h5>
                <h5 className='pb-3 text-white'>E1</h5>
              </button>

              <button
                className='m-5 rounded-md bg-bluish hover:bg-dusk-blue'
                onClick={toggleModal}
              >
                <h5 className='px-3 pt-3 text-white'>Einstein - 1</h5>
                <h5 className='pb-3 text-white'>E1</h5>
              </button>

              <button
                className='m-5 rounded-md bg-bluish hover:bg-dusk-blue'
                onClick={toggleModal}
              >
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
            className='rounded-lg button'
          >
            <h5 className='font-bold text-white'>Book your seat!</h5>
          </button>
        </div>
      </div>

      {modal && (
        <div className='modal'>
          <div className='overlay'>
            <div className='modal-content'>
              <h2 className='m-6 text-center'>Seat Details</h2>
              <p className='mx-6 mb-6'>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum."
              </p>
              <div className='flex justify-center inline'>
                <div>
                  <button
                    type='button'
                    className='mb-6 rounded-lg button'
                  >
                    <h6 className='font-medium text-white'>Select</h6>
                  </button>
                </div>

                <div>
                  <button
                    type='button'
                    onClick={toggleModal}
                    className='px-4 ml-10 rounded-lg red-button'
                  >
                    <h6 className='font-medium text-white'>X</h6>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps() {
  const availableDaysData = await fetch(`${process.env.API_URL}/Api/Schedule`);
  const availableDays = await availableDaysData.json();

  const availableSeatsData = await fetch(`${process.env.API_URL}/Api/Seats`);
  const availableSeats = await availableSeatsData.json();

  console.log(availableSeats);
  
  return {
    props: {
      availableDays,
      availableSeats
    },
  };
}

BookASeat.page = 'BookASeat';
