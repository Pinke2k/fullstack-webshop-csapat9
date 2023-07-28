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
    const sql = `INSERT INTO product_pictures (product_id, originalname, filename, path, blurhash) 
      VALUES ($productId, $originalname, $filename, $path, $blurhash)`;
    const params = {
      $productId: productId,
      $originalname: originalname,
      $filename: filename,
      $path: path,
      $blurhash: blurhash,
    };

    return db.runAsync(sql, params);
  },
};
