import React from 'react';
import { Field } from 'formik';

export default function StaffInformationForm({ offices }) {
  return (
    <div className='w-full'>
      <p className='font-light body-small'>Office</p>
      <Field as='select' name='office' id='office' className='w-full'>
        <option value='' disabled>
          Select Office
        </option>
        {offices.map((office) => (
          <option key={office} value={office}>
            {office}
          </option>
        ))}
      </Field>
    </div>
  );
}
