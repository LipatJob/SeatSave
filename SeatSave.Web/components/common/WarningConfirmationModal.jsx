import React from 'react';
import ModalBase from './ModalBase';

export default function WarningConfirmationModal({
  onYes,
  onNo,
  onClose,
  text,
}) {
  return (
    <ModalBase onClose={onClose}>
      <div className='relative flex-auto'>
        <div className='w-full h-full p-4 text-4xl text-center'>
          <p className='mb-4'>{text}</p>
          <div className='w-full py-4 pt-4 text-4xl text-center'>
            <button type='button' className='w-48 red-button' onClick={onYes}>
              YES
            </button>
          </div>
          <div className='w-full text-4xl text-center'>
            <button type='button' className='w-48 gray-button' onClick={onNo}>
              NO
            </button>
          </div>
        </div>
      </div>
    </ModalBase>
  );
}
