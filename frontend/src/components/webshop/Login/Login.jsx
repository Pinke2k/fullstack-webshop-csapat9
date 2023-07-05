import { useState } from "react";
import { useCookies } from "react-cookie"
import { VITE_API_URL } from "import.meta.env"
console.log(VITE_API_URL)
export default function Login(){
    const [ formData, setFormData ] = useState({
        email: "",
        password: "",
    });
    const [cookies, setCookie] = useCookies(["user"]);
    
    return(
        <>
        <h1>Login</h1>
            <p>Email: <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required/></p>
            <p>Password: <input type="password" value={formData.password} onChange={e => {setFormData({...formData, password: e.target.value}),console.log(formData)}} required/></p>
            <p><button onClick={login}>Login</button></p>
        </>
    )

        function login(){
            console.log(formData)
            fetch(`${process.env.VITE_API_URL}/api/login`,{
                method: "POST",
                headers:{
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(formData)
            })
            .then(resp => resp.json())
            .then(body => {
                setCookie("sessionID",body.sessionID);
                
            })
        }

}