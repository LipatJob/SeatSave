import Image from 'next/image';
import React, { useState } from 'react';
import DaySelectionPanel from '../../components/librarian/manage-date-time/DaySelectionPanel';
import PeriodSelectionPanel from '../../components/librarian/manage-date-time/PeriodSelectionPanel';

export default function ManageDateTime() {
  const [availabilityType, setAvailabilityType] = useState('RegularHours');
  const [selectedId, setSelectedId] = useState();

  return (
    <div className='page-container'>
      <h1 className='mb-6'>Manage Date & Time</h1>
      <div className='relative sm:grid sm:grid-cols-3 sm:gap-x-7'>
        <DaySelectionPanel
          dayType={availabilityType}
          selectedId={selectedId}
          onTabSelected={setAvailabilityType}
          onItemSelected={setSelectedId}
        />
        {!selectedId && (
          <div className='relative w-full col-span-2 mx-auto justify-center-center'>
            <Image
              src='/ManageSeatsDecoration.png'
              layout='fill'
              objectFit='contain'
            />
          </div>
        )}
        {selectedId && (
          <PeriodSelectionPanel
            selectedId={selectedId}
            className='absolute top-0 h-full col-span-2 bg-white sm:top-auto sm:relative'
            availabilityType={availabilityType}
            onClose={() => setSelectedId(null)}
          />
        )}
      </div>
    </div>
  );
}

ManageDateTime.page = 'ManageDateTime';
