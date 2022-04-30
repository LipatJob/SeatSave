/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import SearchBookingForm from '../../components/librarian/check-in-out/SearchBookingForm';
import SearchResultsTable from '../../components/librarian/check-in-out/SearchResults';

export default function CheckInOut({ presentBookings }) {
  //const [searchResults, setSearchResults] = useState();
  
  function handleSearchBooking(e) {
    e.preventDefault();
  }
  
  return (
    <div className='page-container-small'>
      <h1>Check In / Out</h1>
      <div className='flex flex-row gap-5 mt-14'>
        
        {/* left panel */}
        <div className='basis-3/5'>
          <SearchBookingForm onSubmit={handleSearchBooking} />
          <SearchResultsTable results={presentBookings} />
        </div>

        {/* right panel */}
        <div className='ml-4 basis-2/5 bg-pearl-bush h-[616px]'>right</div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.API_URL}/Api/Booking`);
  const presentBookings = await res.json();

  return {
    props: {
      presentBookings,
    },
  };
}

CheckInOut.page = 'CheckInOut';
