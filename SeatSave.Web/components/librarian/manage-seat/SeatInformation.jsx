import React, { useState, useEffect } from 'react';

export default function SeatInformation(selectedSeatID) {
  // eslint-disable-next-line react/destructuring-assignment
  const currentSeatID = selectedSeatID.selectedSeatID;
  const [userData, setUserData] = useState({});
  let seatID = 0;
  let seatName = 'Default';
  let seatType = 'default';
  let seatDescription = 'Default';

  const getData = async () => {
    const response = await fetch(
      `${process.env.API_URL}/Api/Seats/${currentSeatID}`,
    );
    const jsonData = await response.json();
    setUserData(jsonData);
  };
  useEffect(() => {
    if (currentSeatID !== 0) getData();
  }, []);

  if (currentSeatID === 0) {
    seatID = '';
    seatName = '';
    seatType = 'default';
    seatDescription = '';
  } else {
    seatID = currentSeatID;
    seatName = userData.name;
    seatType = userData.type;
    seatDescription = userData.description;
  }
  return (
    <form>
      <div className='w-full'>
        <label htmlFor='inputSeatID'>
          Seat ID
          <input
            type='text'
            id='inputSeatID'
            placeholder='Text'
            className='flex bg-iron'
            value={seatID}
            disabled
          />
        </label>
        <label htmlFor='inputName'>
          Name
          <input
            type='text'
            id='inputName'
            placeholder='Enter Seat Name'
            className='flex w-full'
            defaultValue={seatName}
          />
        </label>
        <label htmlFor='ddlType'>
          Type
          <select
            id='ddlType'
            className='flex w-full'
            placeholder='Select Seat Type'
            defaultValue={seatType}
          >
            <option value='default' disabled hidden>
              Select Seat Type
            </option>
            <option value='1'>Carrel Desk</option>
            <option value='2'>Carrel Desk with Outlet</option>
          </select>
        </label>
        <label htmlFor='textareaDescription'>
          Description
          <textarea
            id='textareaDescription'
            className='flex w-full h-32'
            style={{ resize: 'none' }}
            placeholder='Enter Seat Description'
            defaultValue={seatDescription}
          />
        </label>
      </div>
    </form>
  );
}
