import { HiOutlineUser } from 'react-icons/hi';
import { HiOutlineChevronDown } from 'react-icons/hi';

export default function MobileMenu() {
  return (
    <button className='flex flex-row'>
      <HiOutlineUser />
      <HiOutlineChevronDown />
    </button>
  );
}
