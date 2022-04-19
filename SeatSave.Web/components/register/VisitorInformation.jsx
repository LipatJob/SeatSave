import React from 'react';

export default function VisitorInformation() {
  return (
    <div className='w-[50%]'>
      <p htmlFor='email' className='font-light body-small'>
        Type of Visitor
      </p>
      <select>
        <option value=''></option>
      </select>
    </div>
  );
}
