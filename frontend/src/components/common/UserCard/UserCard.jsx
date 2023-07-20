import './UserCard.css';
import { useState } from 'react';


export default function UserCard(props){
    
    return  (
        <div className="users-card">
            
             <div className="users-content">
                <h2 className="users-name">{props.users.id}</h2>

                {/* <h2 className="users-name">{props.users.username}</h2> */}
    
                <h2 className="users-email">{props.users.email}</h2> 
    
              
            </div>
        </div>
    );

}