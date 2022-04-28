import React from 'react';
import AvailabilitySelectionPanel from '../../components/librarian/manage-date-time/AvailabilitySelectionPanel';
import PeriodSelectionPanel from '../../components/librarian/manage-date-time/PeriodSelectionPanel';

export default function ManageDateTime() {
  return (
    <div className='page-container-small'>
      <h1 className='mb-6'>Manage Date and Time</h1>
      <div className='grid grid-cols-3 gap-x-7'>
        <AvailabilitySelectionPanel />
        <PeriodSelectionPanel className='col-span-2' />
      </div>
    </div>
  );
}

ManageDateTime.page = 'ManageDateTime';
