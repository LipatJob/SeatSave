import Navbar from './common/Navbar';
import Footer from './common/Footer';

export default function Layout({ children, page }) {
  return (
    <>
      <Navbar page={page} />
      <main className='py-16'>{children}</main>
      <Footer />
    </>
  );
}
