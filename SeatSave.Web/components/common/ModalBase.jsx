import React from 'react';

export default function ModalBase({ children, onClose }) {
  return (
    <>
      <div className='fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none'>
        <div className='relative max-w-lg mx-auto my-6'>
          <div className='relative flex flex-col w-full bg-white border-0 shadow-lg outline-none focus:outline-none'>
            <div className='flow-root p-4'>
              <button
                type='button'
                className='float-right text-3xl text-dawn'
                onClick={onClose}
              >
                ×
              </button>
            </div>
            <div>{children}</div>
          </div>
        </div>
      </div>
      <div className='fixed inset-0 z-40 bg-black opacity-25' />
    </>
  );
}
