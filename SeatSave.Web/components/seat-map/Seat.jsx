import React from 'react';
import { Rect } from 'react-konva';
import {
  colorDarkPastelBlue,
  colorDuskBlue,
  colorPastelRed,
  toNearestSnappingPoint,
} from '../../lib/seatMapHelper';

export default function Seat({
  x,
  y,
  isSelected,
  isActive,
  onPositionUpdated,
  onClick,
}) {
  return (
    <Rect
      draggable
      width={50}
      height={50}
      x={x}
      y={y}
      onDragEnd={(e) => {
        const newX = toNearestSnappingPoint(e.target.x(), 25);
        const newY = toNearestSnappingPoint(e.target.y(), 25);
        e.target.position({
          x: newX,
          y: newY,
        });
        onPositionUpdated(newX, newY);
      }}
      fill={isActive ? colorDarkPastelBlue : colorPastelRed}
      stroke={colorDuskBlue}
      strokeWidth={isSelected ? 2 : 0}
      onClick={onClick}
    />
  );
}
