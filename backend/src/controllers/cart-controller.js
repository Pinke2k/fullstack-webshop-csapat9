import HttpError from '../utils/httpError';
import cartsService from '../services/carts-service';

export default {
  addToCart(req, res, next) {
    const { userID, productID, amount, price } = req.body;
    // if (!userID || !productID || !quanity || !price)
    //   throw new HttpError('Missing required parameter', 400);
    cartsService
      .addToCart({ userID, productID, amount, price })
      .then((id) => res.status(200).send(id))
      .catch(next);
  },
  deleteItem(req, res, next) {
    const { productId } = req.params;
    const { cartId } = req.body;
    console.log('controller productid', productId);

    // if (!id) throw new HttpError('Missing required parameter', 400);
    cartsService
      .deleteItem({ cartId, productId })
      .then((resp) => res.status(200).send(resp))
      .catch(next);
  },
  updateItem(req, res, next) {
    // const { id } = req.params;
    const { productId, amount, price } = req.body;
    // if (!id) throw new HttpError('Missing required parameter', 400);
    cartsService
      .updateItem({ amount, price, productId })
      .then((resp) => res.status(200).send(resp))
      .catch(next);
  },
  getCart(req, res, next) {
    const { id } = req.params;
    cartsService
      .getCart(id)
      .then((cart) => res.status(200).send(cart))
      .catch(next);
  },
  deleteCart(req, res, next) {
    const { userId } = req.params;
    console.log('userid 12', userId);
    if (!userId) throw new HttpError('Missing required parameter', 400);
    cartsService
      .deleteCart(userId)
      .then((resp) => res.status(200).send(resp))
      .catch(next);
  },
};
