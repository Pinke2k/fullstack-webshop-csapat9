import { useNavigate } from "react-router-dom";
import { useState } from "react";


export default function CreateButton () {

    const navigate = useNavigate();
	function CreateProduct() {
		navigate(`/admin/create-product`);
	}


    return (
        <>
        <button onClick={()=> CreateProduct()} > Termek letrehozas </button>
        </>
    )

}