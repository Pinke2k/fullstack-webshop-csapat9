import db from '../connection';

export default {
  createTable() {
    const sql = `
        CREATE TABLE IF NOT EXISTS ordered_products(
            order_id VARCHAR(16) NOT NULL,
            product_id VARCHAR(16) NOT NULL,
            amount INTEGER NOT NULL,
            FOREIGN KEY (order_id) REFERENCES orders(id),
            FOREIGN KEY (product_id) REFERENCES products(id)
        )
        `;
    db.run(sql, (err) => {
      if (err) {
        console.log(`OrderedProducts table creation error: ${err.message}`);
        throw err;
      }
    });
  },
};
