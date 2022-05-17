import React, { useEffect, useState } from 'react';
import { GrClose } from 'react-icons/gr';
import dynamic from 'next/dynamic';
import PanelWithHeader from '../../components/librarian/manage-seat/PanelWithHeader';
import SeatInformationForm from '../../components/librarian/manage-seat/SeatInformationForm';
import SeatSelectionPanel from '../../components/librarian/manage-seat/SeatSelectionPanel';

const EditableSeatMap = dynamic(
  () => import('../../components/seat-map/EditableSeatMap'),
  {
    ssr: false,
  },
);

export default function ManageSeats({ seatTypes }) {
  const [showSeatDetails, setShowSeatDetails] = useState(false);
  const [currentID, setCurrentID] = useState(null);
  const [seats, setSeats] = useState([]);

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
      <div className='pb-4 h-fit '>
        <h1>Manage Seats</h1>
      </div>
      <div className='md:grid md:gap-8 md:grid-cols-3'>
        <div className='mb-4 border-8 rounded-lg sm:mb-0 md:col-span-2 border-pearl-bush'>
          <EditableSeatMap
            seats={seats}
            setSeats={setSeats}
            selectedSeatId={currentID}
            setSelectedSeatId={(id) => {
              setCurrentID(id);
              setShowSeatDetails(id !== null);
            }}
            onSeatsUpdated={(newSeats) => setSeats(newSeats)}
          />
        </div>
        <div className='relative'>
          {!showSeatDetails && (
            <SeatSelectionPanel
              seats={seats}
              onAddClicked={() => {
                setCurrentID(null);
                setShowSeatDetails(true);
              }}
              onSeatSelected={(id) => {
                setCurrentID(id);
                setShowSeatDetails(true);
              }}
            />
          )}
          {showSeatDetails && (
            <PanelWithHeader
              className='top-0 w-full h-full bg-white md:col-span-2 md:top-auto md:relative'
              header={
                <div className='flow-root'>
                  <h4 className='float-left '> Seat Information</h4>
                  <span className='float-right pt-2 pr-4'>
                    <button
                      type='button'
                      onClick={() => {
                        setCurrentID(null);
                        setShowSeatDetails(false);
                      }}
                      className='ml-auto'
                    >
                      <GrClose className='mx-auto my-auto' />
                    </button>
                  </span>
                </div>
              }
              body={
                <SeatInformationForm
                  onAvailableSeatsUpdated={updateAvailableSeats}
                  currentID={currentID}
                  seatTypes={seatTypes}
                  goToPreviousFormPart={() => {
                    setCurrentID(null);
                    setShowSeatDetails(false);
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
