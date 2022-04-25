import React from 'react';

export default function PanelWithHeader({ header, body, buttons }) {
  return (
    <div>
      <div className='w-full shadow-lg'>
        <div className='flex w-full text-black bg-pearl-bush'>
          <div className='py-4 pl-4'>
            <h4>{header}</h4>
          </div>
        </div>
        <div>
          <div className='px-4 py-4 h-[470px] '>{body}</div>
          <div className='px-4 h-content lg:h-[80px]'>{buttons}</div>
        </div>
      </div>
    </div>
  );
}
