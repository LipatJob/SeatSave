import React, { useState } from 'react';
import BookingCode from './BookingCode';
import BookingDetails from './BookingDetails';
import WarningConfirmationModal from '../../common/WarningConfirmationModal';
import visitorAuthService from '../../../lib/visitorAuthService';
import { formatDate, formatTime } from '../../../lib/DateHelper';

export default function PendingBooking({ bookingDetails, onCancel }) {
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
      <h2 className='mb-4 font-bold text-dusk-blue'>
        Your booking is at {formatDate(bookingDetails.bookingDate)} (
        {formatTime(bookingDetails.period.timeStart)})
      </h2>
      <div className='grid grid-cols-1 sm:grid-cols-3 sm:gap-8'>
        <div className='sm:col-span-1'>
          <BookingCode code={bookingDetails.bookingCode} />
        </div>
        <div className='sm:col-span-2'>
          <BookingDetails column details={bookingDetails} />
          <div className='w-full h-[320px] mt-4 bg-red-600'> SeatMap </div>
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
