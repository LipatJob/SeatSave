/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import Image from 'next/image';
import SearchBookingForm from '../../components/librarian/check-in-out/SearchBookingForm';
import SearchResultsSection from '../../components/librarian/check-in-out/SearchResultsSection';
import PresentBookingsSection from '../../components/librarian/check-in-out/PresentBookingsSection';
import BookingDetailsSection from '../../components/librarian/check-in-out/BookingDetailsSection';

export default function CheckInOut({ presentPeriod, presentBookings }) {
  const [searchResults, setSearchResults] = useState(presentBookings);

  const [showResults, setShowResults] = useState(false);

  const [showDetails, setShowDetails] = useState(false);

  const [bookingToDisplay, setBookingToDisplay] = useState([]);

  function handleSearchBooking(e) {
    e.preventDefault();
    setSearchResults(presentBookings);
    setShowResults(true);
  }

  function handleClearSearch() {
    setShowResults(false);
    setSearchResults([]);
  }

  function handlePreviewDetails(booking) {
    setBookingToDisplay(booking);
    setShowDetails(true);
  }

  function handleCloseDetails() {
    setShowDetails(false);
  }

  return (
    <div className='page-container-small'>
      <h1>Check In / Out</h1>
      <div className='relative flex flex-col lg:flex-row gap-5 mt-8 lg:mt-14 min-h-[600px]'>
        <div className='lg:basis-3/5'>
          <SearchBookingForm onSubmit={handleSearchBooking} />
          {showResults && (
            <SearchResultsSection
              results={searchResults}
              previewDetails={handlePreviewDetails}
              clear={handleClearSearch}
            />
          )}
          <PresentBookingsSection
            period={presentPeriod[0]}
            bookings={presentBookings}
            previewDetails={handlePreviewDetails}
          />
        </div>
        <div className='absolute top-0 w-full lg:relative lg:basis-2/5'>
          {showDetails && (
            <BookingDetailsSection
              booking={bookingToDisplay}
              close={handleCloseDetails}
            />
          )}
          <div className='absolute right-0 hidden lg:block top-20'>
            <Image
              src='/CheckInOutDecoration.svg'
              width={393.24}
              height={424.18}
              layout='fixed'
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const presentPeriodData = await fetch(
    `${process.env.API_URL}/Api/Schedule/Periods/Present`,
  );
  const presentPeriod = await presentPeriodData.json();

  const presentBookingsData = await fetch(
    `${process.env.API_URL}/Api/Booking/Present`,
  );
  const presentBookings = await presentBookingsData.json();

  return {
    props: {
      presentPeriod,
      presentBookings,
    },
  };
}

CheckInOut.page = 'CheckInOut';
