import React from 'react';
import { toIsoDate } from '../../../lib/DateHelper';

export default function ReportDataConditions({ changeConditions }) {
  return (
    <div>
      <div className='flex flex-col gap-5 mt-6 lg:flex-row lg:mt-0'>
        <label htmlFor='fromDate' className='flex flex-col w-[304px]'>
          From
          <input
            id='fromDate'
            name='fromDate'
            type='date'
            max={toIsoDate(new Date())}
            onChange={changeConditions}
          />
        </label>
        <label htmlFor='toDate' className='flex flex-col w-[304px]'>
          To
          <input
            id='toDate'
            name='toDate'
            type='date'
            max={toIsoDate(new Date())}
            onChange={changeConditions}
          />
        </label>
      </div>
      <label htmlFor='uniqueCount' className='flex flex-row items-center mt-4'>
        <input
          id='uniqueCount'
          name='uniqueCount'
          type='checkbox'
          onChange={changeConditions}
        />
        <p className='ml-2'>Count each visitor once</p>
      </label>
    </div>
  );
}
