import React from 'react';
import ReportChart from './ReportChart';

export default function ReportSection({ name, data }) {
  return (
    <div>
      <h4>Top {name} of Student Visitors</h4>
      <div className='flex flex-col items-end mt-2'>
        <label htmlFor='uniqueCount' className='flex flex-row items-center'>
          <input id='uniqueCount' name='uniqueCount' type='checkbox' />
          <p className='ml-2'>Count each visitor once</p>
        </label>
        <ReportChart data={data} />
      </div>
    </div>
  );
}
