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
import './UpperNav.css'


function UpperNav() {
  const [toggleU, setToggle] = useState(false);

  const handleToggle = () => {
  setToggle(!toggleU);
  };

  const { user } = useAuth();
  return (
    <>
      <div className={toggleU ? 'uppernavbar expanded' : 'uppernavbar'}>
        <div className="logo">
          <NavLink to="/"><a href="https://www.freepnglogos.com/pics/coffee-logo-png" title="Home"><img src="https://www.freepnglogos.com/uploads/coffee-logo-png/coffee-house-creative-logo-vector-download-17.png" width="80" alt="coffee house creative logo vector download" /></a></NavLink>
        </div>
       
        <div className="top-right">
          <div className="profile">
            {user?.id ? (<>
              <NavLink to='/profile/:id'><Icon icon={person} size={30} /></NavLink>
              <button className="signOut"><Icon icon={logOut} size={30} /></button>
              <NavLink to='/cart'><Icon icon={shoppingCart} size={30} /></NavLink>
            </>) : (<>
              <NavLink to="/user/login">Belépés</NavLink>
              <NavLink to="/user/register">Regisztráció</NavLink>
            </>)}
          </div>
        </div>
        
      </div>
    </>
  );
}

export default UpperNav;