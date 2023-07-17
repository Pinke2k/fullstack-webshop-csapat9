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
    const sql = 'SELECT * FROM products';
    return new Promise((resolve, reject) => {
      db.all(sql, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  getOne(id) {
    const sql = 'SELECT * FROM products WHERE id = ?';

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

  create({ name, description, price, amount }) {
    const id = nanoid(8);
    const sql =
      'INSERT INTO products(id, name, description,price,amount) VALUES($id, $name, $description,$price,$amount)';
    const params = {
      $id: id,
      $name: name,
      $description: description,
      $price: price,
      $amount: amount,
    };

    return new Promise((resolve, reject) => {
      db.run(sql, params, function (err) {
        if (err) reject(err);
        else resolve({ price, name, id, description, amount });
      });
    });
  },

  delete(id) {
    const sql = `DELETE FROM products WHERE id = ?`;
    return new Promise((resolve, reject) => {
      db.run(sql, [id], function (err) {
        if (err) reject(err);
        else resolve(this);
      });
    });
  },

  updateProduct({ id, name, description, price, amount }) {
    const sql = `UPDATE products SET name = $name, description = $description, price = $price, amount = $amount  WHERE id = $id`;
    const timestamp = Date.now();
    const params = {
      $id: id,
      $name: name,
      $description: description,
      $price: price,
      $amount: amount,
      $last_updated_at: timestamp,
    };
    return new Promise((resolve, reject) => {
      db.run(sql, params, function (err) {
        if (err) reject(err);
        else resolve('success');
      });
    });
  },
};
