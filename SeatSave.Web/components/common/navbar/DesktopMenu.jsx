import React from 'react';
import Link from 'next/link';

export default function DesktopMenu({ links }) {
  return (
    <div className='flex flex-row gap-10 body-small'>
      {links.map((link, index) => {
        return (
          <Link href={link.path}>
            <a key={index}>{link.name}</a>
          </Link>
        );
      })}
    </div>
  );
}
