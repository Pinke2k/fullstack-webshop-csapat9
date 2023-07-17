import HttpError from '../utils/httpError';
import cartsService from '../services/carts-service';

export default {
  create(req, res, next) {
    const { userId, productId, quantity } = req.body;
    if (!userId) throw new HttpError('Missing required parameter', 400);
    cartsService
      .create({ userId, productId, quantity })
      .then((cart) => res.send(cart))
      .catch(next);
  },
  deleteOne(req, res, next) {
    const { userId, productId, quantity } = req.body;
    if (!userId) throw new HttpError('Missing required parameter', 400);
    cartsService
      .deleteOne({ userId, productId, quantity })
      .then((cart) => res.send(cart))
      .catch(next);
  },

  getCart(req, res, next) {
    const { id } = req.params;
    cartsService
      .findOne(id)
      .then((cart) => res.status(200).send({ cart }))
      .catch(next);
  },
  deleteCart(req, res, next) {
    const { id } = req.params;
    if (!id) throw new HttpError('Missing required parameter', 400);
    cartsService
      .deleteCart(id)
      .then((resp) => res.status(200).send(resp))
      .catch(next);
  },
};
