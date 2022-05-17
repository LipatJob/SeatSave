import React from 'react';
import { toIsoDate } from '../../../lib/DateHelper';

export default function ReportDataConditions({ handleChangeDate }) {
  return (
    <div className='flex flex-col gap-5 mt-6 lg:flex-row lg:mt-0'>
      <label htmlFor='fromDate' className='flex flex-col w-[304px]'>
        From
        <input
          id='fromDate'
          name='fromDate'
          type='date'
          max={toIsoDate(new Date())}
          onChange={handleChangeDate}
        />
      </label>
      <label htmlFor='toDate' className='flex flex-col w-[304px]'>
        To
        <input
          id='toDate'
          name='toDate'
          type='date'
          max={toIsoDate(new Date())}
          onChange={handleChangeDate}
        />
      </label>
    </div>
  );
}
