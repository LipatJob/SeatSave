/* eslint-disable react/jsx-no-bind */
import React, { useState, useRef, useEffect } from 'react';
import Router from 'next/router';
import Image from 'next/image';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import SearchBookingForm from '../../components/librarian/check-in-out/SearchBookingForm';
import SearchResultsSection from '../../components/librarian/check-in-out/SearchResultsSection';
import PresentBookingsSection from '../../components/librarian/check-in-out/PresentBookingsSection';
import BookingDetailsSection from '../../components/librarian/check-in-out/BookingDetailsSection';
import librarianAuthService from '../../lib/librarianAuthService';

const QrReader = dynamic(() => import('react-qr-reader'), {
  ssr: false,
});

export default function CheckInOut({ presentPeriod, presentBookings }) {
  useEffect(() => {
    if (!librarianAuthService.isLoggedIn()) {
      Router.push('/librarian/login');
    }
  }, []);

  const camera = useRef();

  const [showBookings, setShowBookings] = useState(true);

  const [showQRCodeScanner, setShowQRCodeScanner] = useState(false);

  const [cameraAccess, setCameraAccess] = useState(false);

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
    console.log(booking);
    setBookingToDisplay(booking);
    setShowDetails(true);
  }

  function handleCloseDetails() {
    setShowDetails(false);
  }

  function handleBookings() {
    setShowDetails(false);
    setShowBookings(true);
    setShowQRCodeScanner(false);
  }

  function handleQRCodeScanner() {
    setShowResults(false);
    setShowBookings(false);
    setShowDetails(false);
    setShowQRCodeScanner(true);
  }

  function handleToggleCamera() {
    setCameraAccess(!cameraAccess);
  }

  const handleErrorWebCam = (error) => {
    console.log(error);
  };

  const handleScannedQRCode = async (data) => {
    console.log(data);
    if (!showQRCodeScanner) {
      return;
    }

    if (data && !showDetails) {
      const res = await fetch(
        `${process.env.API_URL}/Api/Booking/Search?code=${data}`,
      );

      if (res.status === 200) {
        const json = await res.json();
        setScannedCode(data);
        setShowDetails(true);
        setBookingToDisplay(json[0]);
      }
    }
  };

  return (
    <div className='page-container-small'>
      <Head>
        <title>Check In/Out | SeatSave Librarian</title>
      </Head>

      <h1>Check In / Out</h1>

      <div className='relative flex flex-col lg:flex-row gap-5 mt-8 lg:mt-14 min-h-[600px]'>
        <div className='lg:basis-3/5'>
          <div className='grid grid-cols-2 mb-10 gap-x-3'>
            <button
              type='button'
              className={`text-black hover:bg-rodeo-dust button ${
                showQRCodeScanner ? 'bg-rodeo-dust' : 'bg-pearl-bush'
              }`}
              onClick={handleQRCodeScanner}
            >
              Scan QR Code
            </button>
            <button
              type='button'
              className={`text-black hover:bg-rodeo-dust button ${
                showBookings ? 'bg-rodeo-dust' : 'bg-pearl-bush'
              }`}
              onClick={handleBookings}
            >
              Search
            </button>
          </div>
          {showBookings && <SearchBookingForm onSubmit={handleSearchBooking} />}
          {showBookings && showResults && (
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
          {showQRCodeScanner && (
            <div className='flex flex-col items-center'>
              <button
                type='button'
                className='button'
                onClick={handleToggleCamera}
              >
                Open/Close Camera
              </button>
              {cameraAccess && (
                <QrReader
                  delay={300}
                  style={{ width: '50%' }}
                  className='mt-10'
                  onError={handleErrorWebCam}
                  onScan={handleScannedQRCode}
                  ref={camera}
                  showViewFinder={false}
                />
              )}
            </div>
          )}
        </div>
        <div className='absolute top-0 w-full lg:relative lg:basis-2/5'>
          {showDetails && (
            <BookingDetailsSection
              booking={bookingToDisplay}
              close={handleCloseDetails}
            />
          )}
          {!showDetails && (
            <div className='absolute right-0 hidden lg:block top-20'>
              <Image
                src='/CheckInOutDecoration.svg'
                width={393.24}
                height={424.18}
                layout='fixed'
              />
            </div>
          )}
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
