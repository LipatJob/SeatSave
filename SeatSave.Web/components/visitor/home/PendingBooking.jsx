import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import BookingCode from './BookingCode';
import BookingDetails from './BookingDetails';
import WarningConfirmationModal from '../../common/WarningConfirmationModal';
import visitorAuthService from '../../../lib/visitorAuthService';
import { formatDate, formatTime } from '../../../lib/DateHelper';
import OkModal from '../../common/OkModal';

const ViewSeatMap = dynamic(() => import('../../seat-map/ViewSeatMap'), {
  ssr: false,
});

export default function PendingBooking({ bookingDetails, onCancel }) {
  // Interval object for Expiration Timer
  const expirationTimerInterval = setInterval(triggerExpirationTimer, 5000);
  const [timeExpired, setTimeExpired] = useState(false);

  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const onCancelBookingClicked = () => {
    setCancelModalVisible(true);
  };
  const onCancelBookingConfirmed = async () => {
    const response = await fetch(
      `${process.env.API_URL}/Api/Booking/${bookingDetails.id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: visitorAuthService.getAuthToken(),
        },
        body: '"Cancelled"',
      },
    );
    if (response.ok) {
      setCancelModalVisible(false);
      onCancel();
    } else {
      console.log('There was an error');
    }
  };

  const onExpirationMessageSeen = () => {
    setTimeExpired(false);
    onCancelBookingConfirmed();
    onCancel();
  };

  function triggerExpirationTimer() {
    if (timeExpired === false) {
      const dateNow = new Date();
      const timeNow = `${dateNow.getHours()}:${dateNow.getMinutes()}:${dateNow.getSeconds()}`;
      const currentDate = `${dateNow.getFullYear()}-${
        dateNow.getMonth() + 1
      }-${dateNow.getDate()}`;

      const currentDateTime = new Date(`${currentDate} ${timeNow}`);
      const dateToCompare = new Date(
        `${bookingDetails.bookingDate} ${bookingDetails.period.timeEnd}`,
      );

      if (currentDateTime.getTime() >= dateToCompare.getTime()) {
        console.log(currentDateTime);
        console.log(dateToCompare);
        setTimeExpired(true);
        clearInterval(expirationTimerInterval);
      }
    }
  }

  return (
    <div className='page-container-small'>
      {cancelModalVisible && (
        <WarningConfirmationModal
          text='Are you sure you want to cancel your reservation?'
          onClose={() => setCancelModalVisible(false)}
          onNo={() => setCancelModalVisible(false)}
          onYes={onCancelBookingConfirmed}
        />
      )}
      {timeExpired && (
        <OkModal
          onOk={onExpirationMessageSeen}
          onClose={onExpirationMessageSeen}
          message={
            <div>
              <h4 className='mb-6'>Booking Expired</h4>
              <p className='body-normal'>
                Your booking has exceeded the time period. You may able to book
                another seat again.
              </p>
            </div>
          }
        />
      )}
      <h2 className='mb-8 font-bold text-dusk-blue'>
        Your booking is at {formatDate(bookingDetails.bookingDate)} (
        {formatTime(bookingDetails.period.timeStart)})
      </h2>
      <div className='grid grid-cols-1 sm:grid-cols-3 sm:gap-8'>
        <div className='sm:col-span-1'>
          <BookingCode code={bookingDetails.bookingCode} />
        </div>
        <div className='sm:col-span-2'>
          <BookingDetails column details={bookingDetails} />
          <div className='w-full mt-4'>
            <ViewSeatMap
              id={bookingDetails.seat.id}
              date={bookingDetails.bookingDate}
              time={bookingDetails.period.timeStart}
            />
          </div>
        </div>
      </div>
      <div className='mt-4 mb-8'>
        <button
          className='w-full sm:max-w-[304px] red-button float-right'
          type='button'
          onClick={onCancelBookingClicked}
        >
          CANCEL BOOKING
        </button>
      </div>
    </div>
  );
}
