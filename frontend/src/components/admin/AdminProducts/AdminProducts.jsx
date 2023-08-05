import { useEffect, useState } from "react"
import {readProducts} from '../../../services/api-fetch'
import ProductCard from "../../common/ProductCard/AdminProductCard";
import './AdminProducts.css'
import ProductCardAdmin from "../../common/ProductCard/ProductCardAdmin";
import { useNavigate } from "react-router-dom";



export default function AdminProducts(){
    const [ProductList, setProductList] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [sortBy, setSortBy] = useState("")
    const [searchByName, setsearchByName] = useState("")
    const [pageSize, setPageSize] = useState(1)
     const navigate = useNavigate()
    
    useEffect(() => {
		readProducts().then((products) => { 
			setProductList(products);
			
		});
	}, []);

    useEffect(() => {
        const sort = sortBy.split("-")
        const size = pageSize
        console.log("sort: ", sort, "size: ", size);
        fetch(`http://localhost:8000/api/products?currentPage=${currentPage}&sortBy=${sort[0]}&order=${sort[1]}&pageSize=${pageSize}&searchByName=${searchByName}`)
            .then(resp => resp.json())
            .then(prod => setProductList(prod))
    }, [sortBy, currentPage, pageSize, searchByName])

    let increasePage = () => {
        if(pageSize >= ProductList.length)
        setCurrentPage((c) => c + 1);
        console.log("currentpage: ", currentPage)
    }

    let decreasePage = () => {
        if (currentPage > 1) {
            setCurrentPage((c) => c - 1)
        };
        console.log("currentpage: ", currentPage)
    }

 
    function CreateProduct () {
        navigate(`/admin/create-product`)
    }

    return(
        <>
        <div>
            <button onClick={()=>CreateProduct()}>Új termék</button>
        </div>
        <div className="sort-search">
                <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
                    <option value="price-ASC">Ár szerint növekvő</option>
                    <option value="price-DESC">Ár szerint csökkenő</option>
                    <option value="name-ASC">Név szerint növekvő</option>
                    <option value="name-DESC">Név szerint csökkenő</option>
                </select>

                <label>Méret:</label>
                <select className="page-size" onChange={(e) => setPageSize(e.target.value)} value={pageSize}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                </select>
                <label>Keresés:</label>
                <input type="text" onChange={(e) => setsearchByName(e.target.value)} value={searchByName} />
            </div>
        <div className="product-box">
            {ProductList?.map((p) => (

             <ProductCardAdmin product = {p} key = {p.id}/> 
             
             ))} 
             
        </div>
        <div>
                <button className="pagination-button" id="next-button" aria-label="Previous page" title="Previous page" onClick={decreasePage}>Előző oldal</button>
                <button className="pagination-button" id="next-button" aria-label="Next page" title="Next page" onClick={increasePage}>Következő oldal</button>
            </div>
        </>
    )
}