import { useState } from "react";
export default function Login(){
    const [ formData, setFormData ] = useState({
        email: "",
        username: "",
        password: "",
        permission: "user"
    })
    
    return(
        <>
        <h1>Register</h1>
            <p>Email: <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required/></p>
            <p>Username: <input type="text" value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} required/></p>
            <p>Password: <input type="password" value={formData.password} onChange={e => {setFormData({...formData, password: e.target.value}),console.log(formData)}} required/></p>
            <p><button onClick={register}>Register</button></p>
        </>
    )

        function register(){
            fetch("http://localhost:8000/api/register",{
                method: "POST",
                headers:{
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(formData)
            })
        }

}