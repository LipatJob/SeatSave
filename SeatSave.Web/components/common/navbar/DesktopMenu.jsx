import React from 'react';
import Link from 'next/link';

export default function DesktopMenu({ links }) {
  return (
    <div className='flex flex-row gap-10 body-small'>
      {links.map((link) => (
        <Link href={link.path} key={link.key}>
          {link.name}
        </Link>
      ))}
    </div>
  );
}
