export default function Button({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className='bg-bluish hover:bg-dusk-blue text-white text-xl font-bold uppercase py-2 px-4'
    >
      {text}
    </button>
  );
}
