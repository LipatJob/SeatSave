import React from 'react';

import Image from 'next/image';

import AccountInformationForm from '../components/register/AccountInformationForm';
import VisitorInformationForm from '../components/register/VisitorInformationForm';

export default function Register() {
  return (
    <div className='sm:grid sm:grid-cols-2 page-container sm:gap-x-20'>
      <div className='hidden sm:block'>
        <Image
          src='/LoginDecoration.svg'
          className='w-full h-auto'
          layout='responsive'
          width={500}
          height={500}
        />
      </div>
      <VisitorInformationForm />
      {/* <AccountInformationForm /> */}
    </div>
  );
}
