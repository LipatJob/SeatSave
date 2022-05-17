import React, { useRef, useState } from 'react';
import { Group, Rect, RegularPolygon, Text } from 'react-konva';
import {
  colorDawn,
  colorDuskBlue,
  colorLightBlueGrey,
  colorValentineRed,
  colorMediumForestGreed,
  standardSize,
} from '../../lib/seatMapHelper';

export default function ClickSeat({
  id,
  x,
  y,
  isSelected,
  isActive,
  seatBooked,
  onClick,
}) {
  const popUpRef = useRef();
  const seatRectRef = useRef();
  const [isHovering, setIsHovering] = useState(false);
  const strokeGap = 4;

  function fillColor(active, booked) {
    let color = '';
    if (active) {
      if (booked) {
        color = colorValentineRed;
      } else {
        color = colorMediumForestGreed;
      }
    } else {
      color = colorDawn;
    }
    return color;
  }

  return (
    <>
      <Group
        ref={seatRectRef}
        x={x}
        y={y}
        onClick={onClick}
        onTap={onClick}
        onMouseOver={() => {
          setIsHovering(true);
          popUpRef.current.moveToTop();
        }}
        onMouseLeave={() => {
          setIsHovering(false);
        }}
      >
        <Rect
          width={standardSize}
          height={standardSize}
          fill={fillColor(isActive, seatBooked)}
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

      {isHovering && (
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
