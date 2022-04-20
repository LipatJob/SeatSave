export default function GreyButton({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className='bg-dawn hover:bg-zinc-500 text-white text-xl font-bold uppercase py-2 px-4'
    >
      {text}
    </button>
  );
}
