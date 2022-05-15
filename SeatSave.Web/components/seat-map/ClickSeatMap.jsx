import React, { useEffect, useRef, useState } from 'react';
import { Stage, Layer } from 'react-konva';
import moment from 'moment';
import TableService from '../../services/TableService';
import ClickSeat from './ClickSeat';
import Table from './Table';
import { seatMapHeight } from '../../lib/seatMapHelper';
import SeatService from '../../services/SeatService';
import { toIsoDate } from '../../lib/DateHelper';

export default function ClickSeatMap({ id, date, period, setSeatId, seatId }) {
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
  return (
    <div className='w-full' ref={parentDiv}>
      <Stage
        width={parentDimensions && parentDimensions.width}
        height={seatMapHeight}
        ref={stage}
      >
        <Layer>
          {seats.map((seat) => (
            <ClickSeat
              id={seat.id}
              key={seat.id}
              x={seat.positionX}
              y={seat.positionY}
              isSelected={seat.id === seatId}
              isActive={seat.active}
              seatBooked={!seat.bookable}
              onClick={() => setSeatId(seat.id)}
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
        </Layer>
      </Stage>
    </div>
  );
}
