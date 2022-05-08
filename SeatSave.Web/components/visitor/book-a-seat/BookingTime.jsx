import React from 'react';
import { formatTime } from '../../../lib/DateHelper';

export default function BookingTime({ availablePeriods, getSelectedPeriod }) {
  return (
    <div id='periodElement'>
      <div className='flex justify-center'>
        <h5 className='pt-20 font-bold'>Select your time</h5>
      </div>

      <div className='flex justify-center'>
        <div className='flex justify-center w-3/4 py-6 overflow-x-auto flex-nowrap'>
          {availablePeriods?.map((aPeriods) => (
            <button
              key={aPeriods.id}
              type='button'
              className='flex mx-5 rounded-md bg-pearl-bush hover:bg-rodeo-dust w-30'
              onClick={() => getSelectedPeriod(aPeriods.id)}
            >
              <h5 className='px-12 py-4'>
                {formatTime(aPeriods.timeStart)}
                <br />
                {formatTime(aPeriods.timeEnd)}
              </h5>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
