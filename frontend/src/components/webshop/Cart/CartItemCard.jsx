import './Cart.css';
import { useCart } from '../../../hooks/useCart';

// import { IoTrashBinOutline } from 'react-icons/io5';

const CartItemCard = ({
  product,
  cartItemAmount,
  incrementAmount,
  decrementAmount,
  removeCart,
}) => {
  return (
    <div className="cart-row">
      <div className="product">{product.name}</div>
      <div className="price">{product.price * cartItemAmount} Ft</div>
      <div className="amount">
        <button onClick={() => decrementAmount(product.product_id)}>-</button>
        {cartItemAmount}
        <button onClick={() => incrementAmount(product.product_id)}>+</button>
      </div>
      <div className="remove">
        <button onClick={() => removeCart(product.product_id)}>X</button>
      </div>
    </div>
  );
};

export default CartItemCard;
