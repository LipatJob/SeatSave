import React from 'react';
import OkModal from '../../common/OkModal';

export default function BookingSeatModal({ seatCurrent, toggleModal }) {
  return (
    <OkModal
      onOk={toggleModal}
      onClose={toggleModal}
      message={
        <div className='w-[300px]'>
          <h4 className='mb-6'>
            Seat {seatCurrent.id} - {seatCurrent.name}
          </h4>
          <p className='body-normal'>{seatCurrent.description}</p>
        </div>
      }
    />
  );
}
