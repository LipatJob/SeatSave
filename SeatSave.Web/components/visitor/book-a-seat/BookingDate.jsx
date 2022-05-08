import React from 'react';
import { formatDate } from '../../../lib/DateHelper';

export default function BookingDate({ day, getSelectedDate }) {
  return (
    <div>
      <div className='flex justify-center'>
        <h5 className='pt-20 font-bold'>Select your date</h5>
      </div>

      <div className='flex justify-center'>
        <div className='flex justify-center w-3/4 py-6 overflow-x-auto flex-nowrap'>
          {day.map((availableDay) => (
            <button
              type='button'
              key={availableDay}
              className='w-56 mx-5 rounded-md bg-pearl-bush hover:bg-rodeo-dust'
              onClick={() => getSelectedDate(availableDay)}
            >
              <h5 className='px-16 py-4'>{formatDate(availableDay)}</h5>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
