import productsService from '../services/products-service';
import HttpError from '../utils/httpError';
import { nanoid } from 'nanoid';

export default {
  findAll(req, res, next) {
    productsService
      .findAll()
      .then((products) => {
        res.send({ products });
      })
      .catch(next);
  },

  findOne(req, res, next) {
    const { id } = req.params;
    productsService
      .findOne(id)
      .then((product) => {
        res.status(200).send(product);
      })
      .catch(next);
  },

  create(req, res, next) {
    const { name, description, price, amount } = req.body;
    const id = nanoid(8);
    console.log(price);
    console.log(name);
    if (!price || !name) throw new HttpError('missing required parameter', 400);
    productsService
      .create({ id, name, description, price: Number(price), amount: Number(amount) })
      .then((product) => res.status(201).send(product))
      .catch(next);
  },
};
