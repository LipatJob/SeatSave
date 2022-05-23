import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import SeatService from '../../../services/SeatService';
import OkModal from '../../common/OkModal';
import WarningConfirmationModal from '../../common/WarningConfirmationModal';

export default function SeatInformationForm({
  seatTypes,
  goToPreviousFormPart,
  onAvailableSeatsUpdated,
  currentID,
}) {
  const [seatData, setSeatData] = useState({
    id: '',
    name: '',
    type: '',
    active: 'true',
    description: '',
  });
  const [seatName, setSeatName] = useState();
  const [showModalDeleteSeat, setShowModalDeleteSeat] = useState(false);
  const [showModalAddedSeat, setShowModalAddedSeat] = useState(false);

  const updateSeatData = async () => {
    const response = await fetch(
      `${process.env.API_URL}/Api/Seats/${currentID}`,
    );
    const jsonData = await response.json();
    setSeatData(jsonData);
  };

  const addSeat = async (data) => {
    const newSeat = data;
    delete newSeat.id;
    SeatService.addSeat(newSeat).then((response) => {
      setSeatName(response.name);
      onAvailableSeatsUpdated();
    });
  };

  const editData = async (data) => {
    console.log(data);

    SeatService.updateSeat(data).then((response) => {
      console.log(response);
      onAvailableSeatsUpdated();
      goToPreviousFormPart();
    });
  };

  const deleteSeat = async () => {
    SeatService.deleteSeat(currentID).then(() => {
      goToPreviousFormPart();
      setShowModalDeleteSeat(false);
      onAvailableSeatsUpdated();
    });
  };

  const seatInformationSchema = Yup.object().shape({
    name: Yup.string().trim().required('This field is required'),
    type: Yup.string().trim().required('This field is required'),
    description: Yup.string().trim().required('This field is required'),
  });

  // Effects
  useEffect(() => {
    if (currentID !== null) {
      updateSeatData();
    }
  }, [currentID]);

  return (
    <>
      {showModalAddedSeat && (
        <OkModal
          onOk={() => {
            setShowModalAddedSeat(false);
            goToPreviousFormPart();
          }}
          onClose={() => {
            setShowModalAddedSeat(false);
            goToPreviousFormPart();
          }}
          message={
            <div>
              <h4 className='mb-6'>Seat Added!</h4>
              <p className='body-normal'>
                You have successfully added a new seat:
                <br /> {seatName}
              </p>
            </div>
          }
        />
      )}
      <Formik
        initialValues={seatData}
        validationSchema={seatInformationSchema}
        enableReinitialize
        onSubmit={(values) => {
          if (currentID === null) {
            setShowModalAddedSeat(true);
            addSeat(values);
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
                      <option value={seat} key={seat}>
                        {seat}
                      </option>
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
              <div className='flex flex-col items-stretch content-center gap-2 pt-8 text-center h-content md:pt-0'>
                <div className='order-3 text-center md:col-span-1'>
                  {currentID !== 0 && (
                    <button
                      type='button'
                      className='h-full py-3 text-valentine-red'
                      onClick={() => {
                        setShowModalDeleteSeat(true);
                      }}
                    >
                      DELETE
                    </button>
                  )}
                </div>

                <div className='order-2 md:col-span-1'>
                  <button type='submit' className='w-full button '>
                    SAVE
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
