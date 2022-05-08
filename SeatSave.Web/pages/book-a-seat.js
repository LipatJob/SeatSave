import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Router from 'next/router';
import visitorAuthService from '../lib/visitorAuthService';

import BookingHeader from '../components/visitor/book-a-seat/BookingHeader';
import BookingDate from '../components/visitor/book-a-seat/BookingDate';
import BookingTime from '../components/visitor/book-a-seat/BookingTime';
import BookingSeat from '../components/visitor/book-a-seat/BookingSeat';
import BookingSeatModal from '../components/visitor/book-a-seat/BookingSeatModal';

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
      const json = await response.json();
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
      const authToken = visitorAuthService.getAuthToken();
      console.log(authToken);
      const requestData = {
        method: 'POST',
        headers: {
          Authorization: authToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isoDate: moment(dateSelected).format('YYYY-MM-DD'),
          periodId: periodSelected,
          seatId: seatSelected,
        }),
      };

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
        <BookingHeader />

        <BookingDate day={day} getSelectedDate={getSelectedDate} />

        {availablePeriods && (
          <BookingTime
            availablePeriods={availablePeriods}
            getSelectedPeriod={getSelectedPeriod}
          />
        )}

        {availableSeats && (
          <BookingSeat
            availableSeats={availableSeats}
            viewSeatDetails={viewSeatDetails}
          />
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
        <BookingSeatModal
          seatCurrent={seatCurrent}
          getSelectedSeat={getSelectedSeat}
          toggleModal={toggleModal}
        />
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
