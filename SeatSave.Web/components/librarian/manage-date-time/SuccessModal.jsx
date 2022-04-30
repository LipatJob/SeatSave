import React from 'react';
import ModalBase from '../../common/ModalBase';

export default function SuccessModal({ onOk, onClose, message }) {
  return (
    <ModalBase onClose={onClose}>
      <div className=' w-[500px] h-[300px] flex flex-col items-center'>
        <h4 className='mb-7'>{message}</h4>
        <button type='button' className='px-8 button' onClick={onOk}>
          OK
        </button>
      </div>
    </ModalBase>
  );
}
