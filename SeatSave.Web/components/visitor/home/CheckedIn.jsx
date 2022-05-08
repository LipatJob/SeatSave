import React, { useState } from 'react';
import Image from 'next/image';
import BookingDetails from './BookingDetails';
import OkModal from '../../common/OkModal';
import { formatTime } from '../../../lib/DateHelper';
import visitorAuthService from '../../../lib/visitorAuthService';

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

      <div className='grid grid-cols-1 sm:grid-cols-2 page-container-small'>
        <div className='flex flex-col gap-8'>
          <h1 className='mb-0 leading-tight sm:mb-4 text-dusk-blue'>
            Your booking is until {formatTime(bookingDetails.period.timeEnd)}
          </h1>
          <BookingDetails details={bookingDetails} />
          <div className='flex flex-col max-w-xs gap-4 mt-6 sm:items-center'>
            <h4 className='text-center'>Are you leaving CLIR?</h4>
            <button
              className='w-full button'
              type='button'
              onClick={onCheckOutClicked}
            >
              CHECK OUT
            </button>
          </div>
        </div>
        <div className='hidden mt-20 sm:block sm:relative'>
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
