import React, { useRef, useState } from 'react';
import { Group, Rect, Text } from 'react-konva';
import {
  colorDarkPastelBlue,
  colorDawn,
  colorDuskBlue,
  colorPastelRed,
  gridSize,
  standardSize,
  toNearestSnappingPoint,
} from '../../lib/seatMapHelper';

export default function Seat({
  id,
  x,
  y,
  isSelected,
  isActive,
  isCollidingWithTrashCan,
  onPositionUpdated,
  isValidPosition,
  onClick,
  onDelete,
}) {
  const popUpRef = useRef();
  const seatRectRef = useRef();
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  function snapToGrid(e) {
    const newX = toNearestSnappingPoint(e.target.x(), gridSize);
    const newY = toNearestSnappingPoint(e.target.y(), gridSize);
    e.target.position({
      x: newX,
      y: newY,
    });

    onPositionUpdated(newX, newY);
  }

  return (
    <>
      <Rect
        draggable
        width={standardSize}
        height={standardSize}
        x={x}
        y={y}
        ref={seatRectRef}
        fill={isActive ? colorDarkPastelBlue : colorPastelRed}
        stroke={colorDuskBlue}
        strokeWidth={isSelected ? 3 : 0}
        onClick={onClick}
        onTap={onClick}
        onMouseOver={() => {
          setIsHovering(true);
        }}
        onMouseLeave={() => {
          setIsHovering(false);
        }}
        onDragStart={() => {
          setIsDragging(true);
        }}
        onDragEnd={(e) => {
          if (isCollidingWithTrashCan(e)) {
            onDelete();
            return;
          }
          if (!isValidPosition(e.target.getClientRect())) {
            e.target.to({ x, y });
            return;
          }
          snapToGrid(e);
          setIsDragging(false);
        }}
      />

      {isHovering && !isDragging && (
        <Group
          x={seatRectRef.current.x() - standardSize / 2}
          y={seatRectRef.current.y() - 60}
          ref={popUpRef}
        >
          <Rect
            width={standardSize * 2}
            height={standardSize}
            fill={colorDawn}
          />
          <Text
            align='center'
            verticalAlign='middle'
            text={id}
            fontSize={20}
            width={standardSize * 2}
            height={standardSize}
            strokeWidth={1}
          />
        </Group>
      )}
    </>
  );
}
