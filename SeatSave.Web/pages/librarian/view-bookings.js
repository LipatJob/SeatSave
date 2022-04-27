import React from 'react';
import ViewBookingsForm from '../../components/librarian/view-bookings/ViewBookingsForm';
import ViewBookingsTable from '../../components/librarian/view-bookings/ViewBookingsTable';

// dummy data
const bookingsData = [
  {
    id: 'XkeRvmSioV1',
    seat: 'R01',
    visitor: {
      name: 'John Doe',
      email: 'johndoe@live.mcl.edu.ph',
    },
    date: 'April 12, 2022',
    period: {
      timeStart: '10:00 am',
      timeEnd: '11:00 am',
    },
    status: 'Completed',
    checkedIn: '10:02 am',
    checkedOut: '10:50 am',
  },
  {
    id: 'XkeRvmSioV2',
    seat: 'R01',
    visitor: {
      name: 'John Doe',
      email: 'johndoe@live.mcl.edu.ph',
    },
    date: 'April 12, 2022',
    period: {
      timeStart: '10:00 am',
      timeEnd: '11:00 am',
    },
    status: 'Pending',
    checkedIn: '',
    checkedOut: '',
  },
  {
    id: 'XkeRvmSioV3',
    seat: 'R01',
    visitor: {
      name: 'John Doe',
      email: 'johndoe@live.mcl.edu.ph',
    },
    date: 'April 12, 2022',
    period: {
      timeStart: '10:00 am',
      timeEnd: '11:00 am',
    },
    status: 'Cancelled',
    checkedIn: '',
    checkedOut: '',
  },
  {
    id: 'XkeRvmSioV4',
    seat: 'R01',
    visitor: {
      name: 'John Doe',
      email: 'johndoe@live.mcl.edu.ph',
    },
    date: 'April 12, 2022',
    period: {
      timeStart: '10:00 am',
      timeEnd: '11:00 am',
    },
    status: 'Checked In',
    checkedIn: '10:02 am',
    checkedOut: '',
  },
];

export default function ViewBookings() {
  return (
    <div className='page-container'>
      <h1>View Bookings</h1>
      <ViewBookingsForm />
      <ViewBookingsTable bookings={bookingsData} />
    </div>
  );
}

ViewBookings.page = 'ViewBookings';
