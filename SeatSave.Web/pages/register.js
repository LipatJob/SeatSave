import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '../components/common/buttons/Button';

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
      <form className='flex flex-col items-center'>
        <h1 className='mb-16 text-center text-dusk-blue'>
          Create Your Account
        </h1>
        <div className='sm:max-w-md'>
          <div className='flex flex-col items-center mb-12 gap-y-7'>
            <div className='grid w-full grid-cols-2 gap-4'>
              <div className='w-full'>
                <p htmlFor='email' className='font-light body-small'>
                  First Name
                </p>
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
                <p htmlFor='email' className='font-light body-small'>
                  Last Name
                </p>
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
              <p htmlFor='email' className='font-light body-small'>
                Email
              </p>
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
              <p htmlFor='email' className='font-light body-small'>
                Password
              </p>
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
            <Button text='CONTINUE' className='w-full py-3.5 mb-6'></Button>
            <p className='body-small'>
              Already have an account?{' '}
              <Link href='/login'>
                <span className='font-bold text-bluish body-small'>LOG IN</span>
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
