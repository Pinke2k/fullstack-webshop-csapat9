import productPicturesModel from '../database/models/productPictures-model';
import { encodeImageToBlurhash } from '../utils/images';

export default {
  async addToProductPicture(productId, pictureData) {
    try {
      console.log('picturedataarray', pictureData);

      const { originalname, filename, path } = pictureData;
      const blurhash = await encodeImageToBlurhash(path);
      return productPicturesModel.addProductPicture(productId, {
        originalname,
        filename,
        path,
        blurhash,
      });
    } catch (err) {
      console.error(err.message);
      throw new Error('Kép feltöltési hiba');
    }
  },
};
