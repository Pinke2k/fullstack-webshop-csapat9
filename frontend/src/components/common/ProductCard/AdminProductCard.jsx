import './ProductCard.css';
import UpadateButton from '../../admin/AdminButtons/Update';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../../../hooks/useCart';
import { BlurHashLazyLoading } from '../BlurhashLazyLoading/BlurhashLazyloading';

export default function ProductCard(props) {
  const navigate = useNavigate();

  const { addToCart } = useCart();
  const [id, setId] = useState(props.id);

  function deleteProduct(id) {
    navigate(`/admin/products/${id}/delete`);
    console.log('props.id ', props.product.id);
  }
  function modifyProduct(id) {
    navigate(`/admin/products/${id}/update`);
  }

  return (
    <div className="product-card">
      {/* <img src={url} alt="" className="image" /> */}
      <div className="image">
        <BlurHashLazyLoading image={props.product} />
      </div>

      <div className="product-content">
        <h1 className="product-title">{props.product.name}</h1>
        {/* <h3 className="product-description">{props.product.description}</h3> */}
        {/* <h2 className="product-price">{props.product.category + ' Ft'}</h2> */}
        <div className="lastline">
          {/* <button className="gommmb" onClick={() => deleteProduct(props.product.id)}>
            Törlés
          </button> */}
          <div className="product-price">{props.product.price + ' Ft'}</div>
          <button className="add-product" onClick={() => addToCart(props.product.id, 1)}>
            Kosárhoz adás
          </button>
        </div>
      </div>
    </div>
  );
}
