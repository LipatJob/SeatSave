import React, { useEffect, useState } from 'react';
import AvailabilitySelectionPanel from '../../components/librarian/manage-date-time/AvailabilitySelectionPanel';
import PeriodSelectionPanel from '../../components/librarian/manage-date-time/PeriodSelectionPanel';

export default function ManageDateTime() {
  async function getSpecificDays() {
    const response = await fetch(
      `${process.env.API_URL}/Api/Availability/SpecificDay`,
      {
        method: 'GET',
      },
    );
    const data = await response.json();
    return data;
  }

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

  const [pageState, setPageState] = useState({
    availabilityType: 'RegularHours',
    selectedId: '',
    selectedPeriods: [],
    overrideDayItems: [
      {
        id: '2022-01-02',
        name: 'January 01, 2022',
      },
    ],
    allPeriods: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      // setPageState((oldState) => ({
      //   ...oldState,
      //   overrideDayItems: getSpecificDays(),
      //   allPeriods: getAllPeriods()
      // }));
    };
    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (pageState.selectedId === '') return;

      let selectedPeriods = null;
      if (pageState.availabilityType === 'RegularHours') {
        selectedPeriods = await getRegularDayAvailability(pageState.selectedId);
      } else if (pageState.availabilityType === 'OverrideDays') {
        selectedPeriods = await getSpecificDayAvailability(
          pageState.selectedId,
        );
      }

      setPageState((oldState) => ({ ...oldState, selectedPeriods }));
    };
    fetchData().catch(console.error);
  }, [pageState.selectedId]);

  return (
    <div className='page-container-small'>
      <h1 className='mb-6'>Manage Date & Time</h1>
      <div className='grid grid-cols-3 gap-x-7 min-h-[500px]'>
        <AvailabilitySelectionPanel
          pageState={pageState}
          setPageState={setPageState}
        />
        {pageState.selectedId && (
          <PeriodSelectionPanel className='col-span-2' />
        )}
      </div>
    </div>
  );
}

ManageDateTime.page = 'ManageDateTime';
