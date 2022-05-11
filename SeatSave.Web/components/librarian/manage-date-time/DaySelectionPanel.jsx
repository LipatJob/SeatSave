import React from 'react';
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
    <div className='flex flex-col border border-iron  h-[500px] max-h-[500px]'>
      <div>
        <DayTypeSelectionTabs
          activeTab={dayType}
          onTabSelected={(e) => {
            onTabSelected(e);
            onItemSelected(null);
          }}
        />
      </div>
      <div className='h-full p-3 pt-5 pr-1'>
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
