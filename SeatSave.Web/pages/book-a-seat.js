import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import DatePicker from 'react-datepicker';
import visitorAuthService from '../lib/visitorAuthService';
// import BookingDate from '../components/visitor/book-a-seat/BookingDate';
import BookingTime from '../components/visitor/book-a-seat/BookingTime';
import BookingSeat from '../components/visitor/book-a-seat/BookingSeat';
import BookingSeatModal from '../components/visitor/book-a-seat/BookingSeatModal';
import 'react-datepicker/dist/react-datepicker.css';
import { toIsoDate } from '../lib/DateHelper';

const ClickSeatMap = dynamic(
  () => import('../components/seat-map/ClickSeatMap'),
  {
    ssr: false,
  },
);

export default function BookASeat({ availableDays }) {
  useEffect(() => {
    if (!visitorAuthService.isLoggedIn()) {
      Router.push('/login');
    }
  }, []);

  // const day = availableDays.map((availableDay) => new Date(availableDay));
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
          isoDate: toIsoDate(dateSelected),
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

  const [selectedDate, setSelectedDate] = useState(null);
  const availableDates = availableDays.map(
    (availableDay) => new Date(availableDay),
  );
  // ------------------ MAIN BODY ------------------

  return (
    <div className='page-container-small'>
      <h1 className='mb-4 font-bold'>Book a Seat</h1>
      <h4>Center for Learning and Information Resources - Einstein Bldg.</h4>

      <div className='grid grid-cols-1 pt-8 sm:grid-cols-3 sm:gap-8'>
        <div className=' sm:col-span-1'>
          <h5 className='mb-4 font-bold'>Select your date</h5>
          <div className='h-[300px] pt-4 '>
            <DatePicker
              selected={selectedDate}
              onChange={(dateViewBooking) => getSelectedDate(dateViewBooking)}
              className='flex flex-col'
              includeDates={availableDates}
              inline
            />
          </div>
          <h5 className='font-bold'>Select your time</h5>
          <div className='h-[150px] pt-8'>
            {availablePeriods && (
              <BookingTime
                availablePeriods={availablePeriods}
                getSelectedPeriod={getSelectedPeriod}
              />
            )}
          </div>
        </div>
        <div className='sm:col-span-2'>
          <h5 className='pb-4 font-bold'>Pick your seat</h5>
          {availableSeats && (
            <>
              <div className='w-full text-center text-red-500 border-8 rounded-3xl border-pearl-bush'>
                <ClickSeatMap
                  date={dateSelected}
                  period={periodSelected}
                  availableSeats={availableSeats}
                  setSeatId={setSeatSelected}
                  seatId={seatSelected}
                />

                {/* {availableSeats && (
              <BookingSeat
                availableSeats={availableSeats}
                viewSeatDetails={viewSeatDetails}
              />
            )} */}
              </div>
              <div className='hidden w-full mt-4 sm:block'>
                <div className='grid grid-cols-3 gap-4 text-center'>
                  <div>
                    <div className='inline-block w-6 h-6  bg-[#37722B]' />
                    <div className='inline-block pl-2'> Available</div>
                  </div>
                  <div>
                    <div className='inline-block w-6 h-6 bg-[#CD201F]' />
                    <div className='inline-block pl-2'> Occupied</div>
                  </div>
                  <div>
                    <div className='inline-block w-6 h-6 bg-dawn' />
                    <div className='inline-block pl-2'> Seat Unavailable</div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {seatSelected && (
        <div className='mt-4 mb-8'>
          <button
            onClick={submitBooking}
            className='w-full sm:max-w-[304px] button float-right'
            type='button'
          >
            BOOK SEAT
          </button>
        </div>
      )}
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
