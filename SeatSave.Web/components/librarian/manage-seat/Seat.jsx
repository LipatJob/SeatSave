import React from 'react';

export default function Seat({ Name, Code, onClick }) {
  return (
    <div className='flow-root pb-2'>
      <button
        onClick={onClick}
        type='button'
        className='float-left w-full px-4 text-left text-black bg-transparent border-2 border-iron hover:bg-pearl-bush hover:text-black focus:bg-iron '
      >
        {Name}
        <span className='float-right text-dawn'>{Code}</span>
      </button>
    </div>
  );
}
