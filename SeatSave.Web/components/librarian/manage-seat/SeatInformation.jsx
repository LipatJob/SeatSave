import { Field, Form, Formik } from 'formik';
import React, { useRef, useState } from 'react';

export default function SeatInformation({
  seatData,
  setShowModalDeleteSeat,
  setFormPart,
  setShowModalAddedSeat,
  setSeatName,
  deletionConfirmation,
  setDeletionConfirmation,
  onAvailableSeatsUpdated,
}) {
  const ref = useRef(null);
  const [formPartData, setFormPartData] = useState();

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
      setFormPart(0);
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
      setFormPart(0);
    }
  };

  const deleteModal = async () => {
    const jsonData = ref.current.values;
    setFormPartData(jsonData);
    console.log(formPartData);
    const requestData = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formPartData),
    };
    console.log(requestData);

    const response = await fetch(
      `${process.env.API_URL}/Api/Seats`,
      requestData,
    );
    if (response.status === 200) {
      const json = await response.json();
      console.log(json);
      setFormPart(0);
      setDeletionConfirmation(false);
      setShowModalDeleteSeat(false);
    } else {
      console.log('there was an error');
    }
  };

  return (
    <Formik
      initialValues={seatData}
      enableReinitialize
      innerRef={ref}
      onSubmit={(values, { setFieldError }) => {
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
            <div className='grid h-content pt-8 lg:h-[70px] lg:pt-0 content-center grid-cols-1 gap-4 text-center lg:gap-0 lg:grid-cols-4 '>
              <div className='md:col-span-1 '>
                {seatData.id !== 0 && (
                  <button
                    type='button'
                    className='w-full h-full align-middle text-valentine-red'
                    onClick={() => {
                      setShowModalDeleteSeat(true);
                      if (deletionConfirmation === true) {
                        deleteModal(); // delete data if yes /// wrong code
                      }
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
                    setFormPart(0);
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
