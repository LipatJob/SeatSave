import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import PanelWithHeader from '../../components/librarian/manage-seat/PanelWithHeader';
import SeatInformation from '../../components/librarian/manage-seat/SeatInformation';

import AddedSeatModal from '../../components/librarian/manage-seat/AddedSeatModal';

import SeatSelectionPanel from '../../components/librarian/manage-seat/SeatSelectionPanel';

export default function ManageSeats() {
  const [formPart, setFormPart] = useState(0);
  const [currId, setCurrentID] = useState(0);
  const [seatData, seatSeatData] = useState();
  const [seats, setSeats] = useState([]);

  const [showModalAddedSeat, setShowModalAddedSeat] = useState(false);

  const updateSeats = async () => {
    const res = await fetch(`${process.env.API_URL}/Api/Seats`);

    if (!res.ok) {
      console.log('There was an error');
    }

    const data = await res.json();
    setSeats(data);
  };

  const updateSeatData = async () => {
    if (currId === 0) {
      seatSeatData({
        id: 0,
        name: '',
        type: '',
        active: 'true',
        description: '',
      });
      return;
    }
    const response = await fetch(`${process.env.API_URL}/Api/Seats/${currId}`);
    const jsonData = await response.json();
    seatSeatData(jsonData);
  };

  const updateAvailableSeats = () => {
    console.log('Updating seats');
    updateSeats();
  };

  useEffect(() => {
    updateSeats();
  }, []);

  useEffect(() => {
    updateSeatData();
  }, [currId]);

  const [seatName, setSeatName] = useState();
  return (
    <div className='page-container '>
      {showModalAddedSeat && (
        <AddedSeatModal onClick={setShowModalAddedSeat} name={seatName} />
      )}
      <div className='pb-4 h-fit '>
        <h1>Manage Seats</h1>
      </div>
      <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
        <div id='leftPanel' className=' lg:col-span-1'>
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
                <SeatInformation
                  seatData={seatData}
                  setFormPart={setFormPart}
                  setShowModalAddedSeat={setShowModalAddedSeat}
                  setSeatName={setSeatName}
                  onAvailableSeatsUpdated={updateAvailableSeats}
                  updateSeatData={updateSeatData}
                />
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}

ManageSeats.page = 'ManageSeats';
