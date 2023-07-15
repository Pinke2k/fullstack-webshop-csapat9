import useAuth from '../../../hooks/useAuth';
import { NavLink } from "react-router-dom";
import './AdminNav.css';


export default function AdminNav() {
    const { user } = useAuth();
    return(
        <>
        <div className='navbar'>
            <div className="logo">
                <NavLink to="/">Home</NavLink>
            </div>
            <ul className='links'>
                <li>
                    <NavLink to="/admin">Admin products</NavLink>
                </li>
                <li>
                    <NavLink to="/admin/customers">Admin vásárlók</NavLink>
                </li>
                <li>
                     <NavLink to="/admin/orders">Admin megrendelések</NavLink>
                </li>
                <li>
                    <NavLink to="/admin/categories">Kategóriák</NavLink>
                </li>
            </ul>
        </div>
        </>
    )
}