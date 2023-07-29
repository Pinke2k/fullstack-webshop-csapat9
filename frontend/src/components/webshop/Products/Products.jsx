import { useEffect, useState } from 'react';
import { readProducts } from '../../../services/api-fetch';
import ProductCard from '../../common/ProductCard/ProductCard';
import './Product.css';

export default function Products() {
  const [ProductList, setProductList] = useState();
  //const [SortedList, setSortedList] = useState([])

  useEffect(() => {
    readProducts().then((products) => {
      console.log(products);

      setProductList(products);
    });
  }, []);

  return (
    <div className="product-box">
      {ProductList?.map((p) => (
        <ProductCard product={p} key={p.id} />
      ))}
    </div>
  );
}
