import React, { useState } from 'react';
import { useRouter } from 'next/router';

import Image from 'next/image';

import AccountInformationForm from '../components/register/AccountInformationForm';
import VisitorInformationForm from '../components/register/VisitorInformationForm';

export default function Register({ visitorSelection }) {
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

    const response = await fetch(
      `${process.env.API_URL}/Api/User`,
      requestData,
    );
    if (response.status === 200) {
      const json = await response.json();
      console.log(json);
      router.push('/login?RegisterSuccessful=True');
    } else {
      console.log('there was an error');
    }
  };

  const setFormIndexData = (index, data) => {
    setFormPartData((oldFormPartData) => {
      const newFormPartData = [...oldFormPartData];
      newFormPartData[index] = data;
      return newFormPartData;
    });
  };

  const goToNextFormPart = (submittedFormData) => {
    setFormIndexData(0, submittedFormData);
    setFormPartIndex((oldFormPartIndex) => oldFormPartIndex + 1);
  };

  const goToPreviousFormPart = () => {
    setFormPartIndex((oldFormPartIndex) => oldFormPartIndex - 1);
  };

  const submitLastFormPart = (submittedFormData) => {
    setFormIndexData(1, submittedFormData);
    submitData();
  };

  return (
    <div className='sm:grid sm:grid-cols-2 page-container sm:gap-x-20'>
      <div className='hidden sm:block'>
        {formPartIndex === 0 && (
          <Image
            src='/RegisterPart1.svg'
            className='z-[-5] w-full h-auto'
            layout='responsive'
            width={500}
            height={500}
          />
        )}
        {formPartIndex === 1 && (
          <Image
            src='/RegisterPart2.svg'
            className='z-[-5] w-full h-auto'
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
          selection={visitorSelection}
          onSubmit={submitLastFormPart}
          onBack={goToPreviousFormPart}
        />
      )}
    </div>
  );
}

export async function getStaticProps() {
  const departmentsData = await fetch(
    `${process.env.API_URL}/Api/User/Enum/Student/Department`,
  );
  const departments = await departmentsData.json();

  const programsData = await fetch(
    `${process.env.API_URL}/Api/User/Enum/Student/Program`,
  );
  const programs = await programsData.json();

  const staffOfficesData = await fetch(
    `${process.env.API_URL}/Api/User/Enum/Staff/Office`,
  );
  const staffOffices = await staffOfficesData.json();

  const facultyOfficesData = await fetch(
    `${process.env.API_URL}/Api/User/Enum/Faculty/Office`,
  );
  const facultyOffices = await facultyOfficesData.json();

  return {
    props: {
      visitorSelection: {
        departments,
        programs,
        staffOffices,
        facultyOffices,
      },
    }, // will be passed to the page component as props
  };
}

Register.page = 'Register';
