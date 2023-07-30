import productPicturesModel from '../database/models/productPictures-model';
import { encodeImageToBlurhash } from '../utils/images';
import { defaultImageData } from '../constants';

export default {
  async addToProductPicture(productId, pictureData) {
    try {
      if (!pictureData) {
        const { originalname, filename, path } = defaultImageData;
        const blurhash = await encodeImageToBlurhash(path);
        return productPicturesModel.addProductPicture(productId, {
          originalname,
          filename,
          path,
          blurhash,
        });
      } else {
        const { originalname, filename, path } = pictureData;
        const blurhash = await encodeImageToBlurhash(path);
        return productPicturesModel.addProductPicture(productId, {
          originalname,
          filename,
          path,
          blurhash,
        });
      }
    } catch (err) {
      console.error(err.message);
      throw new Error('Kép feltöltési hiba');
    }
  },
  async deleteProductPicture(productId, pictureId) {
    try {
      return productPicturesModel.deleteProductPicture(productId, pictureId);
    } catch (error) {
      console.error(error.message);
      throw new Error('Kép törlése során hiba történt.');
    }
  },
  async updateProductPicture(pictureId, updatedData) {
    try {
      const { originalname, filename, path } = updatedData;
      const blurhash = await encodeImageToBlurhash(path);
      return productPicturesModel.updateProductPicture(pictureId, {
        originalname,
        filename,
        path,
        blurhash,
      });
    } catch (error) {
      console.error(error.message);
      throw new Error('Kép frissítése során hiba történt.');
    }
  },
  getOne(productId) {
    return productPicturesModel.getProductPicture(productId);
  },
};
