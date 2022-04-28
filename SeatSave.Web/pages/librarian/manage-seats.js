import React, { useState } from 'react';
import Image from 'next/image';

import PanelWithHeader from '../../components/librarian/manage-seat/PanelWithHeader';
import SeatInformation from '../../components/librarian/manage-seat/SeatInformation';
import Seat from '../../components/librarian/manage-seat/Seat';
import DeleteConfirmationModal from '../../components/librarian/manage-seat/DeleteConfirmationModal';
import AddedSeatModal from '../../components/librarian/manage-seat/AddedSeatModal';
import CircularButton from '../../components/librarian/manage-seat/CircularButton';

export default function ManageSeats({ seats }) {
  const [formPart, setFormPart] = useState(0);
  const [currId, setCurrentID] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [showModalAddedSeat, setShowModalAddedSeat] = useState(false);

  return (
    <div className='page-container '>
      {showModal && <DeleteConfirmationModal onClick={setShowModal} />}
      {showModalAddedSeat && <AddedSeatModal onClick={setShowModalAddedSeat} />}

      <div className='pb-4 h-fit '>
        <h1>Manage Seats</h1>
      </div>
      <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
        <div id='leftPanel' className=' lg:col-span-1'>
          <PanelWithHeader
            header='Available Seats'
            body={seats.map((seat) => (
              <div>
                <Seat
                  Name={seat.name}
                  Code={seat.id}
                  onClick={() => {
                    setCurrentID(seat.id);
                    setFormPart(1);
                  }}
                />
              </div>
            ))}
            buttons={
              <CircularButton
                onClick={() => {
                  setCurrentID(0);
                  setFormPart(1);
                }}
              />
            }
          />
        </div>
        <div id='rightPanel' className=' lg:col-span-2'>
          {formPart === 0 && (
            <div className='max-h-[570px] w-full text-center pt-10 hidden sm:block'>
              <Image
                src='/ManageSeatsDecoration.png'
                width={500}
                height={500}
              />
            </div>
          )}
          {formPart === 1 && (
            <PanelWithHeader
              header='Seat Information'
              body={
                <SeatInformation selectedSeatID={currId}> </SeatInformation>
              }
              buttons={
                <div className='grid content-center grid-cols-1 gap-4 pb-4 text-center lg:gap-0 lg:grid-cols-4 lg:pt-4'>
                  <button
                    type='button'
                    className='red-button'
                    onClick={() => setShowModal(true)}
                  >
                    DELETE
                  </button>
                  <div className='pt-2 text-right md:col-span-1'>
                    <input
                      type='checkbox'
                      className='w-4 h-4 mr-2 form-checkbox text-dusk-blue'
                      defaultChecked
                    />
                    Activate Seat
                  </div>
                  <div className='md:col-span-1'>
                    <button
                      type='button'
                      className='w-full lg:w-min gray-button'
                      onClick={() => {
                        setFormPart(0);
                      }}
                    >
                      CANCEL
                    </button>
                  </div>
                  <div className='md:col-span-1'>
                    <button
                      type='button'
                      className='w-full button'
                      onClick={() => setShowModalAddedSeat(true)}
                    >
                      SAVE
                    </button>
                  </div>
                </div>
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}
export async function getServerSideProps() {
  const res = await fetch(`${process.env.API_URL}/Api/Seats`);
  const seats = await res.json();

  return {
    props: {
      seats,
    },
  };
}
ManageSeats.page = 'ManageSeats';
