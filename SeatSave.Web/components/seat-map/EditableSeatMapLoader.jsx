import React from 'react';
import dynamic from 'next/dynamic';

export default function EditableSeatMapLoader() {
  const SeatMapComponent = dynamic(() => import('./EditableSeatMap'), {
    ssr: false,
  });
  return <SeatMapComponent />;
}
