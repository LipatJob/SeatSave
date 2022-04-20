import Image from 'next/image';
import Layout from '../../components/Layout'
import Table from '../../components/common/manage-seat/Table';

export default function ManageSeats() {
    return (
    <div className='page-container '>
      <div className='h-fit pb-4 '><h1>ManageSeats</h1></div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div id="leftPanel" className=' md:col-span-1'>
        <Table header='Available Seats'></Table>
      </div>
      <div id="rightPanel" className=' md:col-span-2'>
        {/*
        <div className="max-h-[570px] w-full text-center pt-10">
          <Image src='/ManageSeatsDecoration.png' width={500} height={500} ></Image>
        </div>
        */} 
        <Table header='Seat Information'></Table>
      </div>
      </div>
    </div>
    )
}