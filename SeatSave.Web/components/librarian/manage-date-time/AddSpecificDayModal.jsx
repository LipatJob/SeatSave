import React from 'react';
import ModalBase from '../../common/ModalBase';

export default function AddSpecifcDayModal({ onAdd, onClose }) {
  return (
    <ModalBase onClose={onClose}>
      <div className='flex flex-col items-center w-[500px] h-[300px] '>
        <h4 className='mb-7'>Override Day</h4>
        <input type='date' placeholder='Enter Date' className='px-8 mb-14' />
        <button type='button' className='px-8 button' onClick={onAdd}>
          ADD DATE
        </button>
      </div>
    </ModalBase>
  );
}
