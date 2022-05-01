import React from 'react';
import ModalBase from './ModalBase';

export default function DeleteConfirmationModal({
  onYes,
  onNo,
  onClose,
  text,
}) {
  return (
    <ModalBase onClose={onClose}>
      <div className='relative flex-auto w-[500px] h-[300px]'>
        <div className='w-full h-full p-4 text-4xl text-center'>
          {text}
          <div className='w-full py-4 pt-4 text-4xl text-center'>
            <button type='button' className='w-2/5 red-button' onClick={onYes}>
              YES
            </button>
          </div>
          <div className='w-full text-4xl text-center'>
            <button type='button' className='w-2/5 gray-button' onClick={onNo}>
              NO
            </button>
          </div>
        </div>
      </div>
    </ModalBase>
  );
}
