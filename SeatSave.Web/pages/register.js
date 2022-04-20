import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Register() {
  return (
    <div>
      <h1>Register</h1>
      <div className='grid grid-cols-2 gap-x-20'>
        <div>
          <Image
            src='/LoginDecoration.svg'
            className='w-full h-auto'
            layout='responsive'
            width={500}
            height={500}
          />
        </div>
        <div className='flex flex-col items-center gap-y-4'>
          <h1 className='text-center text-dusk-blue'>Create Your Account</h1>
          <div className='flex flex-row w-full'>
            <div className='w-[50%]'>
              <p htmlFor='email' className='font-light body-small'>
                First Name
              </p>
              <input
                id='firstname'
                type='text'
                name='firstname'
                placeholder='First Name'
                className='w-full'
              />
            </div>
            <div className='w-[50%]'>
              <p htmlFor='email' className='font-light body-small'>
                Last Name
              </p>
              <input
                id='lastname'
                type='text'
                name='lastname'
                placeholder='First Name'
                className='w-full'
              />
            </div>
          </div>
          <div className='w-full'>
            <p htmlFor='email' className='font-light body-small'>
              Email
            </p>
            <input
              id='email'
              type='text'
              name='email'
              placeholder='student@live.mcl.edu.ph'
              className='w-full'
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
              className='w-full'
            />
          </div>
          <button type='button'>Continue</button>
          <p className='body-small'>
            Already a user?{' '}
            <Link href='/register' className='font-bold'>
              LOG IN
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
