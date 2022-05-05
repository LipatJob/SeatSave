import React from 'react';
import { ErrorMessage, Field } from 'formik';

export default function FacultyInformationForm({ offices }) {
  return (
    <div className='w-full'>
      <p className='font-light body-small'>Office</p>
      <Field as='select' name='office' id='office' className='w-full'>
        <option value='' disabled hidden>
          Select Office
        </option>
        {offices.map((office) => (
          <option key={office} value={office}>
            {office}
          </option>
        ))}
      </Field>
      <ErrorMessage name='office' component='span' className='text-error' />
    </div>
  );
}
