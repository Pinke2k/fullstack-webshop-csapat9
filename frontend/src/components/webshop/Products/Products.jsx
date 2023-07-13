import { useEffect, useState } from "react"
import {readProducts} from '../../../services/api-fetch'

export default function Products() {
    const [ProductList, setProductList] = useState([])
    const [SortedList, setSortedList] = useState([])
    
    useEffect(() => {
		readProducts().then((products) => {
            console.log(products)
			setProductList(Object.values(products));
			setSortedList(Object.values(products));
			
		});
	}, []);


    return(
        <div className="product-box">
            {ProductList.map((p) => (
            console.log(p)
        ))}
        </div>
    )
}