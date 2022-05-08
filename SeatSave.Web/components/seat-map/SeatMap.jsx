import React, { useRef, useState } from 'react';
import { Stage, Layer, Rect } from 'react-konva';
import ClientOnly from '../common/ClientOnly';
import Table from './Table';

export default function SeatMapComponent() {
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
      booked: true,
    },
    5: {
      x: 250,
      y: 50,
      booked: true,
    },
  });

  const [tables, setTables] = useState({
    1: {
      x: 400,
      y: 50,
      width: 50,
      height: 50,
    },
    2: {
      x: 450,
      y: 50,
      width: 50,
      height: 50,
    },
    3: {
      x: 500,
      y: 50,
      width: 50,
      height: 50,
    },
    4: {
      x: 550,
      y: 50,
      width: 50,
      height: 50,
    },
    5: {
      x: 600,
      y: 50,
      width: 50,
      height: 50,
    },
  });

  const stage = useRef();

  const gridSize = 25;
  const updateSeatKey = (e, index, seat) => {
    const newX = Math.round(seat.x / gridSize) * gridSize;
    const newY = Math.round(seat.y / gridSize) * gridSize;

    setSeats({
      ...seats,
      [index]: { ...seats[index], x: newX, y: newY },
    });
    e.target.position({
      x: newX,
      y: newY,
    });
    stage.current.batchDraw();
  };

  const selectSeat = (id) => {
    setSelectedSeat(seats[id]);
  };

  const updateTablePosition = (index, x, y) => {
    setTables({
      ...tables,
      [index]: { ...tables[index], x, y },
    });
  };

  const updateTableDimensions = (index, x, y, width, height) => {
    console.log(width);
    console.log(height);

    setTables({
      ...tables,
      [index]: { ...tables[index], x, y, width, height },
    });
  };

  const [selectedTable, setSelectedTable] = useState();

  return (
    <div>
      {selectedSeat && JSON.stringify(seats)}
      {JSON.stringify(tables)}

      {selectedTable}
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        ref={stage}
        onClick={(e) => {
          console.log(e.target);
          if (e.target === stage) {
            setSelectedTable(null);
          }
        }}
      >
        <Layer>
          {Object.entries(tables).map(([key, table]) => (
            <Table
              key={key}
              x={table.x}
              y={table.y}
              width={table.width}
              height={table.height}
              isSelected={key === selectedTable}
              onSelected={() => {
                setSelectedTable(key);
              }}
              onPositionUpdated={(x, y) => updateTablePosition(key, x, y)}
              onDimensionsUpdated={(x, y, width, height) =>
                updateTableDimensions(key, x, y, width, height)
              }
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}
