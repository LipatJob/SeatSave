import React, { useEffect, useRef } from 'react';
import { Rect, Transformer } from 'react-konva';
import {
  colorDawn,
  colorIron,
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
        fill={isSelected ? colorDawn : colorIron}
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

          onPositionUpdated(newX, newY);
        }}
        onTransformEnd={() => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
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
