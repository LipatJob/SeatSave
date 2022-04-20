import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { librarianAuthService } from '../../lib/librarianAuthService';
import Router from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function onSubmit() {
    const user = await librarianAuthService.login(email, password);
    if (user == null) {
      return;
    }

    Router.push('/');
  }

  useEffect(() => {
    // redirect to home if already logged in
    if (librarianAuthService.getUser() != null) {
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
              placeholder='librarian@mcl.edu.ph'
              className='w-full'
              onChange={(event) => setEmail(event.target.value)}
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
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button type='button' onClick={onSubmit}>
            LOG IN
          </button>
          <p>
            Can't access your account?{' '}
            <Link href='/register' className='font-bold'>
              Contact the administrators
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
