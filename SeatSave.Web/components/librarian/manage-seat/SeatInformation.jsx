import React from 'react';

export default function SeatInformation(selectedSeatID) {
  // eslint-disable-next-line react/destructuring-assignment
  const currentSeatID = selectedSeatID.selectedSeatID;
  return (
    <form>
      <div className='w-full'>
        <label htmlFor='seatID'>
          Seat ID
          <input
            type='text'
            id='seatID'
            placeholder='Text'
            className='flex bg-iron'
            disabled='true'
            value={currentSeatID}
          />
        </label>
        <label htmlFor='name'>
          Name
          <input
            type='text'
            id='name'
            placeholder='Enter Seat Name'
            className='flex w-full'
          />
        </label>
        <label htmlFor='type'>
          Type
          <select
            id='type'
            className='flex w-full'
            placeholder='Select Seat Type'
            defaultValue='default'
          >
            <option value='default' disabled hidden>
              Select Seat Type
            </option>
            <option value='Carrel Desk'>Carrel Desk</option>
            <option value='Carrel Desk with Outlet'>
              Carrel Desk with Outlet
            </option>
          </select>
        </label>
        <label htmlFor='description'>
          Description
          <textarea
            rows='4'
            className='flex w-full h-32'
            style={{ resize: 'none' }}
            placeholder='Enter Seat Description'
          >
            {' '}
          </textarea>
        </label>
      </div>
    </form>
  );
}
