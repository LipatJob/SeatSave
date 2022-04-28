import React, { useState } from 'react';
import AvailabilityTabs from './AvailabilityTabs';
import OverrideDaysSelectionPanel from './OverrideDaysSelectionPanel';
import RegularHoursSelectionPanel from './RegularHoursSelectionPanel';

export default function AvailabilitySelectionPanel() {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  return (
    <div className='flex flex-col border border-iron'>
      <div>
        <AvailabilityTabs
          activeTabIndex={currentTabIndex}
          onTabSelected={setCurrentTabIndex}
        />
      </div>
      <div className='flex-grow'>
        {currentTabIndex === 0 && <RegularHoursSelectionPanel />}
        {currentTabIndex === 1 && <OverrideDaysSelectionPanel />}
      </div>
    </div>
  );
}
