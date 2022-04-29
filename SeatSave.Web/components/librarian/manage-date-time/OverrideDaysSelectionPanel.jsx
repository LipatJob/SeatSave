import React from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import CircularButton from '../../common/CircularButton';
import PanelListItem from './PanelListItem';

export default function OverrideDaysSelectionPanel({ items, onItemSelected }) {
  return (
    <div className='relative h-full'>
      <div className='flex flex-col gap-2 p-3 pt-5'>
        {items.map((e) => (
          <PanelListItem onClick={() => onItemSelected(e.id)} key={e.id}>
            <div className='flex items-center'>
              <p>{e.name}</p>
              <button
                type='button'
                className='ml-auto text-valentine-red active:bg-black'
              >
                <AiOutlineCloseCircle className='w-8 h-8 ' />
              </button>
            </div>
          </PanelListItem>
        ))}
      </div>
      <div className='absolute bottom-3 right-3'>
        <CircularButton />
      </div>
    </div>
  );
}
