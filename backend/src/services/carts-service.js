import cartModel from '../database/models/cart-model';

export default {
  create(payload) {
    return cartModel.create(payload);
  },

  async findOne(id) {
    if (!id) throw new Error('Missing userid params');
    const result = await cartModel.getOne(id);

    const totalPrice = result.reduce((accumulator, currentObject) => {
      return accumulator + currentObject.subtotal;
    }, 0);

    return { cartItems: result, totalPrice };
  },
  async deleteCart(id) {
    if (!id) throw new Error('Missing id params');
    const result = await cartModel.deleteCartIdByUserId(id);
    return result;
  },
  async update(id, payload) {
    if (!id) throw new Error('Missing id');
    const result = await cartModel.update(id, payload);
    return result;
  },
};
