import React from 'react';
import { Rect } from 'react-konva';
import { colorRodeoDust } from '../../lib/seatMapHelper';

export default function Table({ x, y, width, height }) {
  return (
    <Rect width={width} height={height} x={x} y={y} fill={colorRodeoDust} />
  );
}
