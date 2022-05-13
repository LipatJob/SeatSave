import React, { useEffect, useState } from 'react';
import { GrClose } from 'react-icons/gr';
import dynamic from 'next/dynamic';
import PanelWithHeader from '../../components/librarian/manage-seat/PanelWithHeader';
import SeatInformation from '../../components/librarian/manage-seat/SeatInformation';
import OkModal from '../../components/common/OkModal';
import SeatSelectionPanel from '../../components/librarian/manage-seat/SeatSelectionPanel';

const EditableSeatMap = dynamic(
  () => import('../../components/seat-map/EditableSeatMap'),
  {
    ssr: false,
  },
);

export default function ManageSeats({ seatTypes }) {
  const [showModalAddedSeat, setShowModalAddedSeat] = useState(false);
  const [currentID, setCurrentID] = useState(null);
  const [seats, setSeats] = useState([]);
  const [seatName, setSeatName] = useState();

  const updateSeats = async () => {
    const res = await fetch(`${process.env.API_URL}/Api/Seats`);
    if (!res.ok) {
      console.log('There was an error');
      return;
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
        <div className='border-8 rounded-lg md:col-span-2 border-pearl-bush'>
          <EditableSeatMap
            seats={seats}
            setSeats={setSeats}
            selectedSeatId={currentID}
            setSelectedSeatId={(id) => {
              setCurrentID(id);
            }}
            onSeatsUpdated={(newSeats) => setSeats(newSeats)}
          />
        </div>
        <div>
          {!currentID && (
            <SeatSelectionPanel
              seats={seats}
              onAddClicked={() => {
                setCurrentID(null);
              }}
              onSeatSelected={(id) => {
                setCurrentID(id);
              }}
            />
          )}
          {currentID && (
            <PanelWithHeader
              className='absolute top-0 w-full h-full bg-white md:col-span-2 md:top-auto md:relative'
              header={
                <div className='flow-root'>
                  <h4 className='float-left '> Seat Information</h4>
                  <span className='float-right pt-2 pr-4'>
                    <button
                      type='button'
                      onClick={() => setCurrentID(null)}
                      className='ml-auto'
                    >
                      <GrClose className='mx-auto my-auto' />
                    </button>
                  </span>
                </div>
              }
              body={
                <SeatInformation
                  setShowModalAddedSeat={setShowModalAddedSeat}
                  setSeatName={setSeatName}
                  onAvailableSeatsUpdated={updateAvailableSeats}
                  currentID={currentID}
                  seatTypes={seatTypes}
                  goToPreviousFormPart={() => {
                    setCurrentID(null);
                  }}
                />
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const response = await fetch(`${process.env.API_URL}/Api/Seats/Types`);
  const seatTypes = await response.json();
  return {
    props: { seatTypes },
  };
}

ManageSeats.page = 'ManageSeats';
