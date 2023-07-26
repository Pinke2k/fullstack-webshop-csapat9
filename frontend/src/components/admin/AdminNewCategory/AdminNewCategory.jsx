import './AdminNewCategory.css';
import { useState } from "react";
import { createCategory } from '../../../services/api-fetch';
import { useNavigate, useParams } from "react-router-dom";



export default function AdminCategory(){

    const [category, setCategory] = useState("");
    const navigate = useNavigate();
    const categoryChangeHandle = (event) => {
		setCategory(event.target.value);
	};

    function handleClick(){
        createCategory(category)
        navigate(`/admin/categories`)
    }
  


    return(
        <>
            <div className="wrapper-category">
                <h1>Kategória létrehozása</h1>
                <input
				    className="categoryInput"
				    type="text"
				    placeholder="Kategória neve"
				    value={category}
				    onChange={categoryChangeHandle}
                />
                <button className="searchButtonBack" onClick={handleClick}>
                    Létrehozás
			    </button>
            </div>
        </>
    )
}