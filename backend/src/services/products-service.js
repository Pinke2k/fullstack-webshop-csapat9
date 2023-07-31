import productsModel from '../database/models/products-model';
import picturesService from '../services/pictures-service';

export default {
  findAll() {
    return productsModel.getAll();
  },
  async create(product, imageFile) {
    try {
      const createdProduct = await productsModel.create(product);

      await productsModel.addCategoriesToProduct(createdProduct.id, product.categoryId);

      await picturesService.addToProductPicture(createdProduct.id, imageFile);

      return createdProduct;
    } catch (error) {
      console.error('Termék létrehozása során hiba:', error.message);
      throw new Error('Termék létrehozása során hiba');
    }},
  getCurrent({pageSize, currentPage, sortBy, order}){
    return productsModel.getCurrent({pageSize, currentPage, sortBy, order})
  },

  findOne(payload) {
    return productsModel.getOne(payload);
  },
  async delete(productId) {
    try {
      const productPictures = await picturesService.getOne(productId);

      if (productPictures) {
        const { id } = productPictures;
        await picturesService.deleteProductPicture(id);
      }
      return productsModel.delete(productId);
    } catch (error) {
      console.error('Termék törlése során hiba:', error.message);
      throw new Error('Termék törlése során hiba');
    }
  },
  async updateProduct(productId, payload, imageFile) {
    try {
      const { categoryId } = payload;
      console.log(productId, 'prodcut id ');

      if (!categoryId) {
        return await productsModel.deleteCategoriesFromProduct(productId, categoryId);
      }
      const updateProduct = await productsModel.updateProduct(productId, payload);

      if (imageFile) {
        const productWithImage = await picturesService.updateProductPicture(productId, imageFile);
        return productWithImage;
      }

      return updateProduct;
    } catch (error) {
      console.error('Termék frissítése során hiba:', error.message);
      throw new Error('Termék frissítése során hiba');
    }
  },
};
