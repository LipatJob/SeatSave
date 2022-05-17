import React, { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Rect, Group } from 'react-konva';
import {
  areColliding,
  colorPearlBrush,
  seatMapHeight,
  seatMapWidth,
  standardSize,
} from '../../lib/seatMapHelper';
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
  const [editableAreaOffset, setEditableAreaOffset] = useState({ x: 0, y: 0 });
  const [parentDimensions, setParentDimensions] = useState({
    width: 0,
    height: 0,
  });
  const parentDiv = useRef(null);
  const stage = useRef();

  const maxPosX = parentDimensions.width;
  const maxPosY = seatMapHeight;

  const trashCanTransform = {
    x: maxPosX - 100,
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
      positionY: Math.round(y),
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
      positionY: Math.round(y),
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
      positionX: Math.round(x),
      positionY: Math.round(y),
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
      positionX: Math.round(x),
      positionY: Math.round(y),
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
      positionX: Math.round(x),
      positionY: Math.round(y),
      width: Math.round(width),
      height: Math.round(height),
    };
    setTables((oldTables) =>
      oldTables.map((oldTable) =>
        oldTable.id === id ? tableToUpdate : oldTable,
      ),
    );

    TableService.updateTable(id, tableToUpdate).then(() => {});
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
    box.x + box.width < seatMapWidth &&
    box.y + box.height < seatMapHeight;

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
        height={seatMapHeight + 100}
        ref={stage}
        onClick={(e) => {
          if (e.target === stage.current) {
            setSelectedTable(null);
            setSelectedSeatId(null);
          }
        }}
      >
        <Layer>
          <Group
            draggable
            onDragEnd={(e) => {
              setEditableAreaOffset({ x: e.target.x(), y: e.target.y() });
            }}
          >
            <Rect
              width={seatMapWidth}
              height={seatMapHeight}
              stroke={colorPearlBrush}
              strokeWidth={2}
            />
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
                onPositionUpdated={(x, y) =>
                  updateTablePosition(table.id, x, y)
                }
                onDimensionsUpdated={(x, y, width, height) =>
                  updateTableDimensions(table.id, x, y, width, height)
                }
                isCollidingWithTrashCan={isCollidingWithTrashCan}
                onDelete={() => deleteTable(table.id)}
              />
            ))}
          </Group>
        </Layer>

        <Layer>
          <Group>
            <Rect
              x={0}
              y={maxPosY}
              width={parentDimensions && parentDimensions.width}
              height={100}
              fill='white'
            />
            <Rect
              x={0}
              y={maxPosY}
              width={parentDimensions && parentDimensions.width}
              height={5}
              fill={colorPearlBrush}
            />
            <SeatDragOn
              x={50}
              y={maxPosY + 20}
              onDragEnd={(x, y) =>
                addNewSeat(x - editableAreaOffset.x, y - editableAreaOffset.y)
              }
            />
            <TableDragOn
              x={150}
              y={maxPosY + 20}
              onDragEnd={(x, y) =>
                addNewTable(x - editableAreaOffset.x, y - editableAreaOffset.y)
              }
            />
            <TrashCan x={trashCanTransform.x} y={maxPosY + 20} />
          </Group>
        </Layer>
      </Stage>
    </div>
  );
}
