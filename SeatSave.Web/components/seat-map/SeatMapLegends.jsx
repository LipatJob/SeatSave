import React from 'react';

export default function SeatMapLegends() {
  return (
    <div className='flex flex-col w-full gap-4 my-4 lg:flex-row justify-evenly'>
      <div className='flex flex-row items-center justify-center'>
        <div className='w-6 h-6  bg-[#37722B]' />
        <div className='pl-2'> Available</div>
      </div>
      <div className='flex flex-row items-center justify-center'>
        <div className='w-6 h-6 bg-[#EA555A]' />
        <div className='pl-2'> Occupied</div>
      </div>
      <div className='flex flex-row items-center justify-center'>
        <div className='w-6 h-6 bg-dawn' />
        <div className='pl-2'> Seat Unavailable</div>
      </div>
    </div>
  );
}
