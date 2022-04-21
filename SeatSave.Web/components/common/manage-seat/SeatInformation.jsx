import Button from "../buttons/Button";
import GreyButton from "../buttons/GreyButton";

export default function SeatInformation({ }) {
  return (
  <div className="px-4 w-full">


    <div className="h-6 text-black leading-8 "> <p className="body-small">Seat ID</p> </div>
    <div className="my-2 bg-iron p-1 flex border border-iron w-3/12">
    <input placeholder="Text" className="p-1 px-2 bg-iron appearance-none outline-none w-full text-black"></input>  
    </div>


    <div className="h-6  text-black leading-8 "><p className="body-small">Name</p> </div>
    <div className="my-2 bg-white p-1 flex border border-iron"> 
    <input placeholder="Enter Seat Name" className="p-1 px-2 appearance-none outline-none w-full text-black"></input>  
    </div>


    <div className="h-6  text-black leading-8 "> <p className="body-small">Type</p> </div>
    <div className="my-2 relative inline-flex  w-full">
    <svg className="w-4 h-4 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fillRule="nonzero"/></svg>
    <select defaultValue={"0"}  className=" border  w-full border-iron flex  p-1 px-2  text-black h-12  bg-white hover:border-gray-400 focus:outline-none appearance-none">
    <option value="0" disabled >Select Seat Type</option>
    <option value="1">Carrel Desk</option>
    <option value="2">Carrel Desk with Outlet</option>
    </select>
    </div>
            
    <div className="h-6 text-black leading-8 "> <p className="body-small">Description</p> </div>
    <div className="my-2 pb-4 bg-white p-1 flex border border-iron"> 
    <textarea rows="4" className="w-full" style= {{resize: "none"}}></textarea>
    </div>

    <div className="grid grid-cols-4 w-full text-center content-center py-8" >
    <div className="col-span-1 text-valentine-red pt-2">DELETE</div>
    <div className="col-span-1 pt-2">
        <input type="checkbox" className="form-checkbox h-4 w-4 mr-2 text-dusk-blue" defaultChecked></input>Activate Seat
    </div> 
    <div className="col-span-1"><GreyButton text={'CANCEL'}></GreyButton></div>
    <div className="col-span-1"><Button text={'SAVE'} className='w-full'></Button></div>        
    </div>    
                  
  </div>
  );
}
