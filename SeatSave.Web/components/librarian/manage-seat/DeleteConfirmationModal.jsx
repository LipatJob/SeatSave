import React from 'react';
import SeatInformation from './SeatInformation';

export default function DeleteConfirmationModal({
  onClick,
  setDeletionConfirmation,
}) {
  return (
    <>
      <div className='fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none'>
        <div className='relative max-w-lg mx-auto my-6'>
          <div className='relative flex flex-col w-full bg-white border-0 shadow-lg outline-none focus:outline-none'>
            <div className='flow-root p-4'>
              <button
                type='button'
                className='float-right text-3xl text-dawn'
                onClick={() => onClick(false)}
              >
                ×
              </button>
            </div>
            <div className='relative flex-auto w-[500px] h-[300px]'>
              <div className='w-full h-full p-4 text-4xl text-center'>
                Are you sure you want to delete this seat?
                <div className='w-full py-4 pt-4 text-4xl text-center'>
                  <button
                    type='button'
                    className='w-2/5 red-button'
                    onClick={() => {
                      setDeletionConfirmation(true);
                      onClick(false);
                    }}
                  >
                    YES
                  </button>
                </div>
                <div className='w-full text-4xl text-center'>
                  <button
                    type='button'
                    className='w-2/5 gray-button'
                    onClick={() => onClick(false)}
                  >
                    NO
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='fixed inset-0 z-40 bg-black opacity-25' />
    </>
  );
}
