import React from 'react';
import { Field } from 'formik';

export default function StaffInformationForm() {
  return (
    <div className='w-full'>
      <p className='font-light body-small'>Office</p>
      <Field as='select' name='office' id='office' className='w-full'>
        <option value='' disabled>
          Select Office
        </option>
        <option value='Office of the President'>Office of the President</option>
        <option value='Office of the Executive Vice President'>
          Office of the Executive Vice President
        </option>
        <option value='OSVPAL'>OSVPAL</option>
        <option value='OVPAA'>OVPAA</option>
        <option value='OVPF'>OVPF</option>
        <option value='OAVPAS'>I-OAVPAS</option>
      </Field>
    </div>
  );
}
