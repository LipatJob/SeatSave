import React from 'react';
import CircularButton from '../../common/CircularButton';
import PanelWithHeader from './PanelWithHeader';
import Seat from './Seat';

export default function SeatSelectionPanel({
  seats,
  onAddClicked,
  onSeatSelected,
  className,
}) {
  return (
    <PanelWithHeader
      className={`h-[620px]   ${className}`}
      header={<h4>Available Seats</h4>}
      body={
        <div className='flex flex-col max-h-full overflow-hidden overflow-y-scroll'>
          {seats.map((seat) => (
            <Seat
              key={seat.id}
              Name={seat.name}
              Code={seat.id}
              onClick={() => onSeatSelected(seat.id)}
            />
          ))}

          <CircularButton
            className='sticky mt-auto bottom-3 right-3'
            onClick={onAddClicked}
          />
        </div>
      }
    />
  );
}
