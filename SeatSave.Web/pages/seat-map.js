import React from 'react';
import dynamic from 'next/dynamic';

const Smap = dynamic(() => import('../components/seat-map/SeatMap'), {
  ssr: false,
});

export default function SeatMap() {
  return <Smap />;
}
