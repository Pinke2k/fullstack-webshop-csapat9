import './AdminCustomer.css';
import { readUsers } from '../../../services/api-fetch';
import { useEffect, useState } from "react"
import UserCard from '../../common/UserCard/UserCard';

export default function AdminCustomer(){
    const [UserList, setUserList] = useState()
     //const [SortedList, setSortedList] = useState([])
    
    useEffect(() => {
		readUsers().then((users) => { 
			setUserList(users);
			
		});
	}, []);
    
    
    return(
        <>
        <div className="users-box">
            {UserList?.map((p) => (
             <UserCard users = {p} key = {p.id}/> 
             
             ))} 
             
        </div>
        </>

    )
}