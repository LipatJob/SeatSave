import React from 'react';
import PanelListItem from './PanelListItem';

export default function RegularHoursSelectionPanel({
  onItemSelected,
  selectedId,
}) {
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  return (
    <div className='flex flex-col gap-2'>
      {daysOfWeek.map((dayOfWeek) => (
        <PanelListItem
          className='bg-iron'
          onClick={() => onItemSelected(dayOfWeek)}
          selected={selectedId === dayOfWeek}
        >
          {dayOfWeek}
        </PanelListItem>
      ))}
    </div>
  );
}
