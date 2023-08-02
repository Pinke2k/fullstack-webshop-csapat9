import sharp from 'sharp';
import { encode } from 'blurhash';

function importAll(r) {
  let images = {};
  r.keys().forEach((item, index) => {
    images[item.replace('./', '')] = r(item);
  });
  return images;
}

export function importImagesUrls() {
  const imagesContext = require.context('../images', false, /\.(png|jpe?g|svg)$/);
  const imagesObject = importAll(imagesContext);
  return Object.values(imagesObject);
}

export const encodeImageToBlurhash = (path) =>
  new Promise((resolve, reject) => {
    sharp(path)
      .raw()
      .ensureAlpha()
      .resize(32, 32, { fit: 'inside' })
      .toBuffer((err, buffer, { width, height }) => {
        if (err) return reject(err);
        resolve(encode(new Uint8ClampedArray(buffer), width, height, 4, 4));
      });
  });
