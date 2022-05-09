import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import WarningConfirmationModal from '../../common/WarningConfirmationModal';

export default function SeatInformation({
  seatData,
  goToPreviousFormPart,
  setShowModalAddedSeat,
  setSeatName,
  onAvailableSeatsUpdated,
  seatTypes,
}) {
  const [showModalDeleteSeat, setShowModalDeleteSeat] = useState(false);

  const submitData = async (data) => {
    const requestData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    console.log(requestData);

    const response = await fetch(
      `${process.env.API_URL}/Api/Seats`,
      requestData,
    );
    if (response.status === 200) {
      const json = await response.json();
      console.log(json);
      setSeatName(data.name);
      goToPreviousFormPart();
      onAvailableSeatsUpdated();
    } else {
      console.log('there was an error');
    }
  };

  const editData = async (data) => {
    const requestData = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    console.log(requestData);

    const response = await fetch(
      `${process.env.API_URL}/Api/Seats`,
      requestData,
    );
    if (response.status === 200) {
      const json = await response.json();
      console.log(json);
      onAvailableSeatsUpdated();
      goToPreviousFormPart();
    }
  };

  const deleteSeat = async () => {
    console.log(seatData.id);
    const response = await fetch(
      `${process.env.API_URL}/Api/Seats/${seatData.id}`,
      {
        method: 'DELETE',
      },
    );
    if (response.status === 204) {
      goToPreviousFormPart();
      setShowModalDeleteSeat(false);
      onAvailableSeatsUpdated();
    }
  };
  const seatInformationSchema = Yup.object().shape({
    name: Yup.string().trim().required('This field is required'),
    type: Yup.string().trim().required('This field is required'),
    description: Yup.string().trim().required('This field is required'),
  });

  return (
    <Formik
      initialValues={seatData}
      validationSchema={seatInformationSchema}
      enableReinitialize
      onSubmit={(values) => {
        console.log(values);
        if (seatData.id === 0) {
          setShowModalAddedSeat(true);
          submitData(values);
        } else {
          editData(values);
        }
      }}
    >
      {() => (
        <Form className='flex flex-col items-center w-full gap-y-7'>
          {showModalDeleteSeat && (
            <WarningConfirmationModal
              text='Are you sure you want to delete this seat?'
              onYes={() => deleteSeat()}
              onNo={() => setShowModalDeleteSeat(false)}
              onClose={() => setShowModalDeleteSeat(false)}
            />
          )}
          <div className='w-full h-full'>
            <div className='w-full h-content lg:h-[450px]  '>
              <div className=''>
                <p>Seat ID</p>
                <Field
                  type='text'
                  id='id'
                  name='id'
                  placeholder='Text'
                  className='bg-iron'
                  disabled
                />
              </div>
              <div>
                Name
                <ErrorMessage
                  name='name'
                  component='span'
                  className='inline pl-4 text-error'
                />
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
                <ErrorMessage
                  name='type'
                  component='span'
                  className='inline pl-4 text-error'
                />
                <Field
                  as='select'
                  id='type'
                  name='type'
                  className='flex w-full'
                  placeholder='Select Seat Type'
                >
                  <option value='' disabled hidden>
                    Select Seat Type
                  </option>
                  {seatTypes.map((seat) => (
                    <option value={seat}>{seat}</option>
                  ))}
                </Field>
              </div>
              <div>
                Description
                <ErrorMessage
                  name='description'
                  component='span'
                  className='inline pl-4 text-error'
                />
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
            <div className='grid h-content pt-8 lg:h-[70px] lg:pt-0 content-center grid-cols-1 gap-4 text-center lg:gap-0 lg:grid-cols-4 '>
              <div className='md:col-span-1 '>
                {seatData.id !== 0 && (
                  <button
                    type='button'
                    className='w-full h-full align-middle text-valentine-red'
                    onClick={() => {
                      setShowModalDeleteSeat(true);
                    }}
                  >
                    DELETE
                  </button>
                )}
              </div>
              <div className='text-right md:col-span-1'>
                <Field
                  className='inline-block align-middle'
                  type='checkbox'
                  name='active'
                  id='active'
                />
                <span className='inline-block align-middle'>Activate Seat</span>
              </div>
              <div className='md:col-span-1'>
                <button
                  type='button'
                  className='w-full lg:w-min gray-button'
                  onClick={() => {
                    goToPreviousFormPart();
                  }}
                >
                  CANCEL
                </button>
              </div>
              <div className='md:col-span-1'>
                <button type='submit' className='w-full button'>
                  SAVE
                </button>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
