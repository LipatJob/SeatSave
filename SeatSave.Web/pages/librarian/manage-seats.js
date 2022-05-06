import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { GrClose } from 'react-icons/gr';
import PanelWithHeader from '../../components/librarian/manage-seat/PanelWithHeader';
import SeatInformation from '../../components/librarian/manage-seat/SeatInformation';
import OkModal from '../../components/common/OkModal';
import SeatSelectionPanel from '../../components/librarian/manage-seat/SeatSelectionPanel';

export default function ManageSeats() {
  const [formPart, setFormPart] = useState(0);
  const [currentID, setCurrentID] = useState(0);
  const [seats, setSeats] = useState([]);
  const [showModalAddedSeat, setShowModalAddedSeat] = useState(false);
  const [seatName, setSeatName] = useState();

  const updateSeats = async () => {
    const res = await fetch(`${process.env.API_URL}/Api/Seats`);
    if (!res.ok) {
      console.log('There was an error');
    }
    const data = await res.json();
    setSeats(data);
  };

  const updateAvailableSeats = () => {
    console.log('Updating seats');
    updateSeats();
  };

  useEffect(() => {
    updateSeats();
  }, []);
  return (
    <div className='page-container '>
      {showModalAddedSeat && (
        <OkModal
          onOk={() => setShowModalAddedSeat(false)}
          onClose={() => setShowModalAddedSeat(false)}
          message={
            <div>
              <h4 className='mb-6'>Seat Added!</h4>
              <p className='body-normal'>
                You have successfully added a new seat:
                <br /> {seatName}
              </p>
            </div>
          }
        />
      )}
      <div className='pb-4 h-fit '>
        <h1>Manage Seats</h1>
      </div>
      <div className='relative md:grid md:gap-8 md:grid-cols-3'>
        <SeatSelectionPanel
          seats={seats}
          onAddClicked={() => {
            setCurrentID(0);
            setFormPart(1);
          }}
          onSeatSelected={(id) => {
            setCurrentID(id);
            setFormPart(1);
          }}
        />
        {formPart === 0 && (
          <div className='hidden w-full h-full pt-10 text-center md:col-span-2 md:block'>
            <Image src='/ManageSeatsDecoration.png' width={500} height={500} />
          </div>
        )}
        {formPart === 1 && (
          <PanelWithHeader
            className='absolute top-0 w-full h-full bg-white md:col-span-2 md:top-auto md:relative'
            header={
              <div className='flow-root'>
                <h4 className='float-left '> Seat Information</h4>
                <span className='float-right pt-2 pr-4 md:hidden'>
                  <button
                    type='button'
                    onClick={() => setFormPart(0)}
                    className='ml-auto'
                  >
                    <GrClose className='mx-auto my-auto' />
                  </button>
                </span>
              </div>
            }
            body={
              <SeatInformation
                setFormPart={setFormPart}
                setShowModalAddedSeat={setShowModalAddedSeat}
                setSeatName={setSeatName}
                onAvailableSeatsUpdated={updateAvailableSeats}
                currentID={currentID}
              />
            }
          />
        )}
      </div>
    </div>
  );
}

ManageSeats.page = 'ManageSeats';
