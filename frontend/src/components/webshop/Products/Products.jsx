import { useEffect, useState } from "react"
import {readProducts} from '../../../services/api-fetch'
import ProductCard from "../../common/ProductCard/ProductCard";

export default function Products() {
    const [ProductList, setProductList] = useState()
     //const [SortedList, setSortedList] = useState([])
    
    useEffect(() => {
		readProducts().then((products) => {
            
			setProductList(products);
			
		});
	}, []);


    return(
        <div className="product-box">
            {ProductList?.map((p) => (
            
             <ProductCard product = {p} key = {p.id}/>
        ))}
        </div>
    )
}