import React, { useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import Button from '../common/buttons/Button';
import StaffInformationForm from './StaffInformationForm';
import FacultyInformationForm from './FacultyInformationForm';
import StudentInformationForm from './StudentInformationForm';

export default function VisitorInformationForm() {
  const [visitorType, setVisitorType] = useState('');
  const visitorForms = {
    Student: <StudentInformationForm />,
    Faculty: <FacultyInformationForm />,
    Staff: <StaffInformationForm />,
  };

  return (
    <form className='flex flex-col items-center'>
      <div className='w-full sm:max-w-md'>
        <div className='flex flex-col items-center mb-12 gap-y-7'>
          <button className='mr-auto text-bluish' type='button'>
            <BiArrowBack className='text-[40px]' />
          </button>
          <div className='w-full'>
            <p className='font-light body-small'>Type of Visitor</p>
            <select
              name='visitorType'
              id='visitorType'
              className='w-full p-2 py-2.5 border border-solid border-dawn body-normal'
              onChange={(event) => setVisitorType(event.target.value)}
            >
              <option value='Student'>Student</option>
              <option value='Faculty'>Faculty</option>
              <option value='Staff'>Staff</option>
            </select>
          </div>
          {visitorForms[visitorType]}
        </div>
        <div className='flex flex-col items-center text-center'>
          {visitorType in visitorForms && (
            <Button text='CONTINUE' className='w-full py-3.5 mb-6'>
              CREATE ACCOUNT
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}
