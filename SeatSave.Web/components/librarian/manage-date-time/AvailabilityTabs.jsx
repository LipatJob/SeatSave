import React from 'react';

export default function AvailabilityTabs({ activeTab, onTabSelected }) {
  const notSelectedBg = 'bg-pearl-bush';
  const selectedBg = 'bg-rodeo-dust';

  const tab1Bg = activeTab === 'RegularHours' ? selectedBg : notSelectedBg;
  const tab2Bg = activeTab === 'OverrideDays' ? selectedBg : notSelectedBg;

  return (
    <div className='grid grid-cols-2'>
      <button
        type='button'
        className={`p-3 h-16  ${tab1Bg}`}
        onClick={() => onTabSelected('RegularHours')}
      >
        Regular Hours
      </button>
      <button
        type='button'
        className={`p-3 h-16  ${tab2Bg}`}
        onClick={() => onTabSelected('OverrideDays')}
      >
        Override Days
      </button>
    </div>
  );
}
