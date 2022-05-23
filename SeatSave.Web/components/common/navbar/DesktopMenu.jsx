import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function DesktopMenu({ links, authService }) {
  const router = useRouter();

  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  return (
    <div className='flex flex-row items-center gap-10 body-small'>
      {links.map(
        (link) =>
          (!link.restricted ||
            (!isSSR &&
              link.restricted &&
              authService.getUser().UserType === 'HeadLibrarian')) && (
            <Link href={link.path} key={link.key}>
              {link.key === 3 ? (
                <button
                  type='button'
                  className={`button hover:bg-white hover:text-bluish ${
                    router.pathname === '/librarian'
                      ? 'bg-white text-bluish'
                      : ''
                  }`}
                >
                  {link.name}
                </button>
              ) : (
                <button
                  type='button'
                  className={`hover:border-b ${
                    router.pathname === link.path ? 'border-b' : ''
                  }`}
                >
                  {link.name}
                </button>
              )}
            </Link>
          ),
      )}
    </div>
  );
}
