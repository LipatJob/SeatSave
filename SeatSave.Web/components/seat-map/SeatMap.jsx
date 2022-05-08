import React, { useState } from 'react';
import { Stage, Layer, Rect, Circle } from 'react-konva';

export default function SeatMap() {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [seats, setSeats] = useState({
    1: {
      x: 50,
      y: 50,
      booked: false,
    },
    2: {
      x: 100,
      y: 50,
      booked: false,
    },
    3: {
      x: 150,
      y: 50,
      booked: false,
    },
    4: {
      x: 200,
      y: 50,
      booked: false,
    },
    5: {
      x: 250,
      y: 50,
      booked: false,
    },
  });

  const updateSeatKey = (index, seat) => {
    setSeats({ ...seats, [index]: seat });
  };

  const selectSeat = (id) => {
    setSelectedSeat(seats[id]);
  };

  return (
    <div>
      {selectedSeat && JSON.stringify(selectedSeat)}
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {Object.entries(seats).map(([key, seat]) => (
            <Rect
              key={key}
              x={seat.x}
              draggable
              y={seat.y}
              fill={seat.booked ? 'red' : 'green'}
              width={20}
              height={20}
              onDragEnd={(e) => {
                updateSeatKey(key, {
                  x: e.target.x(),
                  y: e.target.y(),
                });
              }}
              onClick={() => selectSeat(key)}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}
