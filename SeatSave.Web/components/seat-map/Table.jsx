import React, { useEffect, useRef } from 'react';
import { Rect, Transformer } from 'react-konva';
import {
  colorAlmond,
  colorRodeoDust,
  gridSize,
  toNearestSnappingPoint,
} from '../../lib/seatMapHelper';

export default function Table({
  x,
  y,
  width,
  height,
  isSelected,
  isCollidingWithTrashCan,
  onSelected,
  onPositionUpdated,
  isValidPosition,
  onDimensionsUpdated,
  onDelete,
}) {
  const transformRef = useRef();
  const shapeRef = useRef();

  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      transformRef.current.nodes([shapeRef.current]);
      transformRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Rect
        ref={shapeRef}
        draggable
        onClick={onSelected}
        onTap={onSelected}
        width={width}
        height={height}
        x={x}
        y={y}
        fill={isSelected ? colorRodeoDust : colorAlmond}
        onDragEnd={(e) => {
          const newX = toNearestSnappingPoint(e.target.x(), gridSize);
          const newY = toNearestSnappingPoint(e.target.y(), gridSize);
          e.target.position({
            x: newX,
            y: newY,
          });

          if (isCollidingWithTrashCan(e)) {
            onDelete();
            return;
          }

          if (!isValidPosition(e.target.getClientRect())) {
            e.target.to({ x, y });
            return;
          }

          onPositionUpdated(newX, newY);
        }}
        onTransformEnd={(e) => {
          const node = e.target;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          node.scaleX(1);
          node.scaleY(1);
          const newWidth = Math.max(gridSize, node.width() * scaleX);
          const newHeight = Math.max(gridSize, node.height() * scaleY);
          onDimensionsUpdated(node.x(), node.y(), newWidth, newHeight);
        }}
      />
      {isSelected && (
        <Transformer
          rotateEnabled={false}
          ref={transformRef}
          boundBoxFunc={(oldBox, newBox) => {
            const snapBox = { ...newBox };
            snapBox.width = toNearestSnappingPoint(snapBox.width, gridSize);
            snapBox.height = toNearestSnappingPoint(snapBox.height, gridSize);
            snapBox.x = toNearestSnappingPoint(snapBox.x, gridSize);
            snapBox.y = toNearestSnappingPoint(snapBox.y, gridSize);

            return snapBox;
          }}
        />
      )}
    </>
  );
}
