import React from 'react';

export default function GenerateReports() {
  return (
    <div className='page-container'>
      <h1>Generate Reports</h1>
      <h4 className='mt-8'>Visitor Data</h4>

      <div className='flex flex-col items-end justify-between mt-4 lg:flex-row'>
        <div className='lg:order-last'>
          <button type='button' className='button w-[304px]'>
            Download All Reports
          </button>
        </div>
        <div className='flex flex-col gap-5 mt-6 lg:flex-row lg:mt-0'>
          <label htmlFor='fromDate' className='flex flex-col w-[304px]'>
            From
            <input id='fromDate' name='fromDate' type='date' />
          </label>
          <label htmlFor='toDate' className='flex flex-col w-[304px]'>
            To
            <input id='toDate' name='toDate' type='date' />
          </label>
        </div>
      </div>
    </div>
  );
}

GenerateReports.page = 'Generate Reports'