import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { visitorAuthService } from '../lib/visitorAuthService';
import Router from 'next/router';
import Button from '../components/common/buttons/Button';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function onSubmit() {
    const user = await visitorAuthService.login(email, password);
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
    <div className='grid grid-cols-2 page-container gap-x-20'>
      <div>
        <Image
          src='/LoginDecoration.svg'
          className='w-full h-auto'
          layout='responsive'
          width={500}
          height={500}
        />
      </div>
      <form className=''>
        <h1 className='mb-16 text-center text-dusk-blue'>Welcome Back!</h1>
        <div className='mx-20'>
          <div className='flex flex-col items-center mb-12 gap-y-8'>
            <div className='w-full'>
              <p htmlFor='email' className='font-light body-small'>
                Email
              </p>
              <input
                id='email'
                type='email'
                name='email'
                placeholder='student@live.mcl.edu.ph'
                className='w-full p-2 border border-solid border-dawn body-normal'
                onChange={(event) => setEmail(event.target.value)}
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
                className='w-full p-2 border border-solid border-dawn body-normal'
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
          </div>
          <div className='flex flex-col items-center'>
            <Button text='LOG IN' className='w-full py-3 mb-4 '></Button>
            <p className='body-small'>
              Don't have an account?{' '}
              <Link href='/register'>
                <span className='font-bold text-dusk-blue'>Create</span>
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
