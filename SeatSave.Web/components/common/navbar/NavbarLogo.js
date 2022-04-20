import Image from 'next/image';

export default function NavbarLogo() {
  return (
    <>
      <div className='lg:hidden mt-2'>
        <Image src='/logo-icon.png' width={54} height={54} />
      </div>
      <div className='hidden lg:block mt-2'>
        <Image src='/logo.png' width={246} height={53} />
      </div>
    </>
  );
}
