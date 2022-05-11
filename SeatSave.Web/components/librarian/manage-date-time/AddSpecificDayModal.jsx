import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import ModalBase from '../../common/ModalBase';

export default function AddSpecificDayModal({ onAdd, onClose, isDayUnique }) {
  return (
    <ModalBase onClose={onClose}>
      <div className=' w-[500px] h-[300px] '>
        <Formik
          initialValues={{
            date: new Date(),
          }}
          onSubmit={(values, { setFieldError }) => {
            if (!isDayUnique(values.date)) {
              setFieldError('date', 'Date has already been added');
            }
            onAdd(values.date);
          }}
        >
          {() => (
            <Form className='flex flex-col items-center'>
              <h4 className='mb-7'>Override Day</h4>
              <div className='flex flex-col mb-14'>
                <Field
                  id='date'
                  type='date'
                  name='date'
                  placeholder='First Name'
                  className='px-8 '
                />
                <ErrorMessage
                  name='date'
                  component='span'
                  className='text-error'
                />
              </div>

              <button type='submit' className='px-8 button'>
                ADD DATE
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </ModalBase>
  );
}
