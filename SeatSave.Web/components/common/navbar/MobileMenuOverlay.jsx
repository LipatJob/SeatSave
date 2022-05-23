import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function MobileMenuOverlay({
  navbarOpen,
  setNavbarOpen,
  links,
  authService,
  onLogout,
}) {
  const router = useRouter();

  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  return (
    <div
      className={`fixed left-0 z-50 flex flex-col gap-10 w-full py-28 text-black top-20 bg-pearl-bush bg-opacity-100 transform delay-100 transition-all duration-300 ${
        navbarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'
      }`}
    >
      <div className='flex flex-col items-center gap-10 text-black'>
        {links.map(
          (link) =>
            (!link.restricted ||
              (!isSSR &&
                link.restricted &&
                authService.getUser().UserType === 'HeadLibrarian')) && (
              <div key={link.key}>
                {link.key === 3 ? (
                  <button
                    type='button'
                    className={`button ${
                      router.pathname === '/librarian'
                        ? 'bg-white text-bluish'
                        : ''
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setNavbarOpen(false);
                    }}
                  >
                    <Link href={link.path}>{link.name}</Link>
                  </button>
                ) : (
                  <button
                    type='button'
                    className={
                      router.pathname === link.path
                        ? 'border-b border-black'
                        : ''
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setNavbarOpen(false);
                    }}
                  >
                    <Link href={link.path}>{link.name}</Link>
                  </button>
                )}
              </div>
            ),
        )}

        <div className='flex flex-col items-center'>
          <Image
            src='/Divider3Dots.svg'
            width={31}
            height={5}
            layout='fixed'
            className='items-center'
          />
        </div>

        <button
          type='button'
          onClick={(e) => {
            e.preventDefault();
            setNavbarOpen(false);
            onLogout();
          }}
        >
          <h4>Log out</h4>
        </button>

        <div className='flex flex-col items-center'>
          <Image
            src='/MobileMenuDecoration.svg'
            width={138}
            height={215.98}
            layout='fixed'
            className='items-center'
          />
        </div>
      </div>
    </div>
  );
}
