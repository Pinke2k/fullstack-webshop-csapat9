import './ProductCard.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../../../hooks/useCart';
import { BlurHashLazyLoading } from '../BlurhashLazyLoading/BlurhashLazyloading';

export default function ProductCard(props) {
  const { addToCart } = useCart();
  const [id, setId] = useState(props.id);
  return (
    <div className="product-card">
      <div className="image">
        <BlurHashLazyLoading image={props.product} />
      </div>
      <div className="product-content">
        <h1 className="product-title">{props.product.name}</h1>
        <div className="lastline">
          <div className="product-price">{props.product.price + ' Ft'}</div>
          <button className="add-product" onClick={() => addToCart(props.product.id, 1)}>
            Kosárhoz adás
          </button>
        </div>
      </div>
    </div>
  );
}
