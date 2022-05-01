import React, { useState } from 'react';
import Image from 'next/image';
import BookingDetails from './BookingDetails';
import OkModal from '../common/OkModal';
import { formatDate, formatTime } from '../../lib/DateHelper';
import visitorAuthService from '../../lib/visitorAuthService';

export default function CheckedIn({ bookingDetails, onCheckOut }) {
  const [checkoutMessageVisible, setCheckoutMessageVisible] = useState(false);
  const onCheckOutClicked = async () => {
    const response = await fetch(
      `${process.env.API_URL}/Api/Booking/${bookingDetails.id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: visitorAuthService.getAuthToken(),
        },
        body: '"Checked Out"',
      },
    );
    if (response.ok) {
      setCheckoutMessageVisible(true);
    } else {
      console.log('There was an error');
    }
  };
  const onCheckoutMessageSeen = () => {
    setCheckoutMessageVisible(false);
    onCheckOut();
  };

  return (
    <div>
      {checkoutMessageVisible && (
        <OkModal
          onOk={onCheckoutMessageSeen}
          onClose={onCheckoutMessageSeen}
          message={
            <div>
              <h4 className='mb-6'>See you next time!</h4>
              <p className='body-normal'>
                You have checked out of your booking. You can now book a seat
                for your next visit.
              </p>
            </div>
          }
        />
      )}

      <div className='grid grid-cols-2 page-container-small'>
        <div className='flex flex-col items-start gap-8'>
          <h1 className='pr-2 text-dusk-blue'>
            Your booking is until {formatTime(bookingDetails.period.timeEnd)}
          </h1>
          <BookingDetails details={bookingDetails} />
          <div className='flex flex-col items-center gap-4 mt-6'>
            <h4 className='text-center'>Are you leaving CLIR?</h4>
            <button
              className='w-full px-16 button'
              type='button'
              onClick={onCheckOutClicked}
            >
              CHECK OUT
            </button>
          </div>
        </div>
        <div className='relative'>
          <Image
            src='/CheckedInDecoration.svg'
            className='relative w-full h-auto'
            layout='responsive'
            objectFit='contain'
            width={800}
            height={800}
          />
        </div>
      </div>
    </div>
  );
}
