import React from 'react';
import Link from 'next/link';
import Button from '../common/buttons/Button';

export default function AccountInformationForm() {
  return (
    <form className='flex flex-col items-center'>
      <h1 className='mb-16 text-center text-dusk-blue'>Create Your Account</h1>
      <div className='sm:max-w-md'>
        <div className='flex flex-col items-center mb-12 gap-y-7'>
          <div className='grid w-full grid-cols-2 gap-4'>
            <div className='w-full'>
              <p className='font-light body-small'>First Name</p>
              <input
                id='firstname'
                type='text'
                name='firstname'
                placeholder='First Name'
                className='w-full p-2 py-2.5 border border-solid border-dawn body-normal'
                onChange={() => false}
              />
            </div>
            <div className='w-full'>
              <p className='font-light body-small'>Last Name</p>
              <input
                id='lastname'
                type='text'
                name='lastname'
                placeholder='Last Name'
                className='w-full p-2 py-2.5 border border-solid border-dawn body-normal'
                onChange={() => false}
              />
            </div>
          </div>
          <div className='w-full'>
            <p className='font-light body-small'>Email</p>
            <input
              id='email'
              type='email'
              name='email'
              placeholder='student@live.mcl.edu.ph'
              className='w-full p-2 py-2.5 border border-solid border-dawn body-normal'
              onChange={() => false}
            />
          </div>
          <div className='w-full'>
            <p className='font-light body-small'>Password</p>
            <input
              id='password'
              type='password'
              name='password'
              placeholder='*******'
              className='w-full p-2 py-2.5 border border-solid border-dawn body-normal'
              onChange={() => false}
            />
          </div>
        </div>
        <div className='flex flex-col items-center text-center'>
          <Button text='CONTINUE' className='w-full py-3.5 mb-6' />
          <p className='body-small'>
            Already have an account?{' '}
            <Link href='/login'>
              <span className='font-bold text-bluish body-small'>LOG IN</span>
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
}
