import './ProductCard.css';
import UpadateButton from '../../admin/AdminButtons/Update';
import DeleteButton from '../../admin/AdminButtons/Delete';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../../../hooks/useCart';

export default function ProductCard(props) {
  const navigate = useNavigate();
  const { addToCart } = useCart(); // Használd az addToCart függvényt a useCart-ból
  const [id, setId] = useState(props.id);

  function deleteProduct(id) {
    navigate(`/admin/products/${id}/delete`);
    console.log('props.id ', props.product.id);
  }

  return (
    <div className="product-card">
      {/* <img src={props.product.url} alt="image" className="image" /> */}
      <div className="product-content">
        <h1 className="product-title">{props.product.name}</h1>
        <h3 className="product-description">{props.product.description}</h3>
        <h2 className="product-price">{props.product.price + ' Ft'}</h2>
        <UpadateButton id={props.product.id} />
        <button className="gommmb" onClick={() => deleteProduct(props.product.id)}>
          Törlés
        </button>
        <button className="gommmb" onClick={() => addToCart(props.product.id, 1)}>
          Kosárhoz adás
        </button>
      </div>
    </div>
  );
}
