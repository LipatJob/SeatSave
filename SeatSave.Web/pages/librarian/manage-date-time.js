import React from 'react';
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
    const data = response.json();
    return data;
  }

  async function getRegularDayAvailability(dayOfWeek) {
    const response = await fetch(
      `${process.env.API_URL}/Api/Availability/RegularDay/${dayOfWeek}`,
      {
        method: 'GET',
      },
    );
    const data = response.json();
    return data;
  }

  async function getSpecificDayAvailability(isoDate) {
    const response = await fetch(
      `${process.env.API_URL}/Api/Availability/RegularDay/${isoDate}`,
      {
        method: 'GET',
      },
    );
    const data = response.json();
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

  return (
    <div className='page-container-small'>
      <h1 className='mb-6'>Manage Date and Time</h1>
      <div className='grid grid-cols-3 gap-x-7'>
        <AvailabilitySelectionPanel />
        <PeriodSelectionPanel className='col-span-2' />
      </div>
    </div>
  );
}

ManageDateTime.page = 'ManageDateTime';
