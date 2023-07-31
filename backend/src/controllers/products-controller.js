import productsService from '../services/products-service';

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

  async create(req, res, next) {
    try {
      const newProduct = await productsService.create(req.body, req.file);

      res.json(newProduct);
    } catch (err) {
      next(err);
    }
  },

  delete(req, res, next) {
    const { id } = req.params;
    productsService
      .delete(id)
      .then((resp) => res.status(200).send('ok'))
      .catch(next);
  },
  async updateProduct(req, res, next) {
    try {
      const { productId } = req.params;
      console.log(req.params);
      const updateProduct = await productsService.updateProduct(productId, req.body, req.file);

      res.json(updateProduct);
    } catch (err) {
      next(err);
    }
  },
};
