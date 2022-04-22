export default function Seat({ Name, Code }) {
  return (
    <div className='flow-root pb-2'>
      <button className="float-left w-full border-2 border-iron bg-transparent px-4 text-left
       text-black hover:bg-pearl-bush hover:text-black focus:bg-pearl-bush ">
          {Name} 
          <span className="float-right text-dawn">{Code}</span>
          </button>
    </div>
  );
}
