import React from 'react';

export default function StaffInformationForm({ onChange }) {
  return (
    <div className='w-full'>
      <p className='font-light body-small'>Office</p>
      <select
        name='office'
        id='office'
        className='w-full'
        onChange={onChange}
        required
      >
        <option value='Office of the President'>Office of the President</option>
        <option value='Office of the Executive Vice President'>
          Office of the Executive Vice President
        </option>
        <option value='OSVPAL'>OSVPAL</option>
        <option value='OVPAA'>OVPAA</option>
        <option value='OVPF'>OVPF</option>
        <option value='OAVPAS'>I-OAVPAS</option>
      </select>
    </div>
  );
}
