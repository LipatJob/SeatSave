export default function GreyButton({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className='px-4 py-2 text-xl font-bold text-white uppercase bg-dawn hover:bg-zinc-500'
    >
      {text}
    </button>
  );
}
