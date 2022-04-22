import React from 'react';
import { Field } from 'formik';

export default function FacultyInformationForm() {
  return (
    <div className='w-full'>
      <p className='font-light body-small'>Office</p>
      <Field as='select' name='office' id='office' className='w-full'>
        <option value='' disabled>
          Select Office
        </option>
        <option value='CCIS'>CCIS</option>
        <option value='MITL'>MITL</option>
        <option value='CAS'>CAS</option>
        <option value='ETYCB'>ETYCB</option>
        <option value='SHS'>SHS</option>
        <option value='IExCell'>I-ExCELL</option>
      </Field>
    </div>
  );
}
