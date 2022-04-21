import React from 'react';
import { Menu } from '@headlessui/react';
import { HiOutlineUser, HiOutlineChevronDown } from 'react-icons/hi';

export default function AccountButton() {
  return (
    <Menu>
      <Menu.Button className='flex flex-row'>
        <HiOutlineUser />
        <HiOutlineChevronDown />
      </Menu.Button>
      <Menu.Items className='absolute flex flex-col p-4 text-black bg-white right-6 drop-shadow-lg'>
        <Menu.Item>
          <span className='p-2 opacity-75'>student@live.mcl.edu.ph</span>
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button className={`${active && 'bg-bluish text-white'} p-2 text-left`}>
              Log out
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}
