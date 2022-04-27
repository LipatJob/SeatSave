import React from 'react';
import { ErrorMessage, Field } from 'formik';

export default function StudentInformationForm({
  departments,
  programs,
  values,
}) {
  const selectedDepartment = 'department' in values && values.department;
  return (
    <>
      <div className='w-full'>
        <p className='font-light body-small'>Department</p>
        <Field as='select' name='department' id='department' className='w-full'>
          <option value='' disabled hidden>
            Select Department
          </option>
          {departments.map((department) => (
            <option key={department} value={department}>
              {department}
            </option>
          ))}
        </Field>
        <ErrorMessage
          name='department'
          component='span'
          className='text-error'
        />
      </div>
      <div className='w-full'>
        <p className='font-light body-small'>Program/Strand</p>
        <Field
          as='select'
          name='programStrand'
          id='programStrand'
          className='w-full'
        >
          <option value='' disabled hidden>
            Select Program/Strand
          </option>
          {selectedDepartment in programs &&
            programs[selectedDepartment].map((program) => (
              <option key={program} value={program}>
                {program}
              </option>
            ))}
        </Field>
        <ErrorMessage
          name='programStrand'
          component='span'
          className='text-error'
        />
      </div>
      <div className='w-full'>
        <p className='font-light body-small'>Year/Grade Level</p>
        <Field as='select' name='yearGrade' id='yearGrade' className='w-full'>
          <option value='' disabled hidden>
            Year/Grade Level
          </option>
          {values.department && values.department === 'SHS' ? (
            <>
              <option value='Grade 11'>Grade 11</option>
              <option value='Grade 12'>Grade 12</option>
            </>
          ) : (
            <>
              <option value='First Year'>First Year</option>
              <option value='Second Year'>Second Year</option>
              <option value='Third Year'>Third Year</option>
              <option value='Fourth Year'>Fourth Year</option>
              <option value='Fifth Year'>Fifth Year</option>
            </>
          )}
        </Field>
        <ErrorMessage
          name='yearGrade'
          component='span'
          className='text-error'
        />
      </div>
    </>
  );
}
