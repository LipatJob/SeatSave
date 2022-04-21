import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Router from 'next/router';
import { librarianAuthService } from '../../lib/librarianAuthService';
import Button from '../../components/common/buttons/Button';

export default function LibrarianLogin() {
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
        <h1 className='mb-16 text-center text-dusk-blue'>Welcome Back!</h1>
        <div className='w-full sm:max-w-md'>
          <div className='flex flex-col items-center mb-12 gap-y-7'>
            <div className='w-full'>
              <p className='font-light body-small'>Email</p>
              <input
                id='email'
                type='email'
                name='email'
                placeholder='librarian@mcl.edu.ph'
                className='w-full p-2  py-2.5  border border-solid border-dawn body-normal'
                onChange={(event) => setEmail(event.target.value)}
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
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
          </div>
          <div className='flex flex-col items-center text-center'>
            <Button
              text='LOG IN'
              className='w-full py-3.5 mb-6 '
              onClick={(e) => onSubmit(e)}
            />
            <p className='body-small'>Can't access your account?</p>
            <Link href='mailto:lipatjj@live.mcl.edu.ph'>
              <p className='font-bold text-bluish body-small'>
                Contact the administrators
              </p>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
