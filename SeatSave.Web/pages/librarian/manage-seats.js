import React, { useState } from 'react';
import Image from 'next/image';

import PanelWithHeader from '../../components/librarian/manage-seat/PanelWithHeader';
import SeatInformation from '../../components/librarian/manage-seat/SeatInformation';
import Seat from '../../components/librarian/manage-seat/Seat';

export default function ManageSeats() {
  const [formPart, setFormPart] = useState(0);
  const showInfo = () => {
    setFormPart((oldFormPart) => oldFormPart + 1);
  };
  const closeInfo = () => {
    setFormPart((oldFormPart) => oldFormPart - 1);
  };
  const [showModal, setShowModal] = React.useState(false);
  const [showModalAddedSeat, setShowModalAddedSeat] = React.useState(false);

  return (
    <div className='page-container '>
      {showModal ? (
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
                    onClick={() => setShowModal(false)}
                  >
                    ×
                  </button>
                </div>
                {/* body */}
                <div className='relative flex-auto w-[500px] h-[300px]'>
                  <div className='w-full h-full p-4 text-4xl text-center'>
                    Are you sure you want to delete this seat?
                    <div className='w-full py-4 pt-4 text-4xl text-center'>
                      <button
                        type='button'
                        className='w-2/5 red-button'
                        onClick={() => setShowModal(false)}
                      >
                        YES
                      </button>
                    </div>
                    <div className='w-full text-4xl text-center'>
                      <button
                        type='button'
                        className='w-2/5 gray-button'
                        onClick={() => setShowModal(false)}
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
      ) : null}
      {showModalAddedSeat ? (
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
                    onClick={() => setShowModalAddedSeat(false)}
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
                        onClick={() => setShowModalAddedSeat(false)}
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
      ) : null}
      <div className='pb-4 h-fit '>
        <h1>Manage Seats</h1>
      </div>
      <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
        <div id='leftPanel' className=' lg:col-span-1'>
          <PanelWithHeader
            header='Available Seats'
            body={
              <div>
                <Seat Name='abc' Code='Q34' selectSeat={showInfo}>
                  {' '}
                </Seat>
              </div>
            }
            buttons={
              <div className='pb-4 text-right lg:pb-0'>
                <button
                  onClick={showInfo}
                  type='button'
                  className='w-16 h-16 p-0 transition duration-200 ease-in rounded-full shadow bg-bluish hover:bg-blue-700 active:shadow-lg mouse focus:outline-none'
                >
                  <svg
                    viewBox='0 0 20 20'
                    enableBackground='new 0 0 20 20'
                    className='inline-block w-6 h-6'
                  >
                    <path
                      fill='#FFFFFF'
                      d='M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                C15.952,9,16,9.447,16,10z'
                    />
                  </svg>
                </button>
              </div>
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
              body={<SeatInformation> </SeatInformation>}
              buttons={
                <div className='grid content-center grid-cols-1 gap-4 pb-4 text-center lg:gap-0 lg:grid-cols-4 lg:pt-4'>
                  <button
                    type='button'
                    className='pt-2 md:col-span-1 text-valentine-red'
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
                  <div className=' md:col-span-1'>
                    <button
                      type='button'
                      className='w-full lg:w-min gray-button'
                      onClick={closeInfo}
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

ManageSeats.page = 'ManageSeats';
