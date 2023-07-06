import db from '../connection';

export default {
  createTable() {
    const sql = `
        CREATE TABLE IF NOT EXISTS cart_products(
            cart_id VARCHAR(16) NOT NULL,
            user_id VARCHAR(16) NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id),
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
