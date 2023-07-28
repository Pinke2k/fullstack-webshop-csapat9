import productsService from '../services/products-service';
import HttpError from '../utils/httpError';

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

  // create(req, res, next) {
  //   const { name, description, price, amount, categoryId } = req.body;

  //   if (!price || !name) throw new HttpError('missing required parameter', 400);
  //   productsService
  //     .create({ name, description, price: Number(price), amount: Number(amount), categoryId })
  //     .then((product) => res.status(201).send(product))
  //     .catch(next);
  // },
  async create(req, res, next) {
    try {
      // Létrehozzuk a terméket a productService segítségével
      console.log(req.file, 'create controller req file');
      console.log(req.formdata, 'create controller req formdata');
      const newProduct = await productsService.create(req.body, req.file);
      console.log(newProduct, 'új termék controller');

      // Visszatérünk a létrehozott termékkel
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
  updateProduct(req, res, next) {
    const { productId } = req.params;
    const { name, description, price, amount, categoryId } = req.body;

    productsService
      .updateProduct({ productId, name, description, price, amount, categoryId })
      .then((product) => {
        res.status(200).send({ product });
      })
      .catch(next);
  },
};

// const createProduct = async (req, res, next) => {
//   try {
//     const newProduct = await productService.createProduct(req.body, req.file);
//     res.json(newProduct.rows[0]);
//   } catch (err) {
//     next(err);
//   }
// };

// const handleProductPicture = async (req, res) => {
//   try {
//     const productId = req.params.productId;
//     const pictureDataArray = req.files;

//     // Képek hozzáadása a termékhez a service segítségével
//     const dbUpdates = await productPicturesService.addToProductPicture(productId, pictureDataArray);

//     // Visszatérhetünk a mentett adatokkal vagy az adatbázisból kapott eredménnyel
//     return res.status(200).json(dbUpdates);
//   } catch (error) {
//     console.error(error.message);
//     return res.status(500).json({ error: 'Kép feltöltési hiba' });
//   }
// };
