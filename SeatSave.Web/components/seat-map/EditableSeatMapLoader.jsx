import React from 'react';
import dynamic from 'next/dynamic';

export default function EditableSeatMapLoader({
  selectedSeatId,
  setSelectedSeatId,
  onSubmit,
  onSeatsUpdated,
}) {
  const EditableSeatMap = dynamic(() => import('./EditableSeatMap'), {
    ssr: false,
  });
  return (
    <EditableSeatMap
      selectedSeatId={selectedSeatId}
      setSelectedSeatId={setSelectedSeatId}
      onSubmit={onSubmit}
      onSeatsUpdated={onSeatsUpdated}
    />
  );
}
