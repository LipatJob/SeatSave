import React from 'react';
import { HiOutlineLogin, HiOutlineLogout } from 'react-icons/hi';
import Pagination from './Pagination';

export default function ViewBookingsTable() {
  return (
    <div className='relative mt-12 overflow-x-auto'>
      <table className='w-full text-center'>
        <thead className='font-bold bg-pearl-bush'>
          <tr className='h-16'>
            <th>Booking ID</th>
            <th>Seat</th>
            <th>Visitor</th>
            <th>Booking Period</th>
            <th>Status</th>
            <th>Check In / Out</th>
          </tr>
        </thead>
        <tbody>
          <tr className='h-20 bg-white border-b hover:bg-iron whitespace-nowrap'>
            <td className='px-2'>XkeRvmSioV</td>
            <td className='px-2'>R01</td>
            <td className='px-2'>
              <div>John Doe</div>
              <div>
                <u>johndoe@live.mcl.edu.ph</u>
              </div>
            </td>
            <td className='px-2'>
              <div>10:00 am April 12, 2022</div>
              <div>11:00 am April 12, 2022</div>
            </td>
            <td className='px-2'>Completed</td>
            <td className='px-2'>
              <div className='flex flex-row items-center justify-center gap-1'>
                <span className='text-soft-blue'>
                  <HiOutlineLogin />
                </span>
                10:02 am April 12, 2022
              </div>
              <div className='flex flex-row items-center justify-center gap-1'>
                <span className='text-valentine-red'>
                  <HiOutlineLogout />
                </span>
                10:50 am April 12, 2022
              </div>
            </td>
          </tr>
          <tr className='h-20 bg-white border-b hover:bg-iron whitespace-nowrap'>
            <td className='px-2'>XkeRvmSioV</td>
            <td className='px-2'>R01</td>
            <td className='px-2'>
              <div>John Doe</div>
              <div>
                <u>johndoe@live.mcl.edu.ph</u>
              </div>
            </td>
            <td className='px-2'>
              <div>10:00 am April 12, 2022</div>
              <div>11:00 am April 12, 2022</div>
            </td>
            <td className='px-2'>Completed</td>
            <td className='px-2'>
              <div className='flex flex-row items-center justify-center gap-1'>
                <span className='text-soft-blue'>
                  <HiOutlineLogin />
                </span>
                10:02 am April 12, 2022
              </div>
              <div className='flex flex-row items-center justify-center gap-1'>
                <span className='text-valentine-red'>
                  <HiOutlineLogout />
                </span>
                10:50 am April 12, 2022
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination />
    </div>
  );
}
