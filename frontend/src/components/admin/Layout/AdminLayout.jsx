import { Outlet } from 'react-router-dom';
import AdminNav from '../AdminNav/AdminNav';
import useAuth from '../../../hooks/useAuth';
import { NavLink } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import MainDash from '../Dashboard/MainDash';

export default function AdminLayout() {
  const { user } = useAuth();
  console.log(user, 'user');

  if (user?.isAdmin === 0) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {user?.isAdmin ? (
        <>
          <AdminNav />
          <MainDash/>
          <Outlet />
        </>
      ) : (
        <Navigate to="/"></Navigate>
      )}
    </>
  );
  // return (
  //   <>
  //     <AdminNav />
  //     <Outlet />
  //   </>
  // );
}
