import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState, useEffect } from 'react';

export default function SeatInformation(selectedSeatID) {
  // eslint-disable-next-line react/destructuring-assignment
  const currentSeatID = selectedSeatID.selectedSeatID;
  const [userData, setUserData] = useState({});

  const getData = async () => {
    const response = await fetch(
      `${process.env.API_URL}/Api/Seats/${currentSeatID}`,
    );
    const jsonData = await response.json();
    setUserData(jsonData);

    console.log(jsonData);
  };
  useEffect(() => {
    if (currentSeatID !== 0) getData();
  }, []);

  return (
    <form>
      <Formik initialValues={userData} enableReinitialize>
        {() => (
          <Form>
            <div className='sm:max-w-md'>
              <div className='flex flex-col items-center mb-12 gap-y-7'>
                <div className='w-full'>
                  <div>
                    Seat ID
                    <Field
                      type='text'
                      id='inputSeatID'
                      name='inputSeatID'
                      placeholder='Text'
                      className='flex bg-iron'
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
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <div className='w-full' />
    </form>
  );
}
