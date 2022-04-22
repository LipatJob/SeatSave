import React from 'react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className='bottom-0 z-0 w-full'>
      <div className='bg-rodeo-dust'>
        <div className='flex flex-col justify-between py-6 page-container-small lg:flex-row lg:py-12'>
          <div className='flex flex-col gap-2'>
            <p className='text-sm font-bold lg:text-base'>Links</p>
            <div className='flex flex-col gap-2 lg:flex-row lg:gap-4'>
              <a href='' className='text-sm lg:text-base'>
                <u>Malayan Colleges Laguna</u>
              </a>
              <a href='' className='text-sm lg:text-base'>
                <u>MCL Center for Learning and Information Resources</u>
              </a>
            </div>
          </div>
          <div className='mt-10 lg:mt-0'>
            <Image src='/logo.png' width={246} height={53} />
          </div>
        </div>
      </div>
      <div className='flex justify-center items-center bg-[#1E1E1E] text-white h-14 lg:h-16'>
        <p className='text-xs lg:text-sm'>
          Copyright © 2022. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
