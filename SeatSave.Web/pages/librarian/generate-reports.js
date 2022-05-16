import React, { useState } from 'react';
import ReportSection from '../../components/librarian/generate-reports/ReportSection';

const DEPARTMENTS_NAME = 'Departments';
const PROGRAMS_NAME = 'Programs/Strands';
const YEARS_NAME = 'Year Levels';
const PROGRAMS_YEARS_NAME = 'Programs/Strands and Year Levels';

export default function GenerateReports({ allReports }) {
  const [departmentsData, setDepartmentsData] = useState({
    categories: allReports[0].categories,
    counts: allReports[0].counts,
  });
  const [programsData, setProgramsData] = useState({
    categories: allReports[1].categories,
    counts: allReports[1].counts,
  });
  const [yearsData, setYearsData] = useState({
    categories: allReports[2].categories,
    counts: allReports[2].counts,
  });
  const [programsYearsData, setProgramsYearsData] = useState({
    categories: allReports[3].categories,
    counts: allReports[3].counts,
  });

  async function handleChangeDate() {
    const dateStart = document.getElementById('fromDate').value;
    const dateEnd = document.getElementById('toDate').value;

    const response = await fetch(
      `${process.env.API_URL}/Api/StudentReport?dateStartString=${dateStart}&dateEndString=${dateEnd}`,
    );
    if (response.ok) {
      const newData = await response.json();
      setDepartmentsData({
        categories: newData[0].categories,
        counts: newData[0].counts,
      });
      setProgramsData({
        categories: newData[1].categories,
        counts: newData[1].counts,
      });
      setYearsData({
        categories: newData[2].categories,
        counts: newData[2].counts,
      });
      setProgramsYearsData({
        categories: newData[3].categories,
        counts: newData[3].counts,
      });
    } else {
      console.log('There was an error');
    }
  }

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
            <input
              id='fromDate'
              name='fromDate'
              type='date'
              onChange={handleChangeDate}
            />
          </label>
          <label htmlFor='toDate' className='flex flex-col w-[304px]'>
            To
            <input
              id='toDate'
              name='toDate'
              type='date'
              onChange={handleChangeDate}
            />
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

export async function getServerSideProps() {
  const res = await fetch(`${process.env.API_URL}/Api/StudentReport`);
  const allReports = await res.json();

  return {
    props: {
      allReports,
    },
  };
}

GenerateReports.page = 'Generate Reports';
