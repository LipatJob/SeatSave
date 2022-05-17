/* eslint-disable react/jsx-no-bind */
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import DatePicker from 'react-datepicker';
import visitorAuthService from '../lib/visitorAuthService';
import BookingTime from '../components/visitor/book-a-seat/BookingTime';
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

  // Variables for Booking Details
  const [dateSelected, setDateSelected] = useState();
  const [periodSelected, setPeriodSelected] = useState();
  const [seatSelected, setSeatSelected] = useState();

  const [availablePeriods, setAvailablePeriods] = useState();
  const [availableSeats, setAvailableSeats] = useState();
  const [seatCurrent, setSeatCurrent] = useState();
  const [selectedDate, setSelectedDate] = useState(null);

  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };

  const availableDates = availableDays.map(
    (availableDay) => new Date(availableDay),
  );
  // ------------------ BOOKING FUNCTIONS ------------------

  async function getSelectedDate(date) {
    console.log(moment(date).format('YYYY-MM-DD'));
    const isoDate = moment(date).format('YYYY-MM-DD');
    const response = await fetch(
      `${process.env.API_URL}/Api/Schedule/${isoDate}/periods`,
    );

    if (response.status === 200) {
      const json = await response.json();
      setDateSelected(date);
      setSelectedDate(date);
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

  function viewSeatDetails(x) {
    toggleModal.call();
    setSeatCurrent(x);
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

  const [isDesktop, setDesktop] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 800) {
      setDesktop(true);
    } else {
      setDesktop(false);
    }

    const updateMedia = () => {
      if (window.innerWidth > 800) {
        setDesktop(true);
      } else {
        setDesktop(false);
      }
    };
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  }, []);
  // ------------------ MAIN BODY ------------------

  return (
    <div className='page-container-small'>
      <h1 className='mb-4 font-bold'>Book a Seat</h1>
      <h4>Center for Learning and Information Resources - Einstein Bldg.</h4>

      <div className='grid grid-cols-1 pt-8 sm:grid-cols-3 sm:gap-8'>
        <div className=' sm:col-span-1'>
          <h5 className='mb-4 font-bold'>Select your date</h5>
          <div className={isDesktop ? 'h-[300px] pt-4' : 'pt-4'}>
            <DatePicker
              selected={selectedDate}
              onChange={(dateViewBooking) => getSelectedDate(dateViewBooking)}
              includeDates={availableDates}
              placeholderText='Select Date'
              inline={isDesktop}
              className={isDesktop ? '' : 'flex flex-col w-full'}
            />
          </div>
          <h5 className='mt-4 font-bold'>Select your time</h5>
          <div className='h-[150px] pt-4'>
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
                  setSeatId={setSeatSelected}
                  seatId={seatSelected}
                  viewDetails={viewSeatDetails}
                />
              </div>
              <div className='w-full mt-4'>
                <div className='grid grid-cols-3 gap-4 text-center'>
                  <div>
                    <div className='inline-block w-6 h-6  bg-[#37722B]' />
                    <div className='inline-block pl-2'> Available</div>
                  </div>
                  <div className='col-span-2 sm:col-span-1'>
                    <div className='inline-block w-6 h-6 bg-[#EA555A]' />
                    <div className='inline-block pl-2'> Occupied</div>
                  </div>
                  <div className='col-span-3 sm:col-span-1'>
                    <div className='inline-block w-6 h-6 bg-dawn' />
                    <div className='inline-block pl-2'> Seat Unavailable</div>
                  </div>
                </div>
              </div>
            </>
          )}
          {seatSelected && (
            <div className='grid w-full mt-8 mb-8 place-items-center'>
              <button
                onClick={submitBooking}
                className='w-full sm:max-w-[400px] button '
                type='button'
              >
                BOOK SEAT
              </button>
            </div>
          )}
        </div>
      </div>

      {modal && (
        <BookingSeatModal seatCurrent={seatCurrent} toggleModal={toggleModal} />
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
