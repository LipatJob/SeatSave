import Image from 'next/image';


export default function ManageSeats() {
    return (
<div class='bg-slate-200 min-h-screen min-w-screen flex items-center justify-center'>     
<div className="grid grid-cols-3 gap-4 h-auto min-h-screen ">
<div className="col-span-1 flex flex-col items-center">
<div className="py-8"><h1>Manage Seats</h1></div>
<div className="w-full">
<table className="w-full border-pearl-bush border-2">
<thead className="flex w-full bg-pearl-bush text-black">
<tr>
<th className='py-4 pl-4'><h4>Available Seats</h4></th>
</tr>
</thead>
<tbody>
<div className='px-4 py-4'></div>
<tr>
<td className='px-4 flow-root'><button className="float-left w-full border-2 border-iron bg-transparent px-4 text-left text-black hover:bg-pearl-bush hover:text-black focus:border-4 focus:border-blue-300 "> ABCD <span class="float-right text-dawn">132</span></button></td>
</tr>
<tr>
<td className='px-4 flow-root'><button className="float-left w-full border-2 border-iron bg-transparent px-4 text-left text-black hover:bg-pearl-bush hover:text-black focus:border-4 focus:border-blue-300 "> ABCD <span class="float-right text-dawn">132</span></button></td>
</tr>
<tr>
<td className='px-4 flow-root'><button className="float-left w-full border-2 border-iron bg-transparent px-4 text-left text-black hover:bg-pearl-bush hover:text-black focus:border-4 focus:border-blue-300 "> ABCD <span class="float-right text-dawn">132</span></button></td>
</tr>
<div className='px-4 py-40'></div>

<div class="w-full text-right pr-4 pb-4">

<button
class="p-0 w-16 h-16 bg-bluish rounded-full hover:bg-blue-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none">
<svg viewBox="0 0 20 20" enable-background="new 0 0 20 20" class="w-6 h-6 inline-block">
<path fill="#FFFFFF" d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
C15.952,9,16,9.447,16,10z" />
</svg>
</button>
</div>


</tbody>
</table>
</div>
</div>
{/* 
<div className="col-span-2 w-full text-center pt-16">
<Image className="items-center" src='/ManageSeatsDecoration.png' width={500} height={500}></Image>
</div>
*/}  
<div className="w-full pt-32 col-span-2">
<table className="w-full border-pearl-bush border-2">
<thead className="flex w-full bg-pearl-bush text-black">
<tr>
<th className='py-4 pl-4'><h4>Seat Information</h4></th>
</tr>
</thead>
<tbody>


<div class="flex-auto p-4 pb-8">

<div class="w-full">
<div class="h-6 mt-3 text-black leading-8 ">Seat ID</div>
<div class="my-2 bg-iron p-1 flex border border-iron w-3/12"> 
<input placeholder="Text" class="p-1 px-2 bg-iron appearance-none outline-none w-full text-black"></input>  </div>
</div>

<div class="w-full">
<div class="h-6 mt-3 text-black leading-8 ">Name</div>
<div class="my-2 bg-white p-1 flex border border-iron"> 
<input placeholder="Enter Seat Name" class="p-1 px-2 appearance-none outline-none w-full text-black"></input>  </div>
</div>

<div class="w-full">
<div class="h-6 mt-3 text-black leading-8 ">Seat Type</div>

<div class="relative inline-flex  w-full">
  <svg class="w-4 h-4 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fill-rule="nonzero"/></svg>
  <select  class=" border  w-full border-iron flex  p-1 px-2  text-black h-10  bg-white hover:border-gray-400 focus:outline-none appearance-none">
  <option value="" disabled selected>Select seat type</option>
  <option value="1">Carrel Desk</option>
  <option value="2">Carrel Desk with Outlet</option>
  </select>
</div>

<div class="w-full">
<div class="h-6 mt-3 text-black leading-8 ">Description</div>
<div class="my-2 bg-white p-1 flex border border-iron"> 
<textarea id="w3review" name="w3review" rows="4" cols="100" style= {{resize: "none"}}></textarea>
 </div>
</div>

<div className="grid grid-cols-5" >
<div className="p-2 pl-5 pr-5 col-span-1 text-center text-valentine-red">DELETE</div>
<div className="col-span-1"></div>
<div className="p-2 pl-5 pr-5 col-span-1">
<input type="checkbox" class="form-checkbox h-4 w-4 mr-2 text-dusk-blue" checked></input>
      Activate Seat
</div>
<div className="col-span-1">
<button class="p-2 pl-5 pr-5 bg-dawn text-white focus:border-4 text-center ">CANCEL</button>
</div>
<button class="p-2 pl-5 pr-5 bg-bluish text-white focus:border-4 w-full ">SAVE</button>
</div>

</div> 
</div>

</tbody>
</table>
</div>
</div>
</div>   


    )
}