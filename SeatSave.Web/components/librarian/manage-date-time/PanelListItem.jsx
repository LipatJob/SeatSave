import React from 'react';

export default function PanelListItem({ onClick, children, selected }) {
  return (
    <button
      type='button'
      className={`float-left w-full px-4 py-2 text-left text-black bg-transparent border-2 border-iron hover:bg-pearl-bush hover:text-black focus:bg-iron ${
        selected && 'bg-iron'
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
