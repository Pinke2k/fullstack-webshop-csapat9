import useAuth from '../../../hooks/useAuth';
import { NavLink } from "react-router-dom";
import React, { useState, useContext } from "react";
import { Icon } from "react-icons-kit";
import { menu } from "react-icons-kit/feather/menu";
import { x } from "react-icons-kit/feather/x";
import { logIn } from 'react-icons-kit/feather/logIn'
import { userPlus } from 'react-icons-kit/feather/userPlus';
import { logOut } from 'react-icons-kit/feather/logOut';
import { person } from 'react-icons-kit/oct/person'
import { shoppingCart } from 'react-icons-kit/typicons/shoppingCart'
import './Nav.css'


function Nav() {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const { user } = useAuth();
  return (
    <>
      <div className={toggle ? 'navbar expanded' : 'navbar'}>
        <div className="logo">
          <NavLink to="/">Főoldal</NavLink>
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
        </ul>
        <div className="top-right">
          <div className="profile">
            {user?.id ? (<>
              <NavLink to='/profile/:id'><Icon icon={person} size={30} /></NavLink>
              <button className="signOut"><Icon icon={logOut} size={30} /></button>
              <NavLink to='/cart'><Icon icon={shoppingCart} size={30} /></NavLink>
            </>) : (<>
              <NavLink to="/user/login"><Icon icon={logIn} size={30} /></NavLink>
              <NavLink to="/user/register"><Icon icon={userPlus} size={30} /></NavLink>
            </>)}
          </div>
        </div>
        <div className="toggle-icon" onClick={handleToggle}>
          {toggle ? <Icon icon={x} size={30} /> : <Icon icon={menu} size={30} />}
        </div>
      </div>
    </>
  );
}

export default Nav;
