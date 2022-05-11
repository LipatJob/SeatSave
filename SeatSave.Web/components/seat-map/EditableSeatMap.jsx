import React, { useRef, useState } from 'react';
import { Stage, Layer, Rect } from 'react-konva';
import { areColliding, colorIron } from '../../lib/seatMapHelper';
import ClientOnly from '../common/ClientOnly';
import Seat from './Seat';
import SeatDragOn from './SeatDragOn';
import Table from './Table';
import TableDragOn from './TableDragOn';
import TrashCan from './TrashCan';

export default function EditableSeatMap() {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [selectedTable, setSelectedTable] = useState();
  const [seats, setSeats] = useState({});
  const [tables, setTables] = useState({});
  const stage = useRef();
  const trashCan = useRef();
  const trashCanTransform = {
    x: 600,
    y: 500,
    width: 50,
    height: 50,
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

  const updateSeatPosition = (index, x, y) => {
    setSeats({
      ...seats,
      [index]: { ...seats[index], x, y },
    });
  };

  const addNewSeat = (x, y) => {
    setSeats((oldSeats) => ({
      ...oldSeats,
      [Math.floor(Math.random() * 10000)]: {
        x,
        y,
        width: 50,
        height: 50,
        active: true,
      },
    }));
  };

  const addNewTable = (x, y) => {
    setTables((oldTables) => ({
      ...oldTables,
      [Math.floor(Math.random() * 10000)]: {
        x,
        y,
        width: 50,
        height: 50,
      },
    }));
  };

  const isCollidingWithTrashCan = (e) => {
    const result = areColliding(e.target.getClientRect(), trashCanTransform);
    console.log(`Result: ${result}`);
    return result;
  };

  const deleteSeat = (key) => {
    const { [key]: keyToRemove, ...newSeats } = seats;
    console.log(`DELETED ${key}`);
    setSeats(newSeats);
  };

  return (
    <ClientOnly>
      <Stage
        width={700}
        height={600}
        ref={stage}
        onClick={(e) => {
          console.log('target');
          console.log(e.target);
          console.log('stage');
          console.log(stage);
          if (e.target === stage.current) {
            setSelectedTable(null);
            setSelectedSeat(null);
          }
        }}
      >
        <Layer>
          {Object.entries(seats).map(([key, seat]) => (
            <Seat
              key={key}
              x={seat.x}
              y={seat.y}
              onPositionUpdated={(x, y) => updateSeatPosition(key, x, y)}
              isAvailable={key === selectedSeat}
              isActive={seat.active}
              isSelected={key === selectedSeat}
              onClick={() => setSelectedSeat(key)}
              isCollidingWithTrashCan={isCollidingWithTrashCan}
              onDelete={() => deleteSeat(key)}
            />
          ))}

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
          <Rect x={0} y={470} width={800} height={5} fill={colorIron} />
          <SeatDragOn x={200} y={500} onDragEnd={addNewSeat} />
          <TableDragOn x={300} y={500} onDragEnd={addNewTable} />
          <TrashCan x={600} y={500} ref={trashCan} />
        </Layer>
      </Stage>
      <div className='ml-8'>
        <p>Seats</p>
        <p>{JSON.stringify(seats)} </p>
        <p>Selected: {selectedSeat}</p>
        <br />
        <p>Tables</p>
        <p>{JSON.stringify(tables)} </p>
        <p>Selected: {selectedTable}</p>
      </div>
    </ClientOnly>
  );
}
