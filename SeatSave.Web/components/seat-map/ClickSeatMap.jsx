import React, { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Group, Rect } from 'react-konva';
import TableService from '../../services/TableService';
import ClickSeat from './ClickSeat';
import Table from './Table';
import {
  colorPearlBrush,
  seatMapHeight,
  seatMapWidth,
} from '../../lib/seatMapHelper';
import SeatService from '../../services/SeatService';
import { toIsoDate } from '../../lib/DateHelper';

export default function ClickSeatMap({
  date,
  period,
  setSeatId,
  seatId,
  viewDetails,
  closeDetails,
  clickable,
}) {
  const [seats, setSeats] = useState([]);
  const [tables, setTables] = useState([]);
  const [parentDimensions, setParentDimensions] = useState({
    width: 0,
    height: 0,
  });
  const parentDiv = useRef(null);
  const stage = useRef();

  const updateSeats = async () => {
    const allSeats = await SeatService.getSeats();
    const availableSeats = await SeatService.getAvailableSeats(
      toIsoDate(date),
      period,
    );
    const availableSeatIds = new Set(availableSeats.map((e) => e.id));
    const seatsWithAvailability = allSeats.map((e) => ({
      ...e,
      bookable: availableSeatIds.has(e.id),
    }));
    console.log(seatsWithAvailability);

    setSeats(seatsWithAvailability);
  };

  useEffect(() => {
    updateSeats();
  }, [date, period]);

  useEffect(() => {
    updateSeats();
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

  function seatClicked(x) {
    if (!clickable) {
      viewDetails(x);
      if (x.bookable) setSeatId(x.id);
      else setSeatId(null);
    }
    if (clickable) {
      closeDetails();
      if (x.bookable || !x.active) setSeatId(null);
      else {
        setSeatId(x.id);
        viewDetails(x);
      }
    }
  }

  return (
    <div className='w-full' ref={parentDiv}>
      <Stage
        width={parentDimensions && parentDimensions.width}
        height={seatMapHeight}
        ref={stage}
      >
        <Layer>
          <Group draggable>
            <Rect
              width={seatMapWidth}
              height={seatMapHeight}
              stroke={colorPearlBrush}
              strokeWidth={2}
            />
            {seats.map((seat) => (
              <ClickSeat
                id={seat.id}
                key={seat.id}
                x={seat.positionX}
                y={seat.positionY}
                isSelected={seat.id === seatId}
                isActive={seat.active}
                seatBooked={!seat.bookable}
                onClick={() => seatClicked(seat)}
              />
            ))}

            {tables.map((table) => (
              <Table
                key={table.id}
                x={table.positionX}
                y={table.positionY}
                width={table.width}
                height={table.height}
              />
            ))}
          </Group>
        </Layer>
      </Stage>
    </div>
  );
}
