import Footer from './common/Footer';

export default function Layout({ children }) {
  return (
    <>
      <main>{children}</main>
      <Footer />
    </>
  );
}
