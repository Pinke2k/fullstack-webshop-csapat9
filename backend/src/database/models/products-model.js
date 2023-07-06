import db from '../connection';

export default {
  createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS products (
      id VARCHAR(16) NOT NULL,
      name VARCHAR(100) NOT NULL,
      description VARCHAR(500) NOT NULL,
      price INTEGER NOT NULL,
      amount INTEGER NOT NULL,
      product_url VARCHAR(500),
      created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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

  create({ price, name }) {
    const sql = 'INSERT INTO products(name, price) VALUES($name, $price)';
    const params = { $price: price, $name: name };

    return new Promise((resolve, reject) => {
      db.run(sql, params, function (err) {
        if (err) reject(err);
        else resolve({ price, name, id: this.lastID });
      });
    });
  },
};
