import React, { useState } from 'react';

import Image from 'next/image';

import AccountInformationForm from '../components/register/AccountInformationForm';
import VisitorInformationForm from '../components/register/VisitorInformationForm';

export default function Register() {
  const [formData, setFormData] = useState({});
  const [formPart, setFormPart] = useState(0);

  const goToNextFormPart = (accountInformation) => {
    setFormData((oldFormData) =>
      Object.assign(oldFormData, accountInformation),
    );
    setFormPart((oldFormPart) => oldFormPart + 1);
    console.log(formData);
  };

  const goToPreviousFormPart = () => {
    setFormPart((oldFormPart) => oldFormPart - 1);
  };

  const submitVisitorInformationForm = (visitorInformation) => {
    setFormData((oldFormData) =>
      Object.assign(oldFormData, visitorInformation),
    );
    console.log(formData);
  };

  return (
    <div className='sm:grid sm:grid-cols-2 page-container sm:gap-x-20'>
      <div className='hidden sm:block'>
        {formPart === 0 && (
          <Image
            src='/RegisterPart1.svg'
            className='w-full h-auto'
            layout='responsive'
            width={500}
            height={500}
          />
        )}
        {formPart === 1 && (
          <Image
            src='/RegisterPart2.svg'
            className='w-full h-auto'
            layout='responsive'
            width={500}
            height={500}
          />
        )}
      </div>
      {formPart === 0 && <AccountInformationForm onSubmit={goToNextFormPart} />}
      {formPart === 1 && (
        <VisitorInformationForm
          onSubmit={submitVisitorInformationForm}
          onBack={goToPreviousFormPart}
        />
      )}
    </div>
  );
}
