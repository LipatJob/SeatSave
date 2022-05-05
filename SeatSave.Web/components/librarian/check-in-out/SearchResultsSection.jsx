import React from 'react';
import PreviewBookingsTable from './PreviewBookingsTable';

export default function SearchResultsSection({
  results,
  previewDetails,
  clear,
}) {
  return (
    <div className='mt-8'>
      <div className='flex flex-row items-end justify-between'>
        <h4>Search Results</h4>
        <button type='button' className='body-small text-dawn' onClick={clear}>
          Clear Search
        </button>
      </div>
      <PreviewBookingsTable
        bookings={results}
        previewDetails={previewDetails}
      />
    </div>
  );
}
