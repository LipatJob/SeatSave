import React from 'react';

export default function AvailabilityTabs({ activeTabIndex, onTabSelected }) {
  const notSelectedBg = 'bg-pearl-bush';
  const selectedBg = 'bg-rodeo-dust';

  const tab1Bg = activeTabIndex === 0 ? selectedBg : notSelectedBg;
  const tab2Bg = activeTabIndex === 1 ? selectedBg : notSelectedBg;

  return (
    <div className='grid grid-cols-2'>
      <button
        type='button'
        className={`p-3 ${tab1Bg}`}
        onClick={() => onTabSelected(0)}
      >
        Regular Hours
      </button>
      <button
        type='button'
        className={`p-3 ${tab2Bg}`}
        onClick={() => onTabSelected(1)}
      >
        Override Days
      </button>
    </div>
  );
}
