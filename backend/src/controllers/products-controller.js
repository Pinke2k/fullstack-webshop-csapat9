import productsService from '../services/products-service';
import HttpError from '../utils/httpError';

export default {
  findAll(req, res, next) {
    productsService
      .findAll()
      .then((products) => {
        res.send(products);
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
    const { name, description, price, amount, categoryId } = req.body;
  

    if (!price || !name) throw new HttpError('missing required parameter', 400);
    productsService
      .create({ name, description, price: Number(price), amount: Number(amount), categoryId })
      .then((product) => res.status(201).send(product))
      .catch(next);
  },

  delete(req, res, next) {
    const { id } = req.params;
    productsService
      .delete(id)
      .then((resp) => res.status(200).send('ok'))
      .catch(next);
  },
  updateProduct(req, res, next) {
    const { productId } = req.params;
    const { name, description, price, amount, categoryId } = req.body;
   
    productsService
      .updateProduct({ productId, name, description, price, amount, categoryId })
      .then((product) => {
       
        res.status(200).send({ product });
      })
      .catch(next);
  },
};
