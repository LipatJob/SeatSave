import React from 'react';

export default function PanelListItem({ onClick, children, selected }) {
  return (
    <button
      type='button'
      className={`py-2 px-4 border border-iron text-left active:bg-iron ${
        selected && 'bg-iron'
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
