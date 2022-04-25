import React from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import StaffInformationForm from './StaffInformationForm';
import FacultyInformationForm from './FacultyInformationForm';
import StudentInformationForm from './StudentInformationForm';

export default function VisitorInformationForm({
  selection,
  onSubmit,
  onBack,
}) {
  const VisitorInformationSchema = Yup.object().shape({
    userType: Yup.string().required('This field is required'),
    programStrand: Yup.string().when('userType', {
      is: 'Student',
      then: Yup.string().required('This field is required'),
    }),
    yearGrade: Yup.string().when('userType', {
      is: 'Student',
      then: Yup.string().required('This field is required'),
    }),
    department: Yup.string().when('userType', {
      is: 'Student',
      then: Yup.string().required('This field is required'),
    }),
    office: Yup.string()
      .when('userType', {
        is: 'Staff',
        then: Yup.string().required('This field is required'),
      })
      .when('userType', {
        is: 'Faculty',
        then: Yup.string().required('This field is required'),
      }),
  });

  return (
    <Formik
      className='flex flex-col items-center'
      initialValues={{
        userType: '',
        programStrand: '',
        yearGrade: '',
        office: '',
        department: '',
      }}
      validationSchema={VisitorInformationSchema}
      onSubmit={(values) => {
        onSubmit(values);
      }}
    >
      {({ errors, touched, values }) => (
        <Form>
          <div className='w-full sm:max-w-md'>
            <div className='flex flex-col items-center mb-12 gap-y-7'>
              <button
                className='mr-auto text-bluish'
                type='button'
                onClick={onBack}
              >
                <BiArrowBack className='text-[40px]' />
              </button>
              <div className='w-full'>
                <p className='font-light body-small'>Type of Visitor</p>
                <Field
                  as='select'
                  name='userType'
                  id='userType'
                  className='w-full'
                >
                  <option value='' disabled>
                    Select Type
                  </option>
                  <option value='Student'>Student</option>
                  <option value='Faculty'>Faculty</option>
                  <option value='Staff'>Staff</option>
                </Field>
                <ErrorMessage
                  name='userType'
                  component='span'
                  className='text-error'
                />
              </div>
              {values.userType &&
                {
                  Student: (
                    <StudentInformationForm
                      departments={selection.departments}
                      programs={selection.programs}
                      values={values}
                    />
                  ),
                  Faculty: (
                    <FacultyInformationForm
                      offices={selection.facultyOffices}
                    />
                  ),
                  Staff: (
                    <StaffInformationForm offices={selection.staffOffices} />
                  ),
                }[values.userType]}
            </div>
            <div className='flex flex-col items-center text-center'>
              {values.userType && (
                <button type='submit' className='button w-full py-3.5 mb-6'>
                  CREATE ACCOUNT
                </button>
              )}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
