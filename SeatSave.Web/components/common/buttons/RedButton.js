export default function RedButton({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className='bg-valentine-red hover:bg-[#DA291C] text-white text-xl font-bold uppercase py-2 px-4'
    >
      {text}
    </button>
  );
}
