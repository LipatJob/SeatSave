import React, { useEffect, useRef, useState } from 'react';
import { Stage, Layer } from 'react-konva';
import moment from 'moment';
import TableService from '../../services/TableService';
import ViewSeat from './ViewSeat';
import Table from './Table';
import { seatMapHeight } from '../../lib/seatMapHelper';

export default function ViewSeatMap({ id, date, time }) {
  const selectedSeatId = id;
  const [seats, setSeats] = useState([]);
  const updateSeats = async () => {
    const res = await fetch(`${process.env.API_URL}/Api/Seats`);
    if (!res.ok) {
      console.log('There was an error');
      return;
    }
    const data = await res.json();
    setSeats(data);
  };
  useEffect(() => {
    updateSeats();
  }, []);
  const [tables, setTables] = useState([]);
  const [parentDimensions, setParentDimensions] = useState({
    width: 0,
    height: 0,
  });
  const parentDiv = useRef(null);
  const stage = useRef();
  const maxPosX = parentDimensions.width;
  const maxPosY = 500;

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

  const seatIdBooked = [];
  const [allBookings, setAllBookings] = useState(null);
  const getBookings = async () => {
    const response = await fetch(`${process.env.API_URL}/Api/Booking`);
    const bookingData = await response.json();
    setAllBookings(bookingData);
  };
  if (allBookings !== null) {
    allBookings.forEach((element) => {
      if (
        element.bookingDate === moment(date).format('YYYY-MM-DD') &&
        element.period.timeStart === time &&
        element.seat.active === true
      ) {
        seatIdBooked.push(element.seatId);
      }
    });
  }
  useEffect(() => {
    getBookings();
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
            <ViewSeat
              id={seat.id}
              key={seat.id}
              x={seat.positionX}
              y={seat.positionY}
              isValidPosition={isValidPosition}
              isSelected={seat.id === selectedSeatId}
              isActive={seat.active}
              seatBooked={seatIdBooked}
            />
          ))}

          {tables.map((table) => (
            <Table
              key={table.id}
              x={table.positionX}
              y={table.positionY}
              width={table.width}
              height={table.height}
              isValidPosition={isValidPosition}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}
