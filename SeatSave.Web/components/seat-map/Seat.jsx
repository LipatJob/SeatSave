import React, { useEffect, useRef, useState } from 'react';
import { Group, Rect, RegularPolygon, Text } from 'react-konva';
import {
  colorDawn,
  colorDuskBlue,
  colorIron,
  colorLightBlueGrey,
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

  const strokeGap = 4;
  useEffect(() => {
    if (popUpRef && isHovering && !isDragging) {
      popUpRef.current.moveToTop();
    }
  }, [isHovering, isDragging]);

  return (
    <>
      <Group
        draggable
        ref={seatRectRef}
        x={x}
        y={y}
        onClick={(e) => {
          onClick(e);
          e.target.moveToTop();
        }}
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
        onDragMove={(e) => {
          e.target.moveToTop();
        }}
        onDragEnd={(e) => {
          if (isCollidingWithTrashCan(e)) {
            onDelete();
            return;
          }
          const rect = {
            x: e.target.x(),
            y: e.target.y(),
            width: e.target.getClientRect().width,
            height: e.target.getClientRect().height,
          };
          if (!isValidPosition(rect)) {
            e.target.to({ x, y });
            return;
          }
          snapToGrid(e);
          setIsDragging(false);
        }}
      >
        <Rect
          width={standardSize}
          height={standardSize}
          fill={isActive ? colorIron : colorDawn}
        />

        {isSelected && (
          <Rect
            width={standardSize + strokeGap * 2}
            height={standardSize + strokeGap * 2}
            x={-strokeGap}
            y={-strokeGap}
            stroke={colorDuskBlue}
            strokeWidth={2.5}
          />
        )}
      </Group>

      {isHovering && !isDragging && (
        <Group
          x={seatRectRef.current.x() - standardSize / 2}
          y={seatRectRef.current.y() - 60}
          ref={popUpRef}
        >
          <Rect
            width={standardSize * 2}
            height={standardSize}
            fill={colorLightBlueGrey}
          />

          <Text
            align='center'
            verticalAlign='middle'
            text={id}
            fontSize={18}
            width={standardSize * 2}
            height={standardSize}
            strokeWidth={1}
          />
          <RegularPolygon
            x={standardSize}
            y={standardSize}
            fill={colorLightBlueGrey}
            sides={3}
            radius={standardSize / 2}
            rotation={180}
          />
        </Group>
      )}
    </>
  );
}
