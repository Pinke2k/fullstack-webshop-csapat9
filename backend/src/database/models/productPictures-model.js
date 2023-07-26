import db from '../connection';

export default {
  createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS product_pictures (
      id INT PRIMARY KEY,
      product_id INT NOT NULL,
      originalname TEXT NOT NULL,
      filename TEXT NOT NULL,
      path TEXT NOT NULL,
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
    const { originalname, filename, path } = pictureData;
    const sql = `INSERT INTO product_pictures (product_id, originalname, filename, path) 
      VALUES ($productId, $originalname, $filename, $path)`;
    const params = {
      $productId: productId,
      $originalname: originalname,
      $filename: filename,
      $path: path,
    };

    return db.runAsync(sql, params);
  },
};
