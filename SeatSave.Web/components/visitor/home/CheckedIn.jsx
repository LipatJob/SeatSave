import React, { useState } from 'react';
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
    <div className='page-container-small'>
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
      <h2 className='mb-8 font-bold text-dusk-blue'>
        Your booking is until {formatTime(bookingDetails.period.timeEnd)}
      </h2>
      <div className='grid grid-cols-1 sm:grid-cols-3 sm:gap-8'>
        <div className='sm:col-span-1'>
          <BookingDetails details={bookingDetails} />
        </div>
        <div className='sm:col-span-2'>
          <div className='w-full h-[320px] mt-4 bg-red-600'> SeatMap </div>
        </div>
      </div>
      <div className='grid grid-cols-1 mt-4 mb-8 sm:grid-cols-3'>
        <div className='col-span-1'>
          <h4 className='mb-4 text-left'>Are you leaving CLIR?</h4>
          <button
            className='w-full button'
            type='button'
            onClick={onCheckOutClicked}
          >
            CHECK OUT
          </button>
        </div>
      </div>
    </div>
  );
}
