import React from 'react';
import Image from 'next/image';
import DayTypeSelectionTabs from './DayTypeSelectionTabs';
import OverrideDaysSelectionPanel from './OverrideDaysSelectionPanel';
import RegularHoursSelectionPanel from './RegularHoursSelectionPanel';

export default function DaySelectionPanel({
  dayType,
  selectedId,
  onTabSelected,
  onItemSelected,
}) {
  return (
    <div className='flex flex-col border border-iron'>
      <div>
        <DayTypeSelectionTabs
          activeTab={dayType}
          onTabSelected={(e) => {
            onTabSelected(e);
            onItemSelected(null);
          }}
        />
      </div>
      <div className='flex-grow'>
        {dayType === 'RegularHours' && (
          <RegularHoursSelectionPanel
            onItemSelected={onItemSelected}
            selectedId={selectedId}
          />
        )}
        {dayType === 'OverrideDays' && (
          <OverrideDaysSelectionPanel
            onItemSelected={onItemSelected}
            selectedId={selectedId}
          />
        )}
      </div>
    </div>
  );
}
