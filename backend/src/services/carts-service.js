//import cartProductsModel from '../database/models/cartProducts-model';
import cartModel from '../database/models/cart-model';
import productModel from '../database/models/products-model';
import HttpError from '../utils/httpError';

export default {
  // addToCart: async (userId, productId, amount) => {
  //   try {
  //     const stockAvailable = await productModel.getOne(productId);
  //     if (stockAvailable.amount < amount) {
  //       throw new HttpError('Insufficient stock', 409);
  //     }

  //     const dbResponse = await cartProductsModel.getCartItem(userId, productId);
  //     console.log(dbResponse, 'dbResponse');

  //     if (!dbResponse) {
  //       const addedCart = await cartProductsModel.addToCart(userId, productId, amount);
  //       console.log(addedCart, 'addedCart');
  //       return { success: true, cart: addedCart };
  //     }

  //     await cartProductsModel.increaseAmount(dbResponse.cart_id, productId, amount);
  //     return { increasedAmount: amount };
  //   } catch (error) {
  //     throw error;
  //   }
  // },
  // // addToCart(payload) {
  // //   return cartProductsModel.addToCart(payload);
  // // },

  // deleteItem: async (userId, productId, amount) => {
  //   const dbResponse = await cartProductsModel.getCartItem(userId, productId);
  //   console.log(dbResponse, 'delete dbrepsovoen');

  //   if (!dbResponse) {
  //     throw new HttpError('Cart not found', 401);
  //   }

  //   if (amount <= 0 || dbResponse.amount < amount) {
  //     throw new HttpError('Invalid amount', 409);
  //   }

  //   const deletedItem = await cartProductsModel.deleteItem(dbResponse.cart_id, productId, amount);

  //   const remainingAmount = dbResponse.amount - amount;
  //   return {
  //     success: true,
  //     removedAmount: amount,
  //     remainingAmount,
  //     deletedItem,
  //   };
  // },
  create(payload) {
    return cartModel.create(payload);
  },
  // getCart(payload) {
  //   return cartProductsModel.getCart(payload).then((rows) => {
  //     const totalPrice = rows.reduce((accumulator, currentObject) => {
  //       return accumulator + currentObject.sub_total;
  //     }, 0);
  //     return { cartItems: rows, totalPrice };
  //   });
  // },
  async findOne(id) {
    if (!id) throw new Error('Missing userid params');
    const result = await cartModel.getOne(id);

    const totalPrice = [result[0]].reduce((accumulator, currentObject) => {
      return accumulator + currentObject.subtotal;
    }, 0);

    return { cartItems: result, totalPrice };
  },
  deleteOne(payload) {
    return cartModel.deleteOne(payload);
  },
  deleteCart(payload) {
    return cartModel.deleteCartIdByUserId(payload);
  },
};
