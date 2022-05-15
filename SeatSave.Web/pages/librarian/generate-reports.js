import React from 'react';
import ReportSection from '../../components/librarian/generate-reports/ReportSection';

const DEPARTMENTS_NAME = 'Departments';
const PROGRAMS_NAME = 'Programs/Strands';
const YEARS_NAME = 'Year Levels';
const PROGRAMS_YEARS_NAME = 'Programs/Strands and Year Levels';

// dummy data
const departmentsData = {
  categories: ['MITL', 'CCIS', 'CAS', 'SHS', 'ETYCB'],
  series: [{ name: 'Student count', data: [66, 46, 34, 33, 23] }],
};
const programsData = {
  categories: ['CHE', 'CE', 'AR', 'CS', 'COMM'],
  series: [{ name: 'Student count', data: [32, 22, 21, 20, 16] }],
};
const yearsData = {
  categories: [3, 4, 2, 1, 12],
  series: [{ name: 'Student count', data: [30, 19, 18, 17, 10] }],
};
const programsYearsData = {
  categories: ['CHE - 3', 'CHE - 2', 'AR - 4', 'CS - 4', 'COMM - 2'],
  series: [{ name: 'Student count', data: [22, 20, 16, 15, 9] }],
};

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

      <div className='lg:mt-16'>
        <div className='flex flex-col w-full gap-5 lg:flex-row'>
          <div className='mt-16 basis-1/2 lg:mt-0'>
            <ReportSection name={DEPARTMENTS_NAME} data={departmentsData} />
          </div>
          <div className='mt-16 basis-1/2 lg:mt-0'>
            <ReportSection name={PROGRAMS_NAME} data={programsData} />
          </div>
        </div>
        <div className='flex flex-col w-full gap-5 lg:mt-8 lg:flex-row'>
          <div className='mt-16 basis-1/2 lg:mt-0'>
            <ReportSection name={YEARS_NAME} data={yearsData} />
          </div>
          <div className='mt-16 basis-1/2 lg:mt-0'>
            <ReportSection
              name={PROGRAMS_YEARS_NAME}
              data={programsYearsData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

GenerateReports.page = 'Generate Reports';
