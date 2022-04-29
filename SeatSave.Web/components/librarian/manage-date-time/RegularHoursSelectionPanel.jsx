import React from 'react';
import PanelListItem from './PanelListItem';

export default function RegularHoursSelectionPanel({ onItemSelected }) {
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  return (
    <div className='flex flex-col gap-2 p-3 pt-5'>
      {daysOfWeek.map((dayOfWeek) => (
        <PanelListItem onClick={() => onItemSelected(dayOfWeek)}>
          {dayOfWeek}
        </PanelListItem>
      ))}
    </div>
  );
}
