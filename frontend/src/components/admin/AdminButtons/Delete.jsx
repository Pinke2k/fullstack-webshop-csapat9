import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { deleteProduct, readProducts } from '../../../services/api-fetch';
import { toast } from "react-toastify";



export default function DeleteButton (props) {

    const navigate = useNavigate();
	const [id, setId] = useState(props.id);
	function deleteProductt(id) {
		navigate(`/admin/products/${id}/delete`);
        
	}


    return (
        <> 
        <button className = "gommmb" onClick={()=> deleteProductt(props.id)} > Torles </button>
        </>
    )

}