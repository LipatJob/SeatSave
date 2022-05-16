import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function ReportChart({ data }) {
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: 'VisitorDataReports',
      },
      xaxis: {
        categories: data.categories,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          distributed: true,
        },
      },
      colors: ['#00214E', '#003174', '#3F7FC2', '#7DA0D4', '#B8C9DD'],
    },
    series: [{ name: 'Student Count', data: data.counts }],
  });

  function updateChart() {
    setChartData(() => ({
      options: {
        chart: {
          id: 'VisitorDataReports',
        },
        xaxis: {
          categories: data.categories,
        },
        plotOptions: {
          bar: {
            horizontal: true,
            distributed: true,
          },
        },
        colors: ['#00214E', '#003174', '#3F7FC2', '#7DA0D4', '#B8C9DD'],
      },
      series: [{ name: 'Student Count', data: data.counts }],
    }));
  }

  useEffect(() => {
    updateChart();
  }, [data]);

  return (
    <div className='w-full p-4 border'>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type='bar'
        height='350'
        width='100%'
      />
    </div>
  );
}
