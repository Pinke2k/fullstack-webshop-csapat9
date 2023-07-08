import productsModel from '../database/models/products-model';

export default {
  findAll() {
    return productsModel.getAll();
  },

  create(payload) {
    console.log('payload', payload);
    return productsModel.create(payload);
  },

  findOne(payload) {
    return productsModel.getOne(payload);
  },
};
