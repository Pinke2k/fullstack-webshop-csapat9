import cartModel from '../database/models/cart-model';

export default {
  create(payload) {
    return cartModel.create(payload);
  },

  async findOne(id) {
    if (!id) throw new Error('Missing userid params');
    const result = await cartModel.getOne(id);

    const totalPrice = [result[0]].reduce((accumulator, currentObject) => {
      console.log(currentObject)
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
