import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import BookingDetails from './BookingDetails';
import OkModal from '../../common/OkModal';
import { formatTime } from '../../../lib/DateHelper';
import visitorAuthService from '../../../lib/visitorAuthService';

const ViewSeatMap = dynamic(() => import('../../seat-map/ViewSeatMap'), {
  ssr: false,
});

export default function CheckedIn({ bookingDetails, onCheckOut }) {
  // Interval object for Expiration Timer
  const expirationTimerInterval = setInterval(triggerExpirationTimer, 5000);
  const [timeExpired, setTimeExpired] = useState(false);

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
      console.log('here?');
      setCheckoutMessageVisible(true);
    } else {
      console.log('There was an error');
    }
  };
  const onCheckoutMessageSeen = () => {
    setCheckoutMessageVisible(false);
    onCheckOut();
  };

  const onExpirationMessageSeen = () => {
    setTimeExpired(false);
    onCheckOut();
  };

  function triggerExpirationTimer() {
    if (timeExpired === false) {
      const dateNow = new Date();
      const timeNow = `${dateNow.getHours()}:${dateNow.getMinutes()}:${dateNow.getSeconds()}`;

      const currentDateTime = new Date(`1970-01-01 ${timeNow}`);
      const dateToCompare = new Date(
        `1970-01-01 ${bookingDetails.period.timeEnd}`,
      );

      console.log(
        (currentDateTime.getTime() - dateToCompare.getTime()) / 60000,
      );

      if ((currentDateTime.getTime() - dateToCompare.getTime()) / 60000 >= 16) {
        setTimeExpired(true);
        clearInterval(expirationTimerInterval);
        onCheckOutClicked();
      }
    }
  }

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
      {timeExpired && (
        <OkModal
          onOk={onExpirationMessageSeen}
          onClose={onExpirationMessageSeen}
          message={
            <div>
              <h4 className='mb-6'>Your time is up!</h4>
              <p className='body-normal'>
                You have exceeded your time for your reserved booking schedule.
                You may now leave the library premises and book a seat for your
                next visit.
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
          <div className='w-full mt-4'>
            <ViewSeatMap
              id={bookingDetails.seat.id}
              date={bookingDetails.bookingDate}
              time={bookingDetails.period.timeStart}
            />
          </div>
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
