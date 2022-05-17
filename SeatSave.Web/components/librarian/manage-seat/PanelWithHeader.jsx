import React from 'react';

export default function PanelWithHeader({ header, body, className }) {
  return (
    <div className={`w-full shadow-lg flex flex-col h-full ${className}`}>
      <div className='flex w-full text-black bg-pearl-bush'>
        <div className='w-full py-4 pl-4'>{header}</div>
      </div>
      <div className='h-full px-4 py-4 bg-white'>{body}</div>
    </div>
  );
}
