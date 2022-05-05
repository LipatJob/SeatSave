import React from 'react';
import Navbar from './common/Navbar';
import Footer from './common/Footer';

export default function Layout({ children, page }) {
  return (
    <>
      <Navbar page={page} />
      <main className='pb-20 pt-36'>{children}</main>
      <Footer />
    </>
  );
}
