import VisitorNavbar from './navbar/VisitorNavbar';
import LibrarianNavbar from './navbar/LibrarianNavbar';
import LoginNavbar from './navbar/LoginNavbar';

export default function Navbar() {
  let page = 'LOGIN';

  if (page == 'VISITOR') {
    return <VisitorNavbar />;
  } else if (page == 'LIBRARIAN') {
    return <LibrarianNavbar />;
  } else {
    return <LoginNavbar />;
  }
}
