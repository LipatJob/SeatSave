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
      className={`${className}`}
      header={<h4>Available Seats</h4>}
      body={
        <div className='h-[436px] overflow-auto'>
          <div className='flex flex-col h-full overflow-hidden overflow-y-scroll '>
            {seats.map((seat) => (
              <Seat
                key={seat.id}
                Name={seat.name}
                Code={seat.id}
                onClick={() => onSeatSelected(seat.id)}
              />
            ))}

            <div className='sticky mt-auto bottom-3 right-3'>
              <CircularButton onClick={onAddClicked} />
            </div>
          </div>
        </div>
      }
    />
  );
}
