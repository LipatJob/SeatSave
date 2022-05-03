import React from 'react';
import Link from 'next/link';

export default function DesktopMenu({ links }) {
  return (
    <div className='flex flex-row items-center gap-10 body-small'>
      {links.map((link) => (
        <Link href={link.path} key={link.key}>
          {link.key === 3 ? (
            <button type='button' className='button hover:bg-white hover:text-bluish'>{link.name}</button>
          ) : (
            link.name
          )}
        </Link>
      ))}
    </div>
  );
}
