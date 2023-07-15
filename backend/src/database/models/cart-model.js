import db from '../connection';

export default {
  createTable() {
    const sql = `
        CREATE TABLE IF NOT EXISTS carts(
            id VARCHAR(16) PRIMARY KEY,
            user_id VARCHAR(16),
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
  deleteCart(userId) {
    const sql = `
    DELETE FROM carts WHERE user_id = ?
    `;
    console.log('model user__Id', userId);
    return new Promise((resolve, reject) => {
      db.run(sql, [userId], (err) => {
        if (err) reject(err);
        else {
          resolve(`Cart deleted`);
        }
      });
    });
  },
};
