import { useEffect, useState } from "react"
import {readProducts} from '../../../services/api-fetch'
import ProductCard from "../../common/ProductCard/AdminProductCard";
import './AdminProducts.css'
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
            console.log(p),
             <ProductCard product = {p} key = {p.id}/> 
             
             ))} 
             
        </div>
        </>
    )
}