import useAuth from '../../../hooks/useAuth';
import { NavLink } from "react-router-dom";


export default function AdminNav() {
    const { user } = useAuth();
    return(
        <>
            <div>
                <div className="admin">
                    <NavLink to="/admin">Admin</NavLink>
                </div>
                <ul>
                    <li>
                        <NavLink to="/admin/products">Admin products</NavLink>
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