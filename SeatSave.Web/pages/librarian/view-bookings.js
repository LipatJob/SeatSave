/* eslint-disable react/jsx-no-bind */
import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import ViewBookingsForm from '../../components/librarian/view-bookings/ViewBookingsForm';
import ViewBookingsTable from '../../components/librarian/view-bookings/ViewBookingsTable';
import 'react-datepicker/dist/react-datepicker.css';
import { formatTime } from '../../lib/DateHelper';
import ViewBookingDetails from '../../components/librarian/view-bookings/ViewBookingDetails';
import librarianAuthService from '../../lib/librarianAuthService';
import SeatMapLegends from '../../components/seat-map/SeatMapLegends';

const ClickSeatMap = dynamic(
  () => import('../../components/seat-map/ClickSeatMap'),
  {
    ssr: false,
  },
);

export default function ViewBookings({ allBookings, availableDays }) {
  useEffect(() => {
    if (!librarianAuthService.isLoggedIn()) {
      Router.push('/librarian/login');
    }
  }, []);

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

  const availableDates = availableDays.map(
    (availableDay) => new Date(availableDay),
  );

  const [selectedDate, setSelectedDate] = useState(null);
  const [availablePeriods, setAvailablePeriods] = useState();
  const [periodStartTime, setPeriodStartTime] = useState(0);
  const [seatSelected, setSeatSelected] = useState();
  const [seatCurrent, setSeatCurrent] = useState();
  const [showBookingInformation, setShowBookingInformation] = useState(false);

  const handleChange = (e) => {
    setPeriodStartTime(e.target.value);
  };

  async function updatePeriods(date) {
    const isoDate = moment(date).format('YYYY-MM-DD');
    const response = await fetch(
      `${process.env.API_URL}/Api/Schedule/${isoDate}/periods`,
    );
    if (response.status === 200) {
      const json = await response.json();
      setAvailablePeriods(json);
    } else {
      console.log('Error!');
    }
  }

  function getSelectedDate(date) {
    setSelectedDate(date);
    setPeriodStartTime(0);
    updatePeriods(date);
    setShowBookingInformation(false);
  }

  function viewSeatDetails(x) {
    setSeatCurrent(x);
    setShowBookingInformation(true);
  }

  return (
    <div className='page-container'>
      <Head>
        <title>View Bookings | SeatSave Librarian</title>
      </Head>

      <h1>View Bookings</h1>
      <h4 className='pt-8 pb-4'>Seat Map</h4>
      <form className=''>
        <div className='w-full sm:w-[250px] sm:inline-block sm:pr-4 pb-4 sm:pb-0'>
          <DatePicker
            selected={selectedDate}
            onChange={(dateViewBooking) => getSelectedDate(dateViewBooking)}
            className='flex flex-col w-full'
            includeDates={availableDates}
            placeholderText='Select Date'
          />
        </div>
        <div className='w-full sm:w-[250px] sm:inline-block'>
          <label htmlFor='period' className='flex flex-col'>
            <select
              id='period'
              name='period'
              value={periodStartTime}
              onChange={handleChange}
            >
              <option value={0} defaultChecked hidden>
                Select Period
              </option>
              {availablePeriods &&
                availablePeriods.map((aPeriods) => (
                  <option value={aPeriods.id}>
                    {formatTime(aPeriods.timeStart)} -{' '}
                    {formatTime(aPeriods.timeEnd)}
                  </option>
                ))}
            </select>
          </label>
        </div>
      </form>
      <div className='grid grid-cols-1 pt-8 sm:grid-cols-3 sm:gap-8'>
        <div className='sm:col-span-2'>
          <div className=' h-[300px] sm:h-[400px] w-full border-4 sm:border-8 rounded-3xl border-pearl-bush flex'>
            {periodStartTime !== 0 && (
              <ClickSeatMap
                date={selectedDate}
                period={periodStartTime}
                setSeatId={setSeatSelected}
                seatId={seatSelected}
                viewDetails={viewSeatDetails}
                closeDetails={() => setShowBookingInformation(false)}
                clickable
              />
            )}
            {periodStartTime === 0 && (
              <h2 className='m-auto font-light'> Select a Date and Period</h2>
            )}
          </div>
          {periodStartTime !== 0 && <SeatMapLegends />}
        </div>
        {showBookingInformation && (
          <ViewBookingDetails
            allBookings={allBookings}
            date={selectedDate}
            period={periodStartTime}
            seatCurrent={seatCurrent}
            onClose={() => setShowBookingInformation(false)}
          />
        )}
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
  const availableDaysData = await fetch(`${process.env.API_URL}/Api/Schedule`);
  const availableDays = await availableDaysData.json();
  return {
    props: {
      allBookings,
      availableDays,
    },
  };
}

ViewBookings.page = 'ViewBookings';
