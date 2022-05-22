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
        <label htmlFor='selectChart' className='flex flex-col w-[304px]'>
          Chart
          <select id='selectChart' name='selectChart' onChange={changeConditions}>
            <option value={0}>All</option>
            <option value={1}>Top Departments</option>
            <option value={2}>Top Programs/Strands</option>
            <option value={3}>Top Year Levels</option>
            <option value={4}>Top Programs/Strands and Year Levels</option>
          </select>
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
