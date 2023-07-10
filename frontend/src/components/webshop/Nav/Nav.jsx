import useAuth from '../../../hooks/useAuth';

function Nav() {
  const { user } = useAuth();
  return <div>Nav hello: {user?.email || 'idegen'}</div>;
}

export default Nav;
