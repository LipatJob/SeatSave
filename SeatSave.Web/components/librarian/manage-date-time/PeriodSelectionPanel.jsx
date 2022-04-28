import React from 'react';

export default function PeriodSelectionPanel({ className }) {
  function generatePeriods() {
    const count = 16;
    const periods = [];
    for (let i = 0; i < count; i += 1) {
      periods.push({
        timeStart: '7:00am',
        timeEnd: '8:00am',
      });
    }

    return periods;
  }

  const periods = generatePeriods();

  return (
    <div className={`flex flex-col w-full shadow ${className}`}>
      <div className='h-16 p-4 bg-pearl-bush'>
        <h4>Time</h4>
      </div>
      <div className='flex flex-col items-center px-10 pb-6'>
        <div className='grid w-full grid-cols-2'>
          {periods.map(({ timeStart, timeEnd }) => (
            <div className='flex flex-row items-center justify-center gap-4'>
              <input type='checkbox' className='shrink checkbox' />
              {`${timeStart} to ${timeEnd}`}
            </div>
          ))}
        </div>
        <button className='px-8 mt-4 button' type='button'>
          SAVE
        </button>
      </div>
    </div>
  );
}
