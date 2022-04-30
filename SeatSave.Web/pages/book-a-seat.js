import React, { useState } from 'react';
import moment from 'moment';

export default function BookASeat({ availableDays }) {
  const day = availableDays.map((availableDay) => new Date(availableDay));
  const [seatID, setSeatID] = useState();

  // Variables for Booking Details
  const [dateSelected, setDateSelected] = useState();
  const [periodSelected, setPeriodSelected] = useState();
  const [seatSelected, setSeatSelected] = useState();

  const [availablePeriods, setAvailablePeriods] = useState();
  const [availableSeats, setAvailableSeats] = useState();
  const [seatCurrent, setSeatCurrent] = useState();

  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };

  // ------------------ BOOKING FUNCTIONS ------------------

  async function getSelectedDate(selectedDate) {
    console.log(moment(selectedDate).format('YYYY-MM-DD'));
    const isoDate = moment(selectedDate).format('YYYY-MM-DD');
    const response = await fetch(
      `${process.env.API_URL}/Api/Schedule/${isoDate}/periods`,
    );

    if (response.status === 200) {
      const json = await response.json(); // change to response.json() later
      setDateSelected(selectedDate);
      setAvailablePeriods(json);
      setAvailableSeats(null);
      setPeriodSelected(null);
      setSeatSelected(null);
      console.log(availablePeriods);
    } else {
      console.log('Error!');
    }
  }

  async function getSelectedPeriod(selectedPeriod) {
    const isoDate = moment(dateSelected).format('YYYY-MM-DD');
    console.log(selectedPeriod);
    const response = await fetch(
      `${process.env.API_URL}/Api/Schedule/${isoDate}/${selectedPeriod}/Seat`,
    );

    if (response.status === 200) {
      const json = await response.json();
      setPeriodSelected(selectedPeriod);
      setSeatSelected(null);
      setAvailableSeats(json);
      console.log(availableSeats);
    } else {
      console.log('Error!');
    }
  }

  async function getSelectedSeat(selectedSeat) {
    console.log(selectedSeat);
    setSeatSelected(selectedSeat);
  }

  function viewSeatDetails(x) {
    toggleModal.call();
    setSeatID(x);
    setSeatCurrent(x);
    console.log(seatID);
  }

  async function submitBooking(e) {
    e.preventDefault();
    const requestData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        dateSelected,
        periodSelected,
        seatSelected,
      },
    };

    console.log(requestData);
    const response = await fetch(
      `${process.env.API_URL}/Api/Booking`,
      requestData,
    );

    if (response.status === 200) {
      console.log('Submitted!');
    }
  }

  if (typeof window !== 'undefined') {
    if (modal) {
      document.body.classList.add('active-modal');
    } else {
      document.body.classList.remove('active-modal');
    }
  }

  // ------------------ MAIN BODY ------------------

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
              <button
                key={availableDay}
                className='w-56 mx-5 rounded-md bg-pearl-bush hover:bg-rodeo-dust'
                onClick={() => getSelectedDate(availableDay)}
              >
                <h5 className='px-16 py-4'>
                  {moment(availableDay).format('MMMM D, YYYY')}
                </h5>
              </button>
            ))}
          </div>
        </div>

        {availablePeriods && (
          <div id='periodElement'>
            <div className='flex justify-center'>
              <h5 className='pt-20 font-bold'>Select your time</h5>
            </div>

            <div className='flex justify-center'>
              <div className='flex w-3/4 py-6 overflow-x-auto flex-nowrap'>
                {availablePeriods?.map((aPeriods) => (
                  <button
                    key={aPeriods.id}
                    className='mx-5 rounded-md bg-pearl-bush hover:bg-rodeo-dust w-30'
                    onClick={() => getSelectedPeriod(aPeriods.id)}
                  >
                    <h5 className='px-12 py-4'>
                      {moment('1111-11-11T' + aPeriods.timeStart).format(
                        'h:mm a',
                      )}
                      <br />
                      {moment('1111-11-11T' + aPeriods.timeEnd).format(
                        'h:mm a',
                      )}
                    </h5>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {availableSeats && (
          <div id='seatElement'>
            <div className='flex justify-center'>
              <h5 className='pt-20 font-bold'>Pick your seat</h5>
            </div>

            <div className='flex justify-center'>
              <div className='w-3/4 py-6 m-6 overflow-x-auto rounded-lg bg-pearl-bush sm:w-3/6 h-96'>
                <div className='grid grid-cols-1 sm:grid-cols-2'>
                  {availableSeats?.map(
                    (aSeat) =>
                      aSeat.active == 'true' && (
                        <button
                          key={aSeat.id}
                          className='m-5 rounded-md bg-bluish hover:bg-dusk-blue'
                          onClick={() => viewSeatDetails(aSeat)}
                        >
                          <h5 className='px-3 pt-3 text-white'>{aSeat.name}</h5>
                          <h5 className='pb-3 text-white'>{aSeat.id}</h5>
                        </button>
                      ),
                  )}
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
        )}
      </div>

      {modal && (
        <div className='modal'>
          <div className='overlay'>
            <div className='modal-content'>
              <h2 className='m-6 text-center'>Seat Details</h2>
              <p className='mx-6 mb-6'>
                name: {seatCurrent.name}
                <br />
                id: {seatCurrent.id}
              </p>

              <div className='flex justify-center inline'>
                <div>
                  <button
                    type='button'
                    className='mb-6 rounded-lg button'
                    onClick={() => getSelectedSeat(seatCurrent.id)}
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

  return {
    props: {
      availableDays,
    },
  };
}

BookASeat.page = 'BookASeat';
