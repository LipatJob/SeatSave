import React from 'react';
import PreviewBookingsTable from './PreviewBookingsTable';

export default function SearchResults({ results }) {
  return (
    <div className='mt-6'>
      <h4>Search Results</h4>
      <PreviewBookingsTable bookings={results} />
    </div>
  );
}
