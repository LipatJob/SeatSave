import React, { useState } from 'react';
import moment from 'moment';
import visitorAuthService from '../lib/visitorAuthService';
import Router from 'next/router';
import { useEffect } from 'react';
import { formatTime, formatDate } from '../lib/DateHelper';

export default function BookASeat({ availableDays }) {
  useEffect(() => {
    if (!visitorAuthService.isLoggedIn()) {
      Router.push('/login');
    }
  }, []);

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
      console.log(json);
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

    if (
      dateSelected != null &&
      periodSelected != null &&
      seatSelected != null
    ) {
      const userToken = visitorAuthService.getToken();
      console.log(userToken);
      const requestData = {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + userToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isoDate: moment(dateSelected).format('YYYY-MM-DD'),
          periodId: periodSelected,
          seatId: seatSelected,
        }),
      };
      console.log(requestData);

      const checkCurrentBooking = await fetch(
        `${process.env.API_URL}/Api/Booking/Current`,
      );
      const currentBook = await checkCurrentBooking.json();

      if (currentBook.status === 400) {
        console.log('Cannot create a book right now!');
        // Make a modal for this
      }

      const response = await fetch(
        `${process.env.API_URL}/Api/Booking`,
        requestData,
      );

      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        Router.push('/');
      }
    } else {
      console.log('There are missing data!');
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
                <h5 className='px-16 py-4'>{formatDate(availableDay)}</h5>
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
                      {formatTime(aPeriods.timeStart)}
                      <br />
                      {formatTime(aPeriods.timeEnd)}
                    </h5>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {availableSeats && (
          <div>
            <div className='flex justify-center'>
              <h5 className='pt-20 font-bold'>Pick your seat</h5>
            </div>

            <div className='flex justify-center'>
              <div className='w-3/4 py-6 m-6 overflow-x-auto rounded-lg bg-pearl-bush sm:w-3/6 h-96'>
                <div className='grid grid-cols-1 sm:grid-cols-2'>
                  {availableSeats.map((aSeat) => (
                    <button
                      key={aSeat.id}
                      className='m-5 rounded-md bg-bluish hover:bg-dusk-blue'
                      onClick={() => viewSeatDetails(aSeat)}
                    >
                      <h5 className='px-3 pt-3 text-white'>{aSeat.name}</h5>
                      <h5 className='pb-3 text-white'>{aSeat.id}</h5>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <br />
        <br />

        {seatSelected && (
          <div>
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
