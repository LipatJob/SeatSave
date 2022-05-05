import React from 'react';
import { formatTime } from '../../../lib/DateHelper';
import PreviewBookingsTable from './PreviewBookingsTable';

export default function PresentBookingsSection({
  period,
  bookings,
  previewDetails,
}) {
  const presentPeriodString =
    period != null
      ? `${formatTime(period.timeStart)} to ${formatTime(period.timeEnd)}`
      : '';

  return (
    <div className='mt-8'>
      {period != null &&
        (bookings.length > 0 ? (
          <div>
            <h4>Bookings for {presentPeriodString}</h4>
            <PreviewBookingsTable
              bookings={bookings}
              previewDetails={previewDetails}
            />
          </div>
        ) : (
          <h4>No bookings for {presentPeriodString}</h4>
        ))}
    </div>
  );
}
