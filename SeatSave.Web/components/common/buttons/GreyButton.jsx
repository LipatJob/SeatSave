import React from 'react';

export default function GreyButton({ text, onClick, className }) {
  return (
    <button
      onClick={onClick}
      type='button'
      className={`px-4 py-2 text-xl font-bold text-white uppercase bg-dawn hover:bg-zinc-500 ${className}`}
    >
      {text}
    </button>
  );
}
