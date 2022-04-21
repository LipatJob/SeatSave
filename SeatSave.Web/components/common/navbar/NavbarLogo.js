import Image from 'next/image';

export default function NavbarLogo() {
  return (
    <>
      <div className='mt-2 lg:hidden'>
        <Image src='/logo-icon.png' width={54} height={54} />
      </div>
      <div className='hidden mt-2 lg:block'>
        <Image src='/logo.png' width={246} height={53} />
      </div>
    </>
  );
}
