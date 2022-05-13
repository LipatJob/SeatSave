/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import Image from 'next/image';
import SearchBookingForm from '../../components/librarian/check-in-out/SearchBookingForm';
import SearchResultsSection from '../../components/librarian/check-in-out/SearchResultsSection';
import PresentBookingsSection from '../../components/librarian/check-in-out/PresentBookingsSection';
import BookingDetailsSection from '../../components/librarian/check-in-out/BookingDetailsSection';
import { width } from '@mui/system';

const isBrowser = typeof window != 'undefined';

if (isBrowser) {
  var { QrReader } = require('react-qr-reader');
}

export default function CheckInOut({ presentPeriod, presentBookings }) {
  const [showBookings, setShowBookings] = useState(true);

  const [showQRCodeScanner, setShowQRCodeScanner] = useState(false);

  const [searchResults, setSearchResults] = useState();

  const [showResults, setShowResults] = useState(false);

  const [showDetails, setShowDetails] = useState(false);

  const [bookingToDisplay, setBookingToDisplay] = useState([]);

  // FOR QR CODE SCANNING
  const [scannedCode, setScannedCode] = useState('');

  async function handleSearchBooking(e) {
    e.preventDefault();
    const code = e.target.bookingCode.value;
    const res = await fetch(
      `${process.env.API_URL}/Api/Booking/Search?code=${code}`,
    );
    const results = await res.json();

    setSearchResults(results);
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

  function handleBookings() {
    setShowBookings(true);
    setShowQRCodeScanner(false);
  }

  function handleQRCodeScanner() {
    setShowBookings(false);
    setShowDetails(false);
    setShowQRCodeScanner(true);
  }

  const handleErrorWebCam = (error) => {
    console.log(error);
  };

  const handleScannedQRCode = (data) => {
    if (data) {
      setScannedCode(data);
    }
  };

  return (
    <div className='page-container-small'>
      <h1>Check In / Out</h1>

      {showQRCodeScanner && isBrowser && (
        <div>
          {JSON.stringify(QrReader)}
          <QrReader
            delay={300}
            style={{ width: '100%' }}
            onError={handleErrorWebCam}
            onScan={handleScannedQRCode}
          />
          <h3>Code: {scannedCode}</h3>
        </div>
      )}
      <div className='grid grid-cols-2 gap-x-3 my-10'>
        <button
          className='bg-pearl-bush hover:bg-rodeo-dust text-black button'
          onClick={handleQRCodeScanner}
        >
          Scan QR Code
        </button>
        <button
          className='bg-pearl-bush hover:bg-rodeo-dust text-black button'
          onClick={handleBookings}
        >
          Search
        </button>
      </div>

      <div className='relative flex flex-col lg:flex-row gap-5 mt-8 lg:mt-14 min-h-[600px]'>
        <div className='lg:basis-3/5'>
          {showBookings && <SearchBookingForm onSubmit={handleSearchBooking} />}
          {showResults && (
            <SearchResultsSection
              results={searchResults}
              previewDetails={handlePreviewDetails}
              clear={handleClearSearch}
            />
          )}
          {showBookings && (
            <PresentBookingsSection
              period={presentPeriod[0]}
              bookings={presentBookings}
              previewDetails={handlePreviewDetails}
            />
          )}
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
