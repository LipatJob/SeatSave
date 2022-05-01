import React from 'react';
import ModalBase from '../../common/ModalBase';

export default function SuccessModal({ onOk, onClose, message }) {
  return (
    <ModalBase onClose={onClose}>
      <div className=' w-[500px] h-[300px] flex flex-col items-center px-6'>
        <h4 className='mx-auto mb-6 font-medium text-center'>Success!</h4>
        <h4 className='mx-auto mb-8 text-center'>{message}</h4>
        <button type='button' className='px-8 button' onClick={onOk}>
          OK
        </button>
      </div>
    </ModalBase>
  );
}
