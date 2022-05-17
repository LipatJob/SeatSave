import React from 'react';
import { formatTime } from '../../../lib/DateHelper';

export default function BookingTime({ availablePeriods, getSelectedPeriod }) {
  return (
    <div className=' h-[120px] overflow-x-scroll flex '>
      <div className='flex flex-nowrap '>
        {availablePeriods.map((aPeriods) => (
          <div className='inline-block px-4'>
            <button
              type='button'
              key={aPeriods.id}
              className=' w-[150px] h-full rounded-md bg-pearl-bush hover:bg-rodeo-dust focus:bg-rodeo-dust  '
              onClick={() => getSelectedPeriod(aPeriods.id)}
            >
              <h5 className='px-8 text-center'>
                {formatTime(aPeriods.timeStart)}
                <br />
                {formatTime(aPeriods.timeEnd)}
              </h5>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
