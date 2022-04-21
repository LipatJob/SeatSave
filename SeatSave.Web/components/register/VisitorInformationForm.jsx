import React, { useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import Button from '../common/buttons/Button';
import StaffInformationForm from './StaffInformationForm';
import FacultyInformationForm from './FacultyInformationForm';
import StudentInformationForm from './StudentInformationForm';

export default function VisitorInformationForm({ onSubmit, onBack }) {
  const [formData, setFormData] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((oldFormData) => ({
      ...oldFormData,
      [name]: value,
    }));
  };

  const visitorForms = {
    Student: <StudentInformationForm onChange={handleInputChange} />,
    Faculty: <FacultyInformationForm onChange={handleInputChange} />,
    Staff: <StaffInformationForm onChange={handleInputChange} />,
  };

  return (
    <form className='flex flex-col items-center'>
      <div className='w-full sm:max-w-md'>
        <div className='flex flex-col items-center mb-12 gap-y-7'>
          <button
            className='mr-auto text-bluish'
            type='button'
            onClick={onBack}
          >
            <BiArrowBack className='text-[40px]' />
          </button>
          <div className='w-full'>
            <p className='font-light body-small'>Type of Visitor</p>
            <select
              name='userType'
              id='userType'
              className='w-full'
              onChange={(e) => handleInputChange(e)}
              required
            >
              <option value='Student'>Student</option>
              <option value='Faculty'>Faculty</option>
              <option value='Staff'>Staff</option>
            </select>
          </div>
          {visitorForms[formData.userType]}
        </div>
        <div className='flex flex-col items-center text-center'>
          {formData.userType in visitorForms && (
            <Button
              text='CONTINUE'
              className='w-full py-3.5 mb-6'
              onClick={() => onSubmit(formData)}
              disabled
            >
              CREATE ACCOUNT
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}
