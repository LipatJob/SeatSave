import React from 'react';

export default function StudentInformationForm({ onChange }) {
  return (
    <>
      <div className='w-full'>
        <p className='font-light body-small'>Department</p>
        <select
          name='department'
          id='department'
          className='w-full'
          onChange={onChange}
          required
        >
          <option value='CCIS'>CCIS</option>
          <option value='MITL'>MITL</option>
          <option value='CAS'>CAS</option>
          <option value='ETYCB'>ETYCB</option>
          <option value='SHS'>SHS</option>
        </select>
      </div>
      <div className='w-full'>
        <p className='font-light body-small'>Program/Strand</p>
        <select
          name='programStrand'
          id='programStrand'
          className='w-full'
          onChange={onChange}
        >
          <option value='IS'>IS</option>
          <option value='CS'>CS</option>
          <option value='IT'>IT</option>
        </select>
      </div>
      <div className='w-full'>
        <p className='font-light body-small'>Year/Grade Level</p>
        <select
          name='yearGrade'
          id='yearGrade'
          className='w-full'
          onChange={onChange}
        >
          <option value='First Year'>First Year</option>
          <option value='Second Year'>Second Year</option>
          <option value='Third Year'>Third Year</option>
          <option value='Fourth Year'>Fourth Year</option>
          <option value='Fifth Year'>Fifth Year</option>
          <option value='Grade 11'>Grade 11</option>
          <option value='Grade 12'>Grade 12</option>
        </select>
      </div>
    </>
  );
}
