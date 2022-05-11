import React from 'react';
import { Image } from 'react-konva';
import useImage from 'use-image';

export default function TrashCan({ x, y, ref }) {
  const [image] = useImage('../TrashCan.svg');

  return <Image image={image} width={50} height={50} x={x} y={y} ref={ref} />;
}
