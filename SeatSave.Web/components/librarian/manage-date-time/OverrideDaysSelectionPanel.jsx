import React from 'react';
import CircularButton from '../../common/CircularButton';
import PanelListItem from './PanelListItem';

export default function OverrideDaysSelectionPanel() {
  return (
    <div className='relative h-full'>
      <div className='flex flex-col gap-2 p-3 pt-5'>
        <PanelListItem>Sample</PanelListItem>
        <PanelListItem>Sample</PanelListItem>
        <PanelListItem>Sample</PanelListItem>
        <PanelListItem>Sample</PanelListItem>
      </div>
      <div className='absolute bottom-3 right-3'>
        <CircularButton />
      </div>
    </div>
  );
}
