import React from 'react';

export default function FacultyInformationForm({ onChange }) {
  return (
    <div className='w-full'>
      <p className='font-light body-small'>Office</p>
      <select
        name='office'
        id='office'
        className='w-full p-2 py-2.5 border border-solid border-dawn body-normal'
        onChange={onChange}
        required
      >
        <option value='CCIS'>CCIS</option>
        <option value='MITL'>MITL</option>
        <option value='CAS'>CAS</option>
        <option value='ETYCB'>ETYCB</option>
        <option value='SHS'>SHS</option>
        <option value='IExCell'>I-ExCELL</option>
      </select>
    </div>
  );
}