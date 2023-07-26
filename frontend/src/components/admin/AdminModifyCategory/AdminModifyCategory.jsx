import './AdminModifyCategory.css';
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify"
import { updateCategory, getCategoryList } from '../../../services/api-fetch';

export default function AdminModifyCategory(){

    const [newName, setNewName] = useState("");
    const [categoryModify, setCategoryModify] = useState("");
    const { id } = useParams();
    console.log(id)
    const navigate = useNavigate();
    useEffect(() => {
		getCategoryList().then((data) => {
			const categoryToModify = data.find(
				(category) => category.id === id,
			);
                //setCategoryModify(categoryToModify)
		});
	}, [categoryModify, id]);
    
    function handleNameChange(e){
        setNewName(e.target.value) 
       
    }

    function handleSubmit (e) {
        e.preventDefault();
        updateCategory(id,newName)
        .then(() => {
            navigate("/admin/categories");
            toast.success("Kategória sikeresen módosítva!", {
                position: toast.POSITION.TOP_RIGHT,
            });
        })
        .catch((error) => {
            toast.error(`Hiba történt a termék módosítása közben: ${error.message}`, {
                position: toast.POSITION.TOP_RIGHT,
            });
        });


    }



    return(
        
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Új név:</label>
            <p><input 
            type="text"
            value={newName}
            onChange={handleNameChange}
            required
            placeholder="Ird be az új nevet"
            ></input></p>
            <p><button type="submit">Mentés</button></p>
        </form>
    )
}