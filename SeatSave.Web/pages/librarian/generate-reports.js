/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import { useExcelDownloder } from 'react-xls';
import ReportDataConditions from '../../components/librarian/generate-reports/ReportDataConditions';
import ReportSection from '../../components/librarian/generate-reports/ReportSection';

const DEPARTMENTS_NAME = 'Departments';
const PROGRAMS_NAME = 'Programs/Strands';
const YEARS_NAME = 'Year Levels';
const PROGRAMS_YEARS_NAME = 'Programs/Strands and Year Levels';

export default function GenerateReports({ allChartReports, allExcelReports }) {
  const { ExcelDownloder, Type } = useExcelDownloder();

  const excelData = {
    Top_Departments: allExcelReports[0],
    Top_Programs: allExcelReports[1],
    Top_YearLevels: allExcelReports[2],
    Top_Programs_and_YearLevels: allExcelReports[3],
  };

  const [chartData, setChartData] = useState([
    {
      categories: allChartReports[0].categories.slice(0, 5),
      counts: allChartReports[0].counts.slice(0, 5),
    },
    {
      categories: allChartReports[1].categories.slice(0, 5),
      counts: allChartReports[1].counts.slice(0, 5),
    },
    {
      categories: allChartReports[2].categories.slice(0, 5),
      counts: allChartReports[2].counts.slice(0, 5),
    },
    {
      categories: allChartReports[3].categories.slice(0, 5),
      counts: allChartReports[3].counts.slice(0, 5),
    },
  ]);

  async function handleChangeConditions() {
    const dateStart = document.getElementById('fromDate').value;
    const dateEnd = document.getElementById('toDate').value;
    const isUnique = document.getElementById('uniqueCount').checked;

    const response = await fetch(
      `${process.env.API_URL}/Api/StudentReport?dateStartString=${dateStart}&dateEndString=${dateEnd}&uniqueCount=${isUnique}`,
    );
    if (response.ok) {
      const newData = await response.json();
      setChartData([
        {
          categories: newData[0].categories.slice(0, 5),
          counts: newData[0].counts.slice(0, 5),
        },
        {
          categories: newData[1].categories.slice(0, 5),
          counts: newData[1].counts.slice(0, 5),
        },
        {
          categories: newData[2].categories.slice(0, 5),
          counts: newData[2].counts.slice(0, 5),
        },
        {
          categories: newData[3].categories.slice(0, 5),
          counts: newData[3].counts.slice(0, 5),
        },
      ]);
    } else {
      console.log('There was an error');
    }
  }

  return (
    <div className='page-container'>
      <h1>Generate Reports</h1>

      <div className='flex flex-col justify-between mt-8 lg:flex-row'>
        <h4>Visitor Data</h4>
        <ExcelDownloder
          data={excelData}
          filename='VisitorReportsData'
          type={Type.Button}
          className='button w-[304px] mt-4 lg:mt-0'
        >
          Download All Reports
        </ExcelDownloder>
      </div>
      <div className='mt-8 lg:mt-4'>
        <ReportDataConditions changeConditions={handleChangeConditions} />
      </div>

      <div className='lg:mt-16'>
        <div className='flex flex-col w-full gap-5 lg:flex-row'>
          <div className='mt-16 basis-1/2 lg:mt-0'>
            <ReportSection name={DEPARTMENTS_NAME} data={chartData[0]} />
          </div>
          <div className='mt-16 basis-1/2 lg:mt-0'>
            <ReportSection name={PROGRAMS_NAME} data={chartData[1]} />
          </div>
        </div>
        <div className='flex flex-col w-full gap-5 lg:mt-8 lg:flex-row'>
          <div className='mt-16 basis-1/2 lg:mt-0'>
            <ReportSection name={YEARS_NAME} data={chartData[2]} />
          </div>
          <div className='mt-16 basis-1/2 lg:mt-0'>
            <ReportSection name={PROGRAMS_YEARS_NAME} data={chartData[3]} />
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const res1 = await fetch(`${process.env.API_URL}/Api/StudentReport`);
  const allChartReports = await res1.json();

  const res2 = await fetch(`${process.env.API_URL}/Api/StudentReport/Excel`);
  const allExcelReports = await res2.json();

  return {
    props: {
      allChartReports,
      allExcelReports,
    },
  };
}

GenerateReports.page = 'Generate Reports';
