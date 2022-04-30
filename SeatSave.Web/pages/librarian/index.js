import React from 'react';

export default function CheckInOut() {
  return (
    <div className='page-container-small'>
      <h1>Check In / Out</h1>
      <div className='flex flex-row gap-5 mt-14'>
        <div className='basis-3/5 bg-iron h-96'>left</div>
        <div className='ml-4 basis-2/5 bg-pearl-bush h-96'>right</div>
      </div>
    </div>
  );
}

CheckInOut.page = 'CheckInOut';
