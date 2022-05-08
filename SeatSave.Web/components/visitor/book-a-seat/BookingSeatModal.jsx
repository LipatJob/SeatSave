import React from 'react';

export default function BookingSeatModal({
  seatCurrent,
  getSelectedSeat,
  toggleModal,
}) {
  return (
    <div className='modal'>
      <div className='overlay'>
        <div className='modal-content'>
          <h2 className='m-6 text-center'>
            Seat {seatCurrent.name} - {seatCurrent.id}
          </h2>
          <p className='mx-6 mb-6 text-center'>
            <br />
            <h5>{seatCurrent.description}</h5>
          </p>

          <div className='flex justify-center'>
            <div>
              <button
                type='button'
                className='mb-6 rounded-lg button'
                onClick={() => {
                  getSelectedSeat(seatCurrent.id);
                  toggleModal();
                }}
              >
                <h6 className='font-medium text-white'>Select</h6>
              </button>
            </div>

            <div>
              <button
                type='button'
                onClick={toggleModal}
                className='px-4 ml-10 rounded-lg red-button'
              >
                <h6 className='font-medium text-white'>X</h6>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
