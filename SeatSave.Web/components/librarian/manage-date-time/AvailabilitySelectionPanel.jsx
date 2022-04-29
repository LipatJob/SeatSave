import React from 'react';
import AvailabilityTabs from './AvailabilityTabs';
import OverrideDaysSelectionPanel from './OverrideDaysSelectionPanel';
import RegularHoursSelectionPanel from './RegularHoursSelectionPanel';

export default function AvailabilitySelectionPanel({
  pageState,
  setPageState,
}) {
  const selectTab = (tabName) => {
    setPageState((oldState) => ({ ...oldState, availabilityType: tabName }));
  };
  const selectItem = (itemId) => {
    setPageState((oldState) => ({ ...oldState, selectedId: itemId }));
  };

  return (
    <div className='flex flex-col border border-iron'>
      <div>
        <AvailabilityTabs
          activeTab={pageState.availabilityType}
          onTabSelected={selectTab}
        />
      </div>
      <div className='flex-grow'>
        {pageState.availabilityType === 'RegularHours' && (
          <RegularHoursSelectionPanel onItemSelected={selectItem} />
        )}
        {pageState.availabilityType === 'OverrideDays' && (
          <OverrideDaysSelectionPanel
            items={pageState.overrideDayItems}
            onItemSelected={selectItem}
          />
        )}
      </div>
    </div>
  );
}
