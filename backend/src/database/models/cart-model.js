import db from '../connection';

export default {
  createTable() {
    const sql = `
        CREATE TABLE IF NOT EXISTS carts(
            id VARCHAR(16) PRIMARY KEY,
            product_id VARCHAR(16) NOT NULL,
            user_id VARCHAR(16) NOT NULL,
            amount INTEGER NOT NULL DEFAULT 1,
            FOREIGN KEY (product_id) REFERENCES products(id),
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
        `;
    db.run(sql, (err) => {
      if (err) {
        console.log(`Cart table creation error: ${err.message}`);
        throw err;
      }
    });
  },
};
