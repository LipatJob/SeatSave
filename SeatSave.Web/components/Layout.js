import Footer from './common/Footer';

export default function Layout({ children }) {
  return (
    <>
      <main className='py-16'>{children}</main>
      <Footer />
    </>
  );
}
