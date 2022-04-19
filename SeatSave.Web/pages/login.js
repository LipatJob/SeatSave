import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { visitorAuthService } from '../lib/visitorAuthService';
import Router from 'next/router';

export default function Login() {
  async function onSubmit() {
    const user = await visitorAuthService.login();
    if (user == null) {
      return;
    }

    Router.push('/');
  }

  useEffect(() => {
    // redirect to home if already logged in
    if (visitorAuthService.getUser() != null) {
      Router.push('/');
    }
  }, []);

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
          <h1 className='text-center text-dusk-blue'>Welcome Back!</h1>
          <div className='w-full'>
            <p htmlFor='email'>Email</p>
            <input
              id='email'
              type='email'
              name='email'
              placeholder='student@live.mcl.edu.ph'
              className='w-full'
            />
          </div>
          <div className='w-full'>
            <p htmlFor='email'>Password</p>
            <input
              id='password'
              type='password'
              name='password'
              placeholder='*******'
              className='w-full'
            />
          </div>
          <button type='button' onClick={onSubmit}>
            LOG IN
          </button>
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
