import cartProductsModel from '../database/models/cartProducts-model';
import cartModel from '../database/models/cart-model';

export default {
  addToCart(payload) {
    return cartProductsModel.addToCart(payload);
  },
  deleteItem(payload) {
    return cartProductsModel.deleteItem(payload);
  },
  updateItem(payload) {
    return cartProductsModel.updateItem(payload);
  },
  getCart(payload) {
    return cartProductsModel.getCart(payload).then((rows) => {
      const totalPrice = rows.reduce((accumulator, currentObject) => {
        return accumulator + currentObject.sub_total;
      }, 0);
      return { cartItems: rows, totalPrice };
    });
  },
  deleteCart(payload) {
    return cartModel.deleteCart(payload);
  },
};
