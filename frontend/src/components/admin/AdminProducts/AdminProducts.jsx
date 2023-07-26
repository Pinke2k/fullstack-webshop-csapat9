import { useEffect, useState } from "react"
import {readProducts} from '../../../services/api-fetch'
import ProductCardAdmin from "../../common/ProductCard/ProductCardAdmin";
// import './AdminProducts.css'
import { useNavigate } from "react-router-dom";



export default function AdminProducts(){
    const [ProductList, setProductList] = useState()
     //const [SortedList, setSortedList] = useState([])
     const navigate = useNavigate()
    
    useEffect(() => {
		readProducts().then((products) => { 
			setProductList(products);
			
		});
	}, []);
 
    function CreateProduct () {
        navigate(`/admin/create-product`)
    }

    return(
        <>
        <div>
            <button onClick={()=>CreateProduct()}>Új termék</button>
        </div>
        <div className="product-box">
            {ProductList?.map((p) => (

             <ProductCardAdmin product = {p} key = {p.id}/> 
             
             ))} 
             
        </div>
        </>
    )
}