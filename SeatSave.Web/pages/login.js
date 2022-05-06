import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Router from 'next/router';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import visitorAuthService from '../lib/visitorAuthService';

export default function VisitorLogin() {
  useEffect(() => {
    // redirect to home if already logged in
    if (visitorAuthService.isLoggedIn()) {
      Router.push('/');
    }
  }, []);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('This field is required'),
    password: Yup.string()
      .min(5, 'Password must be at least 5 characters')
      .required('This field is required'),
  });

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
      <div className='sm:max-w-md'>
        <h1 className='mb-16 text-dusk-blue'>Welcome Back!</h1>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={LoginSchema}
          onSubmit={(values, { setFieldError }) => {
            visitorAuthService
              .login(values.email, values.password)
              .then((user) => {
                if (user == null) {
                  setFieldError('email', 'Email or password not found');
                  return;
                }
                Router.push('/');
              });
          }}
        >
          {() => (
            <Form>
              <div className='flex flex-col items-center mb-12 gap-y-7'>
                <div className='w-full'>
                  <p className='font-light body-small'>Email</p>
                  <Field
                    id='email'
                    type='email'
                    name='email'
                    placeholder='student@live.mcl.edu.ph'
                    className='w-full'
                  />
                  <ErrorMessage
                    name='email'
                    component='span'
                    className='text-error'
                  />
                </div>
                <div className='w-full'>
                  <p className='font-light body-small'>Password</p>
                  <Field
                    id='password'
                    type='password'
                    name='password'
                    placeholder='*******'
                    className='w-full'
                  />
                  <ErrorMessage
                    name='password'
                    component='span'
                    className='text-error'
                  />
                </div>
              </div>
              <div className='flex flex-col items-center text-center'>
                <button type='submit' className='button w-full py-3.5 mb-6'>
                  LOG IN
                </button>
                <p className='body-small'>
                  Don't have an account?{' '}
                  <Link href='/register'>
                    <span className='font-bold text-bluish body-small'>
                      Create
                    </span>
                  </Link>
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

VisitorLogin.page = 'VisitorLogin';
