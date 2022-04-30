import React from 'react';
import PreviewBookingsTable from './PreviewBookingsTable';

export default function PresentBookingsSection({ bookings, previewDetails }) {
  const presentPeriodString = '10:00 am to 11:30 am';

  return (
    <div className='mt-8'>
      {bookings.length > 0 ? (
        <div>
          <h4>Bookings for {presentPeriodString}</h4>
          <PreviewBookingsTable
            bookings={bookings}
            previewDetails={previewDetails}
          />
        </div>
      ) : (
        <h4>No bookings for {presentPeriodString}</h4>
      )}
    </div>
  );
}
