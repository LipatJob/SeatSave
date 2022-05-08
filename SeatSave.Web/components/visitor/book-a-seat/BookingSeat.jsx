import React from 'react';

export default function BookingSeat({ availableSeats, viewSeatDetails }) {
  return (
    <div>
      <div className='flex justify-center'>
        <h5 className='pt-20 font-bold'>Pick your seat</h5>
      </div>

      <div className='flex justify-center'>
        <div className='w-3/4 py-6 m-6 overflow-x-auto rounded-lg bg-pearl-bush sm:w-3/6 h-96'>
          <div className='grid grid-cols-1 sm:grid-cols-2'>
            {availableSeats.map((aSeat) => (
              <button
                key={aSeat.id}
                type='button'
                className='m-5 rounded-md bg-bluish hover:bg-dusk-blue'
                onClick={() => viewSeatDetails(aSeat)}
              >
                <h5 className='px-3 pt-3 text-white'>{aSeat.name}</h5>
                <h5 className='pb-3 text-white'>{aSeat.id}</h5>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
