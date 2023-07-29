import productsModel from '../database/models/products-model';

export default {
  findAll() {
    return productsModel.getAll();
  },
  getCurrent({pageSize, currentPage, sortBy, order}){
    return productsModel.getCurrent({pageSize, currentPage, sortBy, order})
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
    console.log("itt mit ad",payload.categoryId)
    if(!payload.categoryId){
      return productsModel.deleteCategoriesFromProduct(payload.productId, payload.categoryId)
    }
    else{
      return productsModel.updateProduct(payload);
    }
  },
};
