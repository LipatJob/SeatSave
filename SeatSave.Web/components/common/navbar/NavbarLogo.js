import Image from 'next/image';

export default function NavbarLogo() {
  return (
    <>
      <div className='lg:hidden flex'>
        <Image src='/logo-icon.png' width={54} height={54} />
      </div>
      <div className='hidden lg:block'>
        <Image src='/logo.png' width={246} height={53} />
      </div>
    </>
  );
}
