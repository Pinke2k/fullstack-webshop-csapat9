import { Outlet } from 'react-router-dom';
import Nav from '../Nav/Nav';
import { Footer } from '../Footer/Footer';
import UpperNav from '../UpperNav/UpperNav';

function Layout() {
  return (
    <>
      <UpperNav/>
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
