import React, { useEffect, useState } from 'react';
import { formatDate, formatTime } from '../../../lib/DateHelper';

export default function PeriodSelectionPanel({
  className,
  selectedId,
  availabilityType,
}) {
  const [periods, setPeriods] = useState([]);
  const [periodStates, setPeriodStates] = useState({});

  async function getAllPeriods() {
    const response = await fetch(
      `${process.env.API_URL}/Api/Schedule/Periods`,
      {
        method: 'GET',
      },
    );
    const data = await response.json();
    return data;
  }

  async function getSelectedPeriods() {
    const type =
      availabilityType === 'RegularHours' ? 'RegularDay' : 'SpecificDay';
    const response = await fetch(
      `${process.env.API_URL}/Api/Availability/${type}/${selectedId}/Periods`,
    );
    const data = await response.json();
    return data;
  }

  const updatePeriodState = (key, value) => {
    setPeriodStates({ ...periodStates, [key]: value });
  };

  async function initializePeriods() {
    const allPeriods = await getAllPeriods();
    setPeriods(allPeriods);

    const selectedPeriods = await getSelectedPeriods();
    const period = allPeriods
      .map((e) => e.id)
      .reduce((o, key) => ({ ...o, [key]: false }));
    selectedPeriods.forEach((item) => {
      period[item.id] = true;
    });
    console.log(period);
    setPeriodStates(period);
  }

  const onSave = async () => {
    const content = Object.entries(periodStates)
      .filter(([, value]) => value)
      .map(([key]) => ({ id: key }));
    console.log('Submitting');
    console.log(content);
    const type =
      availabilityType === 'RegularHours' ? 'RegularDay' : 'SpecificDay';
    const response = await fetch(
      `${process.env.API_URL}/Api/Availability/${type}/${selectedId}/Periods`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content),
      },
    );

    if (response.ok) {
      console.log('Success!');
    }
  };

  useEffect(() => {
    if (selectedId !== null) {
      initializePeriods();
    }
  }, [selectedId]);

  return (
    <div className={`flex flex-col w-full shadow ${className}`}>
      <div className='h-16 p-4 bg-pearl-bush'>
        <h4>
          Select Periods for{' '}
          {availabilityType === 'RegularHours'
            ? selectedId
            : formatDate(selectedId)}
        </h4>
      </div>
      <div className='flex flex-col items-center p-10'>
        <div className='grid w-full grid-cols-2 mb-4 gap-y-4'>
          {periods.map(({ id, timeStart, timeEnd }) => (
            <label
              htmlFor={id}
              className='flex flex-row items-center gap-4'
              key={id}
            >
              <input
                id={id}
                name={id}
                type='checkbox'
                className='w-5 h-5 checkbox'
                onChange={(e) => updatePeriodState(id, e.target.checked)}
                checked={periodStates[id]}
              />
              {`${formatTime(timeStart)} to ${formatTime(timeEnd)}`}
            </label>
          ))}
        </div>
        <button className='px-8 mt-4 button' type='button' onClick={onSave}>
          SAVE
        </button>
      </div>
    </div>
  );
}
