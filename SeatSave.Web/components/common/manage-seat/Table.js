import Seat from "./Seat";
import SeatInformation from "./SeatInformation";

export default function Table({ header, body }) {
  return (
    <table className="w-full shadow-lg">
      <thead className="flex w-full bg-pearl-bush text-black">
        <tr><th className='py-4 pl-4'><h4>{header}</h4></th></tr>
      </thead>
      <tbody>
        <tr><td><div className='px-4 py-4 h-[550px]'>
          
          <Seat Name={'ABC'} Code={'A12'}></Seat>
          <Seat Name={'DEF'} Code={'A45'}></Seat>
          <Seat Name={'GHI'} Code={'A45'}></Seat>
          <Seat Name={'JKL'} Code={'A98'}></Seat>
          <div className="w-full text-right pt-72">
          <button
            className="p-0 w-16 h-16 bg-bluish rounded-full hover:bg-blue-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none">
              <svg viewBox="0 0 20 20" enableBackground="new 0 0 20 20" className="w-6 h-6 inline-block">
                <path fill="#FFFFFF" d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                C15.952,9,16,9.447,16,10z" />
              </svg>
            </button>
          </div>

        {/*<SeatInformation></SeatInformation>*/}
        </div></td></tr>
      </tbody>
    </table>
  );
}
