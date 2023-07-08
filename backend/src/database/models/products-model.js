import db from '../connection';

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

  getOne(id) {
    const sql = 'SELECT * FROM products WHERE id = ?';

    return new Promise((resolve, reject) => {
      db.get(sql, [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          console.log('row', row);
          resolve(row);
        }
      });
    });
  },

  create({ id, name, description, price, amount }) {
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
        else resolve({ price, name, id: this.lastID, description, amount });
      });
    });
  },
};
