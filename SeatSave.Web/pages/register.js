import React, { useState } from 'react';
import { useRouter } from 'next/router';

import Image from 'next/image';

import AccountInformationForm from '../components/register/AccountInformationForm';
import VisitorInformationForm from '../components/register/VisitorInformationForm';

export default function Register() {
  const [formPartData, setFormPartData] = useState([]);
  const [formPartIndex, setFormPartIndex] = useState(0);
  const router = useRouter();

  const submitData = async () => {
    const formData = { ...formPartData[0], ...formPartData[1] };

    console.log(formData);
    const requestData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    };

    fetch(`${process.env.API_URL}/Api/User`, requestData)
      .then((res) => {
        const json = res.json();
        console.log(json);
        router.push('/login?RegisterSuccessful=True');
      })
      .catch((error) => {
        console.log('there was an error');
        console.log(error);
      });
  };

  const setFormIndexData = (index, data) => {
    setFormPartData((oldFormPartData) => {
      const newFormPartData = [...oldFormPartData];
      newFormPartData[index] = data;
      return newFormPartData;
    });
  };

  const goToNextFormPart = (submittedFormData) => {
    setFormIndexData(formPartIndex, submittedFormData);
    setFormPartIndex((oldFormPartIndex) => oldFormPartIndex + 1);
  };

  const goToPreviousFormPart = () => {
    setFormPartIndex((oldFormPartIndex) => oldFormPartIndex - 1);
  };

  const submitLastFormPart = (submittedFormData) => {
    setFormIndexData(formPartIndex, submittedFormData);
    submitData();
  };

  return (
    <div className='sm:grid sm:grid-cols-2 page-container sm:gap-x-20'>
      <div className='hidden sm:block'>
        {formPartIndex === 0 && (
          <Image
            src='/RegisterPart1.svg'
            className='w-full h-auto'
            layout='responsive'
            width={500}
            height={500}
          />
        )}
        {formPartIndex === 1 && (
          <Image
            src='/RegisterPart2.svg'
            className='w-full h-auto'
            layout='responsive'
            width={500}
            height={500}
          />
        )}
      </div>
      {formPartIndex === 0 && (
        <AccountInformationForm onSubmit={goToNextFormPart} />
      )}
      {formPartIndex === 1 && (
        <VisitorInformationForm
          onSubmit={submitLastFormPart}
          onBack={goToPreviousFormPart}
        />
      )}
    </div>
  );
}
