// import React from 'react';
// import { useCart } from '../../../hooks/useCart';
// import { Navigate } from 'react-router-dom';
// import './Cart.css';
// import CartItemCard from './CartItemCard';
// import { useParams } from 'react-router-dom';

// const Cart = () => {
//   const { id } = useParams();
//   const { cartItems, totalPrice, addToCart, removeFromCart } = useCart(id);
//   console.log(cartItems);

//   return (
//     <section className="grid-container">
//       <div className="cart-container">
//         {cartItems?.length === 0 ? (
//           <h3>Nincs termék a kosárban</h3>
//         ) : (
//           <>
//             <div className="wrap">
//               {
//                 /*orderSent || emptyCart ? (
//                 <>
//                   <h3>A megrendelés sikeresen elküldve!</h3>
//                   <Navigate to="/" />
//                 </>
//               ) : */ <div className="container">
//                   <div className="cart-row-head">
//                     <div className="product">Termék</div>
//                     <div className="price">Ár</div>
//                     <div className="amount">Mennyiség</div>
//                     <div className="remove">Eltávolít</div>
//                   </div>

//                   {cartItems.map((product) => (
//                     <CartItemCard
//                       key={product.id}
//                       product={product}
//                       cartItemAmount={product.quantity}
//                       incrementAmount={addToCart}
//                       decrementAmount={removeFromCart}
//                       removeItem={removeFromCart}
//                     />
//                   ))}

//                   <div className="row total">
//                     <div className="price">Végösszeg: {totalPrice} Ft</div>
//                   </div>
//                   <div className="row checkout">
//                     {/* <button onClick={sendOrder}>Megrendelés</button> */}
//                     Megrendelés
//                   </div>
//                 </div>
//               }
//             </div>
//           </>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Cart;

// // <div>
// //   <h1>Kosár</h1>
// //   <ul>
// //     {cartItems.map((item) => (
// //       <li key={item.id}>
// //         <span>{item.name}</span>
// //         <span>{item.price}</span>
// //       </li>
// //     ))}
// //   </ul>
// //   <p>Összesen: {totalPrice}</p>
// // </div>

import React from 'react';
import { useCart } from '../../../hooks/useCart';
import { Navigate } from 'react-router-dom';
import './Cart.css';
import CartItemCard from './CartItemCard';

const Cart = () => {
  const { cartItems, totalPrice, incrementAmount, decrementAmount, removeCart } = useCart(); // Használjuk a useCart hookot

  return (
    <section className="grid-container">
      <div className="cart-container">
        {cartItems?.length === 0 ? (
          <h3>Nincs termék a kosárban</h3>
        ) : (
          <>
            <div className="wrap">
              <div className="container">
                <div className="cart-row-head">
                  <div className="product">Termék</div>
                  <div className="price">Ár</div>
                  <div className="amount">Mennyiség</div>
                  <div className="remove">Eltávolít</div>
                </div>

                {cartItems.map((product) => (
                  <CartItemCard
                    key={product.id}
                    product={product}
                    cartItemAmount={product.quantity}
                    incrementAmount={() => incrementAmount(product.product_id)}
                    decrementAmount={() => decrementAmount(product.product_id)}
                    removeCart={() => removeCart(product.product_id)}
                  />
                ))}

                <div className="row total">
                  <div className="price">Végösszeg: {totalPrice} Ft</div>
                </div>
                <div className="row checkout">Megrendelés</div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Cart;
