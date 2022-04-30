import React, { useEffect, useState } from 'react';
import DaySelectionPanel from '../../components/librarian/manage-date-time/DaySelectionPanel';
import PeriodSelectionPanel from '../../components/librarian/manage-date-time/PeriodSelectionPanel';

export default function ManageDateTime() {
  async function getRegularDayAvailability(dayOfWeek) {
    const response = await fetch(
      `${process.env.API_URL}/Api/Availability/RegularDay/${dayOfWeek}`,
      {
        method: 'GET',
      },
    );
    const data = await response.json();
    console.log(data);
    return data;
  }

  async function getSpecificDayAvailability(isoDate) {
    const response = await fetch(
      `${process.env.API_URL}/Api/Availability/RegularDay/${isoDate}`,
      {
        method: 'GET',
      },
    );
    const data = await response.json();
    return data;
  }

  async function deleteSpecificDay(isoDate) {
    const response = await fetch(
      `${process.env.API_URL}/Api/Availability/SpecificDay/${isoDate}`,
      {
        method: 'DELETE',
      },
    );
    return response.ok;
  }

  async function updateRegularDayAvailability(dayOfWeek, availability) {
    const response = await fetch(
      `${process.env.API_URL}/Api/Availability/RegularDay/${dayOfWeek}`,
      {
        method: 'PUT',
        body: availability,
      },
    );

    return response.ok;
  }

  async function updateSpecificDayAvailability(isoDate, availability) {
    const response = await fetch(
      `${process.env.API_URL}/Api/Availability/SpecificDay/${isoDate}`,
      {
        method: 'PUT',
        body: availability,
      },
    );
    return response.ok;
  }

  const [availabilityType, setAvailabilityType] = useState('RegularHours');
  const [selectedId, setSelectedId] = useState();
  const [selectedPeriods, setSelectedPeriods] = useState();

  useEffect(() => {
    const fetchData = async () => {
      // setPageState((oldState) => ({
      //   ...oldState,
      //   overrideDayItems: getSpecificDays(),
      //   periods: getAllPeriods().reduce((object, period)=>{...object, [period]: false})
      // }));
    };
    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedId === '') return;

      let periods = null;
      if (availabilityType === 'RegularHours') {
        periods = await getRegularDayAvailability(selectedId);
      } else if (availabilityType === 'OverrideDays') {
        periods = await getSpecificDayAvailability(selectedId);
      }
      setSelectedPeriods(periods);
    };
    fetchData().catch(console.error);
  }, [selectedId]);

  return (
    <div className='page-container-small'>
      <h1 className='mb-6'>Manage Date & Time</h1>
      <div className='grid grid-cols-3 gap-x-7 min-h-[500px]'>
        <DaySelectionPanel
          dayType={availabilityType}
          selectedId={selectedId}
          onTabSelected={setAvailabilityType}
          onItemSelected={setSelectedId}
        />
        {selectedId && (
          <PeriodSelectionPanel
            className='col-span-2'
            selectedPeriods={selectedPeriods}
          />
        )}
      </div>
    </div>
  );
}

ManageDateTime.page = 'ManageDateTime';
