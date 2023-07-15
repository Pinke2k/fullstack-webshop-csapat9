import useAuth from '../../../hooks/useAuth';
import { NavLink } from "react-router-dom";


function Nav() {
  const { user } = useAuth();
  return (
  <>
   <div>Nav hello: {user?.email || 'idegen'}</div>;
  <div>
    <div className="logo">
      <NavLink to="/">Főoldal/logo</NavLink>
    </div>
    <ul className="links">
      <li>
        <NavLink to="/products">Termékek</NavLink>
      </li>
      <li>
        <NavLink to="/aboutus">Rolunk</NavLink>
      </li>
      <li>
        <NavLink to="/contact">Kapcsolat</NavLink>
      </li>
      <li>
        <NavLink to="/orders">Megrendeléseim</NavLink>
      </li>
      <li>
        <NavLink to="/user/login">Belépés</NavLink>
      </li>
      <li>
        <NavLink to="/user/register">Regisztráció</NavLink>
      </li>
      <li>
        <NavLink to="/profile/:id">Profil</NavLink>
      </li>
      <li>
        <NavLink to="/cart">Kosár</NavLink>
      </li>
    </ul>
  </div>
</>
); 
   
}

export default Nav;
