import React from 'react';
import { Field } from 'formik';

export default function StudentInformationForm() {
  return (
    <>
      <div className='w-full'>
        <p className='font-light body-small'>Department</p>
        <Field as='select' name='department' id='department' className='w-full'>
          <option value='' disabled>
            Select Department
          </option>
          <option value='CCIS'>CCIS</option>
          <option value='MITL'>MITL</option>
          <option value='CAS'>CAS</option>
          <option value='ETYCB'>ETYCB</option>
          <option value='SHS'>SHS</option>
        </Field>
      </div>
      <div className='w-full'>
        <p className='font-light body-small'>Program/Strand</p>
        <Field
          as='select'
          name='programStrand'
          id='programStrand'
          className='w-full'
        >
          <option value='' disabled>
            Select Program/Strand
          </option>
          <option value='IS'>IS</option>
          <option value='CS'>CS</option>
          <option value='IT'>IT</option>
        </Field>
      </div>
      <div className='w-full'>
        <p className='font-light body-small'>Year/Grade Level</p>
        <Field as='select' name='yearGrade' id='yearGrade' className='w-full'>
          <option value='' disabled>
            Year/Grade Level
          </option>
          <option value='First Year'>First Year</option>
          <option value='Second Year'>Second Year</option>
          <option value='Third Year'>Third Year</option>
          <option value='Fourth Year'>Fourth Year</option>
          <option value='Fifth Year'>Fifth Year</option>
          <option value='Grade 11'>Grade 11</option>
          <option value='Grade 12'>Grade 12</option>
        </Field>
      </div>
    </>
  );
}
