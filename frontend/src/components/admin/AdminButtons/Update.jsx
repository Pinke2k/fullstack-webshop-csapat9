import { useNavigate } from "react-router-dom";
import { useState } from "react";


export default function UpadateButton (props) {

    const navigate = useNavigate();
	const [id, setId] = useState(props.id);
	function modifyProduct(id) {
		navigate(`/admin/products/:${id}/update`);
	}


    return (
        <>
        <button onClick={()=> modifyProduct(props.id)} > Modositas </button>
        </>
    )

}