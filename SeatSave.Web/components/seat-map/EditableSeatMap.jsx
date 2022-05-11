import React, { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Rect } from 'react-konva';
import { areColliding, colorIron } from '../../lib/seatMapHelper';
import SeatService from '../../services/SeatService';
import TableService from '../../services/TableService';
import Seat from './Seat';
import SeatDragOn from './SeatDragOn';
import Table from './Table';
import TableDragOn from './TableDragOn';
import TrashCan from './TrashCan';

export default function EditableSeatMap({
  selectedSeatId,
  setSelectedSeatId,
  onSeatsUpdated,
}) {
  const [selectedTable, setSelectedTable] = useState();
  const [seats, setSeats] = useState([]);
  const [tables, setTables] = useState([]);
  const [parentDimensions, setParentDimensions] = useState({
    width: 0,
    height: 0,
  });
  const parentDiv = useRef(null);
  const stage = useRef();
  const trashCan = useRef();
  const trashCanTransform = {
    x: parentDimensions.width - 100,
    y: 500,
    width: 50,
    height: 50,
  };

  const maxPosY = 400;

  useEffect(() => {
    setParentDimensions({
      width: parentDiv.current.clientWidth,
      height: parentDiv.current.clientHeight,
    });
  }, [parentDiv]);

  const addNewSeat = (x, y) => {
    if (y > maxPosY) {
      return;
    }

    SeatService.addSeat({
      name: 'New Seat',
      type: 'Carrel Desk',
      active: false,
      description: 'Edit Description',
      width: 50,
      height: 50,
      positionX: x,
      positionY: Math.floor(y),
    }).then((seat) => {
      setSeats((oldSeats) => [...oldSeats, seat]);
    });
    onSeatsUpdated();
  };

  const updateSeatPosition = (id, x, y) => {
    if (y > maxPosY) {
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
      setSeats((oldSeats) => oldSeats.filter((e) => e.id !== id));
      onSeatsUpdated();
    });
  };

  const addNewTable = (x, y) => {
    if (y > maxPosY) {
      return;
    }

    TableService.addTable({
      width: 50,
      height: 50,
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
    console.log(tableToUpdate);
    TableService.updateTable(id, tableToUpdate)
      .then((updatedTable) => {
        setTables((oldTables) =>
          oldTables.map((oldTable) =>
            oldTable.id === id ? updatedTable : oldTable,
          ),
        );
      })
      .catch((e) => console.log(e.message));
  };

  const deleteTable = (id) => {
    TableService.deleteTable(id).then(() => {
      setTables((oldTables) => oldTables.filter((e) => e.id !== id));
    });
  };

  const isCollidingWithTrashCan = (e) => {
    const result = areColliding(e.target.getClientRect(), trashCanTransform);
    console.log(`Result: ${result}`);
    return result;
  };

  useEffect(() => {
    SeatService.getSeats().then((fetchedSeats) => setSeats(fetchedSeats));
    TableService.getTables().then((fetchedTables) => setTables(fetchedTables));
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
              onPositionUpdated={(x, y) => updateTablePosition(table.id, x, y)}
              onDimensionsUpdated={(x, y, width, height) =>
                updateTableDimensions(table.id, x, y, width, height)
              }
              isCollidingWithTrashCan={isCollidingWithTrashCan}
              onDelete={() => deleteTable(table.id)}
            />
          ))}
          <Rect
            x={0}
            y={maxPosY + 70}
            width={parentDimensions.width}
            height={5}
            fill={colorIron}
          />
          <SeatDragOn x={50} y={500} onDragEnd={addNewSeat} />
          <TableDragOn x={150} y={500} onDragEnd={addNewTable} />
          <TrashCan
            x={trashCanTransform.x}
            y={trashCanTransform.y}
            ref={trashCan}
          />
        </Layer>
      </Stage>
    </div>
  );
}
