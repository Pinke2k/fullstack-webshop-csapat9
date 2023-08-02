import db from '../connection';

export default {
  createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS product_pictures (
      id INTEGER PRIMARY KEY,
      product_id INT,
      originalname TEXT,
      filename TEXT NOT NULL,
      path TEXT NOT NULL,
      blurhash TEXT,
      FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
    );
  `;
    db.run(sql, (err) => {
      if (err) {
        console.log(`Pictures table creation error: ${err.message}`);
        throw err;
      }
    });
  },

  async addProductPicture(productId, pictureData) {
    const { originalname, filename, path, blurhash } = pictureData;
    const newPath = path.replace(/\\/g, '/');
    const sql = `INSERT INTO product_pictures (product_id, originalname, filename, path, blurhash) 
      VALUES ($productId, $originalname, $filename, $path, $blurhash)`;
    const params = {
      $productId: productId,
      $originalname: originalname,
      $filename: filename,
      $path: newPath,
      $blurhash: blurhash,
    };

    return db.runAsync(sql, params);
  },
  async deleteProductPicture(productId, pictureId) {
    try {
      const sql = `DELETE FROM product_pictures WHERE product_id = $productId AND id = $pictureId`;
      const params = {
        $productId: productId,
        $pictureId: pictureId,
      };

      return db.runAsync(sql, params);
    } catch (error) {
      console.error(error.message);
      throw new Error('Kép törlése során hiba történt.');
    }
  },
  async getProductPicture(productId) {
    try {
      const sql = `SELECT * FROM product_pictures WHERE product_id = $productId`;
      const params = {
        $productId: productId,
      };

      return db.getAsync(sql, params);
    } catch (error) {
      console.error(error.message);
      throw new Error('Kép lekérdezése során hiba történt.');
    }
  },
  async updateProductPicture(productId, updatedData) {
    try {
      const { originalname, filename, path, blurhash } = updatedData;
      const newPath = path.replace(/\\/g, '/');
      const sql = `
        UPDATE product_pictures 
        SET originalname = $originalname, filename = $filename, path = $path, blurhash=$blurhash 
        WHERE product_id = $productId
      `;
      const params = {
        $originalname: originalname,
        $filename: filename,
        $path: newPath,
        $productId: productId,
        $blurhash: blurhash,
      };

      return db.runAsync(sql, params);
    } catch (error) {
      console.error(error.message);
      throw new Error('Kép frissítése során hiba történt.');
    }
  },
};
