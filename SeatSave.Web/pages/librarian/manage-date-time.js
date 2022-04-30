import React, { useState } from 'react';
import DaySelectionPanel from '../../components/librarian/manage-date-time/DaySelectionPanel';
import PeriodSelectionPanel from '../../components/librarian/manage-date-time/PeriodSelectionPanel';

export default function ManageDateTime() {
  const [availabilityType, setAvailabilityType] = useState('RegularHours');
  const [selectedId, setSelectedId] = useState();

  return (
    <div className='page-container-small'>
      <h1 className='mb-6'>Manage Date & Time</h1>
      <div className='grid grid-cols-3 gap-x-7 min-h-[500px]'>
        <DaySelectionPanel
          dayType={availabilityType}
          selectedId={selectedId}
          onTabSelected={setAvailabilityType}
          onItemSelected={setSelectedId}
        />
        {selectedId && (
          <PeriodSelectionPanel
            selectedId={selectedId}
            className='col-span-2'
            availabilityType={availabilityType}
          />
        )}
      </div>
    </div>
  );
}

ManageDateTime.page = 'ManageDateTime';
