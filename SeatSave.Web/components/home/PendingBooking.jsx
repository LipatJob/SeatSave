import React, { useState } from 'react';
import Image from 'next/image';
import BookingCode from './BookingCode';
import BookingDetails from './BookingDetails';
import WarningConfirmationModal from '../common/WarningConfirmationModal';

export default function PendingBooking({ bookingDetails }) {
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const onCancelBookingClicked = () => {
    setCancelModalVisible(true);
  };
  const onCancelBookingConfirmed = () => {
    setCancelModalVisible(false);
  };

  return (
    <div className='grid grid-cols-2 page-container-small'>
      {cancelModalVisible && (
        <WarningConfirmationModal
          text='Are you sure you want to cancel your reservation?'
          onClose={() => setCancelModalVisible(false)}
          onNo={() => setCancelModalVisible(false)}
          onYes={onCancelBookingConfirmed}
        />
      )}
      <div className='flex flex-col items-start gap-8'>
        <h1 className='pr-2 text-dusk-blue'>Your booking is at 10:00am</h1>
        <BookingCode code={bookingDetails.bookingCode} />
        <BookingDetails details={bookingDetails} />
        <button
          className='px-16 red-button'
          type='button'
          onClick={onCancelBookingClicked}
        >
          CANCEL BOOKING
        </button>
      </div>
      <div className='relative mt-20'>
        <Image
          src='/PendingDecoration.svg'
          className='relative w-full h-auto'
          layout='responsive'
          objectFit='contain'
          width={800}
          height={800}
        />
      </div>
    </div>
  );
}
