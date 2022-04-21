import Navbar from './common/Navbar';
import Footer from './common/Footer';

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className='py-16'>{children}</main>
      <Footer />
    </>
  );
}
