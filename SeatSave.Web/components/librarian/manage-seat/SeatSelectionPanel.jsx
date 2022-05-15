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
    <div>
      <PanelWithHeader
        header={<h4>Available Seats</h4>}
        body={
          <div className={className}>
            <div className=' h-[450px] overflow-y-scroll'>
              {seats.map((seat) => (
                <div key={seat.id}>
                  <Seat
                    Name={seat.name}
                    Code={seat.id}
                    onClick={() => onSeatSelected(seat.id)}
                  />
                </div>
              ))}
            </div>
            <div className='h-[70px]'>
              <CircularButton onClick={onAddClicked} />
            </div>
          </div>
        }
      />
    </div>
  );
}
