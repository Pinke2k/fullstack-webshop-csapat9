import { useEffect, useState } from "react"
import {readProducts} from '../../../services/api-fetch'
import ProductCard from "../../common/ProductCard/ProductCard";
import './AdminProducts.css'
import CreateButton from "../AdminButtons/Create";
import DeleteButton from "../AdminButtons/Delete";


export default function AdminProducts(){
    const [ProductList, setProductList] = useState()
     //const [SortedList, setSortedList] = useState([])
    
    useEffect(() => {
		readProducts().then((products) => { 
			setProductList(products);
			
		});
	}, []);


    return(
        <>
        <div>
            <CreateButton/>
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