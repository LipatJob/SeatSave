import React from 'react';

export default function SeatMapLegends() {
  return (
    <div className='flex flex-col items-center'>
      <div className='flex flex-col gap-6 my-4 lg:flex-row justify-evenly'>
        <div className='flex flex-row items-center'>
          <div className='w-6 h-6  bg-[#37722B]' />
          <div className='pl-2'> Available</div>
        </div>
        <div className='flex flex-row items-center'>
          <div className='w-6 h-6 bg-[#EA555A]' />
          <div className='pl-2'> Reserved</div>
        </div>
        <div className='flex flex-row items-center'>
          <div className='w-6 h-6 bg-dawn' />
          <div className='pl-2'> Unavailable</div>
        </div>
      </div>
    </div>
  );
}
