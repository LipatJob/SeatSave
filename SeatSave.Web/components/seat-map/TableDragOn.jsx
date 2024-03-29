import React from 'react';
import { Rect, Text } from 'react-konva';
import {
  colorAlmond,
  gridSize,
  standardSize,
  toNearestSnappingPoint,
} from '../../lib/seatMapHelper';

export default function TableDragOn({ x, y, onDragEnd }) {
  const width = standardSize;
  const height = standardSize;
  return (
    <>
      <Rect
        draggable
        width={width}
        height={height}
        x={x}
        y={y}
        onDragEnd={(e) => {
          console.log(`${e.target.x()} ${e.target.y()}`);
          const newX = toNearestSnappingPoint(e.target.x(), gridSize);
          const newY = toNearestSnappingPoint(e.target.y(), gridSize);
          onDragEnd(newX, newY);
          e.target.to({
            x,
            y,
          });
        }}
        fill={colorAlmond}
      />
      <Text
        text='Table'
        x={x}
        y={y + height + 10}
        fontSize={16}
        width={width}
        height={height}
        align='center'
      />
    </>
  );
}
