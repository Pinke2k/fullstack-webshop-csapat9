import productsModel from '../database/models/products-model';

export default {
  findAll() {
    return productsModel.getAll();
  },
  create(payload) {
    return productsModel.create(payload).then((resp) => {
      productsModel.addCategoriesToProduct(resp.id, payload.categoryId);
    });
  },
  findOne(payload) {
    return productsModel.getOne(payload);
  },
  delete(payload) {
    return productsModel.delete(payload);
  },
  updateProduct(payload) {
    return productsModel.updateProduct(payload);
  },
};
