import React from 'react';
import PanelListItem from './PanelListItem';

export default function RegularHoursSelectionPanel() {
  return (
    <div className='flex flex-col gap-2 p-3 pt-5'>
      <PanelListItem>Sunday</PanelListItem>
      <PanelListItem>Monday</PanelListItem>
      <PanelListItem>Tuesday</PanelListItem>
      <PanelListItem>Wednesday</PanelListItem>
      <PanelListItem>Thursday</PanelListItem>
      <PanelListItem>Friday</PanelListItem>
      <PanelListItem>Saturday</PanelListItem>
    </div>
  );
}
