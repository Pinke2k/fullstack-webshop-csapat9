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
