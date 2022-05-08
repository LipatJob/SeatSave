import React from 'react';
import { Rect } from 'react-konva';
import {
  colorDarkPastelBlue,
  toNearestSnappingPoint,
} from '../../lib/seatMapHelper';

export default function SeatDragOn({ x, y, onDragEnd }) {
  return (
    <Rect
      draggable
      width={50}
      height={50}
      x={x}
      y={y}
      onDragEnd={(e) => {
        console.log(`${e.target.x()} ${e.target.y()}`);
        const newX = toNearestSnappingPoint(e.target.x(), 25);
        const newY = toNearestSnappingPoint(e.target.y(), 25);
        onDragEnd(newX, newY);
        e.target.to({
          x,
          y,
        });
      }}
      fill={colorDarkPastelBlue}
    />
  );
}
