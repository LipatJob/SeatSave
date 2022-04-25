import React from 'react';
import Link from 'next/link';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function AccountInformationForm({ onSubmit }) {
  const emailAddressNotTaken = async (emailAddress) => {
    const encodedEmailAddress = encodeURIComponent(emailAddress);
    const response = await fetch(
      `${process.env.API_URL}/Api/User?email=${encodedEmailAddress}`,
      {
        method: 'HEAD',
      },
    );

    return response.status === 404;
  };
  const SignupSchema = Yup.object().shape({
    firstname: Yup.string().required('This field is required'),
    lastname: Yup.string().required('This field is required'),
    email: Yup.string()
      .email('Invalid email')
      .required('This field is required'),
    password: Yup.string()
      .min(5, 'Password must be at least 5 characters')
      .required('This field is required'),
  });

  return (
    <div className='flex flex-col items-center'>
      <h1 className='mb-16 text-center text-dusk-blue'>Create Your Account</h1>
      <Formik
        initialValues={{
          firstname: '',
          lastname: '',
          email: '',
          password: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, { setFieldError }) => {
          emailAddressNotTaken(values.email).then((isNotTaken) => {
            if (!isNotTaken) {
              setFieldError('email', 'Email is already taken');
              return;
            }
            onSubmit(values);
          });
        }}
      >
        {() => (
          <Form>
            <div className='sm:max-w-md'>
              <div className='flex flex-col items-center mb-12 gap-y-7'>
                <div className='grid w-full grid-cols-2 gap-4'>
                  <div className='w-full'>
                    <p className='font-light body-small'>First Name</p>
                    <Field
                      id='firstname'
                      type='text'
                      name='firstname'
                      placeholder='First Name'
                      className='w-full'
                    />
                    <ErrorMessage
                      name='firstname'
                      component='span'
                      className='text-error'
                    />
                  </div>
                  <div className='w-full'>
                    <p className='font-light body-small'>Last Name</p>
                    <Field
                      id='lastname'
                      type='text'
                      name='lastname'
                      placeholder='Last Name'
                      className='w-full'
                    />
                    <ErrorMessage
                      name='lastname'
                      component='span'
                      className='text-error'
                    />
                  </div>
                </div>
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
                  CONTINUE
                </button>
                <p className='body-small'>
                  Already have an account?{' '}
                  <Link href='/login'>
                    <span className='font-bold text-bluish body-small'>
                      LOG IN
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
