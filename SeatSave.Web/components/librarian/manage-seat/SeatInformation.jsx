import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import WarningConfirmationModal from '../../common/WarningConfirmationModal';

export default function SeatInformation({
  seatTypes,
  goToPreviousFormPart,
  setShowModalAddedSeat,
  setSeatName,
  onAvailableSeatsUpdated,
  currentID,
}) {
  // States
  const [showModalDeleteSeat, setShowModalDeleteSeat] = useState(false);
  const [seatData, seatSeatData] = useState();

  // Manage State and API
  const updateSeatData = async () => {
    if (currentID === 0) {
      seatSeatData({
        id: '',
        name: '',
        type: '',
        active: 'true',
        description: '',
      });
      return;
    }
    const response = await fetch(
      `${process.env.API_URL}/Api/Seats/${currentID}`,
    );
    const jsonData = await response.json();
    seatSeatData(jsonData);
  };

  const submitData = async (data) => {
    const newSeat = data;
    delete newSeat.id;
    const requestData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newSeat),
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
    } else {
      console.log('there was an error');
    }
  };

  const seatInformationSchema = Yup.object().shape({
    name: Yup.string().trim().required('This field is required'),
    type: Yup.string().trim().required('This field is required'),
    description: Yup.string().trim().required('This field is required'),
  });

  // Effects
  useEffect(() => {
    updateSeatData();
  }, [currentID]);

  return (
    <Formik
      initialValues={seatData}
      validationSchema={seatInformationSchema}
      enableReinitialize
      onSubmit={(values) => {
        console.log(values);
        if (seatData.id === '') {
          setShowModalAddedSeat(true);
          submitData(values);
        } else {
          editData(values);
        }
      }}
    >
      {() => (
        <Form className='flex flex-col items-center w-full h-full gap-y-7'>
          {showModalDeleteSeat && (
            <WarningConfirmationModal
              text='Are you sure you want to delete this seat?'
              onYes={() => deleteSeat()}
              onNo={() => setShowModalDeleteSeat(false)}
              onClose={() => setShowModalDeleteSeat(false)}
            />
          )}
          <div className='w-full h-full'>
            <div className='flex flex-col w-full gap-3 mb-4 h-content'>
              <div className='grid grid-cols-3'>
                <div className='col-span-2'>
                  <p>Seat ID</p>
                  <Field
                    type='text'
                    id='id'
                    name='id'
                    placeholder='Seat ID'
                    className='w-full bg-iron'
                    disabled
                  />
                </div>
                <div>
                  <div className='flex flex-col items-center h-full'>
                    <span className='md:text-[12px] lg:body-normal'>
                      Active
                    </span>
                    <Field
                      className='flex-grow w-5 h-5'
                      type='checkbox'
                      name='active'
                      id='active'
                    />
                  </div>
                </div>
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
                  className='flex w-full h-24 md:h-32'
                  style={{ resize: 'none' }}
                  placeholder='Enter Seat Description'
                />
              </div>
            </div>
            <div className=' h-content pt-8 md:h-[70px] md:pt-0 content-center  gap-2 text-center flex flex-col items-stretch '>
              <div className='order-3 text-center md:col-span-1'>
                {currentID !== 0 && (
                  <button
                    type='button'
                    className='h-full text-valentine-red'
                    onClick={() => {
                      setShowModalDeleteSeat(true);
                    }}
                  >
                    DELETE
                  </button>
                )}
              </div>

              <div className='order-2 md:col-span-1'>
                <button type='submit' className='w-full px-0 py-0 button '>
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
