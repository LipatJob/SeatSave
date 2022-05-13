import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function DesktopMenu({ links }) {
  const router = useRouter();

  return (
    <div className='flex flex-row items-center gap-10 body-small'>
      {links.map((link) => (
        <Link href={link.path} key={link.key}>
          {link.key === 3 ? (
            <button
              type='button'
              className={`button hover:bg-white hover:text-bluish ${
                router.pathname === '/librarian' ? 'bg-white text-bluish' : ''
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
      ))}
    </div>
  );
}
