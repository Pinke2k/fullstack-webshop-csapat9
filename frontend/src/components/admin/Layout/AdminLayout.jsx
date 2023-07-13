import { Outlet } from 'react-router-dom';
import AdminNav from '../AdminNav/AdminNav'

export default function AdminLayout() {
  return (
  <>
    <AdminNav/>
    <Outlet/>
  </>
  )
}
