import React, { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Rect } from 'react-konva';
import { areColliding, colorIron, standardSize } from '../../lib/seatMapHelper';
import SeatService from '../../services/SeatService';
import TableService from '../../services/TableService';
import Seat from './Seat';
import SeatDragOn from './SeatDragOn';
import Table from './Table';
import TableDragOn from './TableDragOn';
import TrashCan from './TrashCan';

export default function EditableSeatMap({
  seats,
  setSeats,
  selectedSeatId,
  setSelectedSeatId,
  onSeatsUpdated,
}) {
  const [selectedTable, setSelectedTable] = useState();
  const [tables, setTables] = useState([]);
  const [parentDimensions, setParentDimensions] = useState({
    width: 0,
    height: 0,
  });
  const parentDiv = useRef(null);
  const stage = useRef();
  const maxPosX = parentDimensions.width;
  const maxPosY = 500;

  const trashCanTransform = {
    x: parentDimensions.width - 100,
    y: maxPosY + 20,
    width: standardSize,
    height: standardSize,
  };

  const addNewSeat = (x, y) => {
    if (y + standardSize > maxPosY) {
      return;
    }

    SeatService.addSeat({
      name: 'New Seat',
      type: 'Carrel Desk',
      active: false,
      description: 'Edit Description',
      width: standardSize,
      height: standardSize,
      positionX: x,
      positionY: Math.floor(y),
    }).then((seat) => {
      setSeats((oldSeats) => {
        const newSeats = [...oldSeats, seat];
        onSeatsUpdated(newSeats);
        return newSeats;
      });
    });
  };

  const updateSeatPosition = (id, x, y) => {
    if (y + standardSize > maxPosY) {
      return;
    }

    const seatToUpdate = {
      ...seats.find((e) => e.id === id),
      positionX: x,
      positionY: Math.floor(y),
    };

    SeatService.updateSeat(id, seatToUpdate).then((updatedSeat) => {
      setSeats((oldSeats) =>
        oldSeats.map((oldSeat) => (oldSeat.id === id ? updatedSeat : oldSeat)),
      );
    });
  };

  const deleteSeat = (id) => {
    SeatService.deleteSeat(id).then(() => {
      setSeats((oldSeats) => {
        const newSeats = oldSeats.filter((e) => e.id !== id);
        onSeatsUpdated(newSeats);
        return newSeats;
      });
    });
  };

  const addNewTable = (x, y) => {
    if (y + standardSize > maxPosY) {
      return;
    }

    TableService.addTable({
      width: standardSize,
      height: standardSize,
      positionX: Math.floor(x),
      positionY: Math.floor(y),
    }).then((table) => {
      setTables((oldTables) => [...oldTables, table]);
    });
  };

  const updateTablePosition = (id, x, y) => {
    if (y > maxPosY) {
      return;
    }

    const tableToUpdate = {
      ...tables.find((e) => e.id === id),
      positionX: Math.floor(x),
      positionY: Math.floor(y),
      minPosY: maxPosY,
    };

    TableService.updateTable(id, tableToUpdate).then((updatedTable) => {
      setTables((oldTables) =>
        oldTables.map((oldTable) =>
          oldTable.id === id ? updatedTable : oldTable,
        ),
      );
    });
  };

  const updateTableDimensions = (id, x, y, width, height) => {
    const tableToUpdate = {
      ...tables.find((e) => e.id === id),
      positionX: Math.floor(x),
      positionY: Math.floor(y),
      width: Math.floor(width),
      height: Math.floor(height),
    };

    TableService.updateTable(id, tableToUpdate).then((updatedTable) => {
      setTables((oldTables) =>
        oldTables.map((oldTable) =>
          oldTable.id === id ? updatedTable : oldTable,
        ),
      );
    });
  };

  const deleteTable = (id) => {
    TableService.deleteTable(id).then(() => {});
    setTables((oldTables) => oldTables.filter((e) => e.id !== id));
  };

  const isCollidingWithTrashCan = (e) => {
    const result = areColliding(e.target.getClientRect(), trashCanTransform);
    console.log(`Result: ${result}`);
    return result;
  };

  const isValidPosition = (box) =>
    box.x > 0 &&
    box.y > 0 &&
    box.y + box.height < maxPosY &&
    box.x + box.width < maxPosX;

  useEffect(() => {
    TableService.getTables().then((fetchedTables) => setTables(fetchedTables));

    const checkSize = () => {
      setParentDimensions({
        width: parentDiv.current.offsetWidth,
        height: parentDiv.current.offsetHeight,
      });
    };
    checkSize();

    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  return (
    <div className='w-full' ref={parentDiv}>
      <Stage
        width={parentDimensions && parentDimensions.width}
        height={600}
        ref={stage}
        onClick={(e) => {
          if (e.target === stage.current) {
            setSelectedTable(null);
            setSelectedSeatId(null);
          }
        }}
      >
        <Layer>
          {seats.map((seat) => (
            <Seat
              id={seat.id}
              key={seat.id}
              x={seat.positionX}
              y={seat.positionY}
              isValidPosition={isValidPosition}
              isCollidingWithTrashCan={isCollidingWithTrashCan}
              isSelected={seat.id === selectedSeatId}
              isActive={seat.active}
              onClick={() => setSelectedSeatId(seat.id)}
              onDelete={() => deleteSeat(seat.id)}
              onPositionUpdated={(x, y) => updateSeatPosition(seat.id, x, y)}
            />
          ))}

          {tables.map((table) => (
            <Table
              key={table.id}
              x={table.positionX}
              y={table.positionY}
              width={table.width}
              height={table.height}
              isSelected={table.id === selectedTable}
              onSelected={() => {
                setSelectedTable(table.id);
              }}
              isValidPosition={isValidPosition}
              onPositionUpdated={(x, y) => updateTablePosition(table.id, x, y)}
              onDimensionsUpdated={(x, y, width, height) =>
                updateTableDimensions(table.id, x, y, width, height)
              }
              isCollidingWithTrashCan={isCollidingWithTrashCan}
              onDelete={() => deleteTable(table.id)}
            />
          ))}
        </Layer>
        <Layer>
          <Rect
            x={0}
            y={maxPosY}
            width={parentDimensions && parentDimensions.width}
            height={5}
            fill={colorIron}
          />
          <SeatDragOn x={50} y={maxPosY + 20} onDragEnd={addNewSeat} />
          <TableDragOn x={150} y={maxPosY + 20} onDragEnd={addNewTable} />
          <TrashCan x={trashCanTransform.x} y={maxPosY + 20} />
        </Layer>
      </Stage>
    </div>
  );
}
