import React from 'react';
import { formatDate } from '../../../lib/DateHelper';

export default function BookingDate({ day, getSelectedDate }) {
  return (
    <div className=' h-[120px] overflow-x-scroll flex '>
      <div className='flex flex-nowrap '>
        {day.map((availableDay) => (
          <div className='inline-block px-4'>
            <button
              type='button'
              key={availableDay}
              className=' w-[150px] h-full rounded-md bg-pearl-bush hover:bg-rodeo-dust '
              onClick={() => getSelectedDate(availableDay)}
            >
              <h5 className='px-8 text-center'>{formatDate(availableDay)}</h5>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
