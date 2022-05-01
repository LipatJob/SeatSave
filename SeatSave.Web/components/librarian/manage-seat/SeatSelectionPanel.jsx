import React from 'react';
import CircularButton from '../../common/CircularButton';
import PanelWithHeader from './PanelWithHeader';
import Seat from './Seat';

export default function SeatSelectionPanel({
  seats,
  selectedSeatId,
  onAddClicked,
  onSeatSelected,
}) {
  return (
    <div>
      <PanelWithHeader
        header='Available Seats'
        body={
          <div>
            <div className=' h-[450px]'>
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
