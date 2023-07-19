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

  getCart(req, res, next) {
    const { id } = req.params;
    cartsService
      .findOne(id)
      .then((cart) => res.status(200).send(cart))
      .catch(next);
  },
  async deleteCart(req, res, next) {
    const { id } = req.params;
    if (!id) throw new HttpError('Missing product id', 400);
    try {
      const result = await cartsService.deleteCart(id);
      res.status(204).send(result);
    } catch (error) {
      next(error);
    }
  },
  update(req, res, next) {
    const { id } = req.params;
    const { productId, quantity } = req.body;
    if (!quantity) throw new HttpError('Missing required parameter', 400);
    cartsService
      .update(id, { productId, quantity })
      .then((changes) => {
        if (changes > 0) {
          res.status(201).send({ changes, productId, quantity });
        } else {
          res.status(200).send({ changes: 0, productId, quantity });
        }
      })
      .catch(next);
  },
};
