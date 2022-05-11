import React from 'react';

export default function BookingSeat({ availableSeats, viewSeatDetails }) {
  return (
    <div className='m-8 overflow-y-auto'>
      <div className='grid grid-cols-2 gap-4 sm:grid-cols-5'>
        {availableSeats.map((aSeat) => (
          <button
            key={aSeat.id}
            type='button'
            className='w-[100px] rounded-md bg-bluish hover:bg-dusk-blue'
            onClick={() => viewSeatDetails(aSeat)}
          >
            <h5 className='px-3 pt-3 text-white'>{aSeat.name}</h5>
            <h5 className='pb-3 text-white'>{aSeat.id}</h5>
          </button>
        ))}
      </div>
    </div>
  );
}
