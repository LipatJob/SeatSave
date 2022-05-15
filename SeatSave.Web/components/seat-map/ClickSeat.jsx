import React, { useRef, useState } from 'react';
import { Group, Rect, RegularPolygon, Text } from 'react-konva';
import {
  colorDawn,
  colorDuskBlue,
  colorIron,
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

  function fillColor(active, bookedSeats, seatId) {
    let color = '';
    if (bookedSeats === null) {
      if (active) color = colorIron;
      else color = colorDawn;
    }
    if (bookedSeats !== null) {
      if (active) {
        if (Object.values(bookedSeats).indexOf(seatId) > -1) {
          color = colorValentineRed;
        } else color = colorMediumForestGreed;
      } else color = colorDawn;
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
          fill={fillColor(isActive, seatBooked, id)}
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
