import db from '../connection';

export default {
  createTable() {
    const sql = `
        CREATE TABLE IF NOT EXISTS cart_products(
            id TEXT PRIMARY KEY,
            cart_id VARCHAR(16) NOT NULL,
            product_id VARCHAR(16) NOT NULL,
            amount INTEGER NOT NULL DEFAULT 1,
            FOREIGN KEY (product_id) REFERENCES products(id),
            FOREIGN KEY (cart_id) REFERENCES carts(id)
        )
        `;
    db.run(sql, (err) => {
      if (err) {
        console.log(`Cart_products creation error: ${err.message}`);
        throw err;
      }
    });
  },
};
