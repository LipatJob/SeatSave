import React from 'react';
import ReportChart from './ReportChart';

export default function ReportSection({ name, data }) {
  return (
    <div>
      <h4>Top {name} of Student Visitors</h4>
      <div className='mt-2'>
        <ReportChart data={data} />
      </div>
    </div>
  );
}
