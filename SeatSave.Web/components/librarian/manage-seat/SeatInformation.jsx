import { Field, Form, Formik } from 'formik';
import React from 'react';

export default function SeatInformation({ seatData }) {
  return (
    <form>
      <Formik initialValues={seatData} enableReinitialize>
        {() => (
          <Form className='flex flex-col items-center w-full mb-12 gap-y-7'>
            <div className='w-full'>
              <div>
                <p>Seat ID</p>
                <Field
                  type='text'
                  id='inputSeatID'
                  name='inputSeatID'
                  placeholder='Text'
                  className='bg-iron'
                  disabled
                />
              </div>
              <div>
                Name
                <Field
                  type='text'
                  id='name'
                  name='name'
                  placeholder='Enter Seat Name'
                  className='flex w-full'
                />
              </div>
              <div>
                Type
                <Field
                  as='select'
                  id='type'
                  name='type'
                  className='flex w-full'
                  placeholder='Select Seat Type'
                >
                  <option value='default' disabled hidden>
                    Select Seat Type
                  </option>
                  <option value='1'>Carrel Desk</option>
                  <option value='2'>Carrel Desk with Outlet</option>
                </Field>
              </div>
              <div>
                Description
                <Field
                  as='textarea'
                  type='textarea'
                  id='description'
                  name='description'
                  className='flex w-full h-32'
                  style={{ resize: 'none' }}
                  placeholder='Enter Seat Description'
                />
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <div className='w-full' />
    </form>
  );
}
