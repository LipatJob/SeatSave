import React from 'react';

export default function AddedSeatModal({ onClick }) {
  return (
    <>
      <div className='fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none'>
        <div className='relative max-w-lg mx-auto my-6'>
          {/* content */}
          <div className='relative flex flex-col w-full bg-white border-0 shadow-lg outline-none focus:outline-none'>
            {/* header */}
            <div className='flow-root p-4'>
              <button
                type='button'
                className='float-right text-3xl text-dawn'
                onClick={() => onClick(false)}
              >
                ×
              </button>
            </div>
            {/* body */}
            <div className='relative flex-auto w-[500px] h-[300px]'>
              <div className='w-full h-full p-4 text-4xl text-center'>
                Seat Added!
                <div className='py-4 pt-4 text-lg '>
                  You have successfully added a new seat:
                  <br /> [NAME]
                </div>
                <div className='w-full py-4 pt-8 text-4xl text-center'>
                  <button
                    type='button'
                    className='w-2/5 button'
                    onClick={() => onClick(false)}
                    s
                  >
                    OK
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
