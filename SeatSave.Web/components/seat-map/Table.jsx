import React, { useEffect, useRef } from 'react';
import { Rect, Transformer } from 'react-konva';

export default function Table({
  x,
  y,
  width,
  height,
  isSelected,
  onSelected,
  onPositionUpdated,
  onDimensionsUpdated,
}) {
  const transformRef = useRef();
  const shapeRef = useRef();
  const gridSize = 25;

  const toNearestSnappingPoint = (value, snappingValue) =>
    Math.round(value / snappingValue) * snappingValue;

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
        width={width}
        height={height}
        x={x}
        y={y}
        fill={isSelected ? 'darkgray' : 'gray'}
        onDragEnd={(e) => {
          const newX = Math.round(e.target.x() / gridSize) * gridSize;
          const newY = Math.round(e.target.y() / gridSize) * gridSize;
          e.target.position({
            x: newX,
            y: newY,
          });
          onPositionUpdated(newX, newY);
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);

          const newWidth = Math.max(5, node.width() * scaleX);
          const newHeight = Math.max(node.height() * scaleY);
          onDimensionsUpdated(node.x(), node.y(), newWidth, newHeight);
        }}
      />
      {isSelected && (
        <Transformer
          rotateEnabled={false}
          ref={transformRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < gridSize || newBox.height < gridSize) {
              return oldBox;
            }

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
