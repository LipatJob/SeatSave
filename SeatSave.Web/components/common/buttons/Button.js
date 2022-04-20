import React from 'react';

export default function Button({ text, onClick, className }) {
  return (
    <button
      onClick={onClick}
      type='button'
      className={`px-4 py-2 text-xl font-bold text-white uppercase bg-bluish hover:bg-dusk-blue ${className}`}
    >
      {text}
    </button>
  );
}
