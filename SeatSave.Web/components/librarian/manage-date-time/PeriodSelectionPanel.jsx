import React, { useEffect, useState } from 'react';
import { GrClose } from 'react-icons/gr';
import { formatDate, formatTime } from '../../../lib/DateHelper';
import OkModal from '../../common/OkModal';

export default function PeriodSelectionPanel({
  className,
  selectedId,
  availabilityType,
  onClose,
}) {
  const [successModalVisible, setSuccessModalVisible] = useState(false);
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
      setSuccessModalVisible(true);
    }
  };

  useEffect(() => {
    if (selectedId !== null) {
      initializePeriods();
    }
  }, [selectedId]);

  return (
    <div className={`flex flex-col w-full shadow-lg ${className}`}>
      <div className='flex flex-row items-center h-16 p-4 bg-pearl-bush'>
        <h4>
          Periods for{' '}
          {availabilityType === 'RegularHours'
            ? selectedId
            : formatDate(selectedId)}
        </h4>
        <button type='button' onClick={onClose} className='ml-auto'>
          <GrClose className='mx-auto my-auto' />
        </button>
      </div>
      <div className='flex flex-col items-center justify-center h-full p-10'>
        <div className='grid w-full max-w-[628px] grid-cols-1 mb-4 sm:grid-cols-2 gap-y-4'>
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
        <button className='px-8 mt-8 button' type='button' onClick={onSave}>
          SAVE
        </button>
      </div>

      {successModalVisible && (
        <OkModal
          message={`Periods for ${selectedId} successfully updated`}
          onClose={() => setSuccessModalVisible(false)}
          onOk={() => setSuccessModalVisible(false)}
        />
      )}
    </div>
  );
}
