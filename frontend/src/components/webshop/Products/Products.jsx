import { useEffect, useState } from 'react';
import { readProducts } from '../../../services/api-fetch';
import ProductCard from '../../common/ProductCard/WebshopProductCard';
import { useSearchParams } from 'react-router-dom';
import './Product.css';

export default function Products() {
  let [searchParams, setSearchParams] = useSearchParams();
  const [ProductList, setProductList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('');
  const [SortedList, setSortedList] = useState();
  const [pageSize, setPageSize] = useState(1);
  console.log(ProductList);

  useEffect(() => {
    readProducts().then((products) => {
      setProductList(products);
    });
  }, []);

  useEffect(() => {
    // let querry = "";
    // searchParams.forEach((key, value) => {
    //     querry = querry + `${value}=${key}&`;
    // });
    // console.log(querry);
    const sort = sortBy.split('-');
    const size = pageSize;
    console.log('sort: ', sort, 'size: ', size);
    fetch(
      `http://localhost:8000/api/products?currentPage=${currentPage}&sortBy=${sort[0]}&order=${sort[1]}&pageSize=${pageSize}`,
    )
      .then((resp) => resp.json())
      .then((prod) => setProductList(prod));
  }, [sortBy, currentPage, pageSize]);

  let increasePage = () => {
    setCurrentPage((c) => c + 1);
    console.log('currentpage: ', currentPage);
  };

  let decreasePage = () => {
    if (currentPage > 1) {
      setCurrentPage((c) => c - 1);
    }
    console.log('currentpage: ', currentPage);
  };

  return (
    <>
      <div className="sort-search">
        <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
          <option value="price-ASC">Növekvő</option>
          <option value="price-DESC">Csökkenő</option>
        </select>
        <label name="name">Méret:</label>
        <select
          className="page-size"
          onChange={(e) => setPageSize(e.target.value)}
          value={pageSize}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
        <label name="name">Keresés:</label>
        <input type="text" id="name" name="name" />
      </div>
      <div className="product-box">
        {ProductList?.map((p) => (
          <ProductCard product={p} key={p.id} />
        ))}
      </div>
      <div>
        <button
          className="pagination-button"
          id="next-button"
          aria-label="Previous page"
          title="Previous page"
          onClick={decreasePage}
        >
          Előző oldal
        </button>
        <button
          className="pagination-button"
          id="next-button"
          aria-label="Next page"
          title="Next page"
          onClick={increasePage}
        >
          Következő oldal
        </button>
      </div>
    </>
  );
}
