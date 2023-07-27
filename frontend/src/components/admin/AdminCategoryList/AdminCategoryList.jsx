
import './AdminCategorylist.css';
import { useEffect, useState } from "react"
import {getCategoryList} from '../../../services/api-fetch'
import { useNavigate } from "react-router-dom";



export default function AdminProducts(){
    const [categoryList, setCategoryList] = useState()
     //const [SortedList, setSortedList] = useState([])
     const navigate = useNavigate()
    
    useEffect(() => {
		getCategoryList().then((category) => { 
			setCategoryList(category);
            console.log(category)
			
		});
	}, []);

    console.log("fdgd", categoryList)
 
    function CreateCategory () {
        navigate(`/admin/categories/new-category`)
    }

    function ModifyCategory (id) {
        navigate(`/admin/categories/${id}/update`)
    }

    function DeleteCategory (id) {
        navigate(`/admin/categories/${id}/delete`)
    }

    return(
        <>
        <div>
            <button onClick={()=>CreateCategory()}> Uj Kategoria</button>
        </div>
        <div className="category-box">
        <label htmlFor="category">kategóriák</label>
                    
            { categoryList?.map((category, idx) => {
               return (<div key={idx+10} > {category.name} 
               <button key={category.id} onClick={()=>ModifyCategory(category.id)} > Modosit</button> 
               <button  onClick={()=>DeleteCategory(category.id)} > Torol</button> 
               </div>
                        )
                 })}
                          
        </div>
        </>
    )
}