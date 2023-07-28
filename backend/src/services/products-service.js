import productsModel from '../database/models/products-model';
import picturesService from '../services/pictures-service';

export default {
  findAll() {
    return productsModel.getAll();
  },
  // async create(product, imageFile) {
  //   console.log('termék create paylaod', payload);

  //   const resp = await productsModel.create(product);
  //   await productsModel.addCategoriesToProduct(resp.id, product.categoryId);

  //   if(imageFile){
  //     const productWithImage = await addToProductPicture()
  //   }
  // },
  async create(product, imageFile) {
    try {
      console.log('Termék létrehozás payload:', product);
      console.log('Termék létrehozás imageFile:', imageFile);

      const createdProduct = await productsModel.create(product);

      await productsModel.addCategoriesToProduct(createdProduct.id, product.categoryId);

      if (imageFile) {
        const productWithImage = await picturesService.addToProductPicture(
          createdProduct.id,
          imageFile,
        );
        return productWithImage;
      }

      return createdProduct;
    } catch (error) {
      console.error('Termék létrehozása során hiba:', error.message);
      throw new Error('Termék létrehozása során hiba');
    }
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
  updateProduct(payload) {
    console.log('itt mit ad', payload.categoryId);
    if (!payload.categoryId) {
      return productsModel.deleteCategoriesFromProduct(payload.productId, payload.categoryId);
    } else {
      return productsModel.updateProduct(payload);
    }
  },
};
