import db from '../connection';
import { nanoid } from 'nanoid';

export default {
  createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS products (
      id VARCHAR(16) PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      description VARCHAR(500) NOT NULL,
      price INTEGER NOT NULL,
      amount INTEGER NOT NULL,
      product_url VARCHAR(500),
      created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      last_updated_at TIMESTAMP
    )
  `;
    db.run(sql, (err) => {
      if (err) {
        console.log(`Products table creation error: ${err.message}`);
        throw err;
      }
    });
  },

  getAll() {
    const sql = `
      SELECT p.id, p.description, p.price, p.amount, p.name, c.id AS categoryId, pp.id AS pictureId, pp.originalname, pp.filename, pp.path, pp.blurhash
      FROM products p
      FULL OUTER JOIN products_categories AS pc ON p.id = pc.product_id
      FULL OUTER JOIN categories AS c ON c.id = pc.category_Id
      LEFT JOIN product_pictures AS pp ON p.id = pp.product_id;
    `;
    return new Promise((resolve, reject) => {
      db.all(sql, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  getOne(id) {
    const sql = `SELECT p.id,p.description,p.price,p.amount, c.id AS category
    FROM products p
    JOIN products_categories AS pc ON p.id=pc.product_id
    JOIN categories AS c ON c.id=pc.category_Id
    WHERE p.id=?
    `;

    return new Promise((resolve, reject) => {
      db.get(sql, [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          // console.log('row', row);
          resolve(row);
        }
      });
    });
  },

  create({ name, description, price, amount, productUrl }) {
    const id = nanoid(8);
    const sql =
      'INSERT INTO products(id, name, description,price,amount,product_url) VALUES($id, $name, $description,$price,$amount,$productUrl)';
    const params = {
      $id: id,
      $name: name,
      $description: description,
      $price: price,
      $amount: amount,
      $productUrl: productUrl,
    };

    return new Promise((resolve, reject) => {
      db.run(sql, params, function (err) {
        if (err) reject(err);
        else resolve({ price, name, id, description, amount, productUrl });
      });
    });
  },

  delete(id) {
    console.log(id)
    const sql = `DELETE FROM products WHERE id = ?`;
    return new Promise((resolve, reject) => {
      db.run(sql, [id], function (err) {
        if (err) reject(err);
        else resolve(this);
      });
    });
  },

  updateProduct(productId, { name, description, price, amount, categoryId }) {
    console.log(productId, name, description, price, amount, categoryId, 'termékek model update');
    const sql1 = `UPDATE products_categories SET category_id = $categoryId WHERE product_id = $productId`;
    const sql2 = `UPDATE products SET name = $name, description = $description, price = $price, amount = $amount  WHERE id = $id`;
    const timestamp = Date.now();
    const params1 = {
      $categoryId: categoryId,
      $productId: productId,
    };
    const params2 = {
      $id: productId,
      $name: name,
      $description: description,
      $price: price,
      $amount: amount,
      // $last_updated_at: timestamp,
    };
    return new Promise((resolve, reject) => {
      db.serialize(() => {
        db.run(sql1, params1, function (err) {
          if (err) reject(err);
        }),
          db.run(sql2, params2, function (err) {
            if (err) reject(err);
            else resolve('success');
          });
      });
    });
  },
  addCategoriesToProduct(productId, categoryId) {
    const sql = `
    INSERT INTO products_categories (product_id,category_id) VALUES ($productId,$categoryId)
    `;
    const params = {
      $productId: productId,
      $categoryId: categoryId,
    };

    return new Promise((resolve, reject) => {
      db.run(sql, params, (err) => {
        if (err) reject(err);
        else resolve({ succes: 'added category to product' });
      });
    });
  },
  deleteCategoriesFromProduct(productId, categoryId) {
    const sql = ` DELETE FROM products_categories WHERE category_id = $categoryId AND product_id = $productId`;
    const params = {
      $categoryId: categoryId,
      $productId: productId,
    };
    return new Promise((resolve, reject) => {
      db.run(sql, params, (err) => {
        if (err) reject(err);
        else {
          resolve('Category deleted from product');
        }
      });
    });
  },

  getCurrent({ pageSize, currentPage, sortBy, order, searchByName }) {
    let orderquerry = '';
    let search = '';
    if (searchByName) search = `WHERE p.name LIKE '${searchByName}%'`
    if (sortBy) orderquerry = `ORDER BY p.${sortBy} ${order}`;
    const sql = `SELECT * FROM products LEFT JOIN product_pictures AS pp ON p.id = pp.product_id ${orderquerry} LIMIT ${pageSize} OFFSET ${pageSize * (currentPage - 1)
      }`;

    const sql1 = `
    SELECT p.id, p.description, p.price, p.amount, p.name, c.id AS categoryId, pp.id AS pictureId, pp.originalname, pp.filename, pp.path, pp.blurhash
    FROM products p
    FULL OUTER JOIN products_categories AS pc ON p.id = pc.product_id
    FULL OUTER JOIN categories AS c ON c.id = pc.category_Id
    LEFT JOIN product_pictures AS pp ON p.id = pp.product_id
    ${search}
    ${orderquerry} LIMIT ${pageSize} OFFSET ${pageSize * (currentPage - 1)}
  `;
    console.log(sql1)

    return new Promise((resolve, reject) =>
      db.serialize(() => {
        const stmt = db.prepare(sql1);
        stmt.all((err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        });
      }),
    );
  },
};
