import { useEffect, useState } from "react"
import {readProducts} from '../../../services/api-fetch'
import ProductCard from "../../common/ProductCard/WebshopProductCard";
import { useSearchParams } from "react-router-dom";

import './Product.css'

export default function Products() {
    let [searchParams, setSearchParams] = useSearchParams();
    const [ProductList, setProductList] = useState()
     //const [SortedList, setSortedList] = useState([])
    
    useEffect(() => {
		readProducts().then((products) => {
			setProductList(products);
			
		});
	}, []);

    // useEffect(() =>{
    //     let querry = "";
    //     searchParams.forEach((key, value) => {
    //         querry = querry + `${value}=${key}&`;
    //     });
    //     console.log(querry);
    //     fetch(`http://loclahost:3000/api/products?products?page={}&sort=title&order=asc`)
    //     .then(resp => resp.jason())
    //     .then(prod => setCurrentTableData(prod))
    // }, [searchParams])


    return(
        <>
        <div className="sort-search">
            
        </div>
        <div className="product-box">
            {ProductList?.map((p) => ( 
                <ProductCard product = {p} key = {p.id}/>
                ))}
        </div>
        </>
    )
}