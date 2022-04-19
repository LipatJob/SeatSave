import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Login() {
  return (
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
      <form>
        <div className='flex flex-col items-center gap-y-4'>
          <h1>Welcome Back!</h1>
          <div className='w-full'>
            <p htmlFor='email'>Email</p>
            <input
              id='email'
              type='text'
              name='email'
              placeholder='student@live.mcl.edu.ph'
            />
          </div>
          <div className='w-full'>
            <p htmlFor='email'>Password</p>
            <input
              id='password'
              type='password'
              name='password'
              placeholder='*******'
            />
          </div>
          <button type='button'>LOG IN</button>
          <p>
            Don't have an account?{' '}
            <Link href='/register' className='font-bold'>
              Create
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
