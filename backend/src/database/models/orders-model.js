import db from '../connection';

export default {
  createTable() {
    const sql = `
        CREATE TABLE IF NOT EXISTS orders (
            id VARCHAR(16) PRIMARY KEY,
            user_id VARCHAR(16) NOT NULL,
            created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            is_done BOOLEAN NOT NULL DEFAULT FALSE,
            deliver_date TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
        `;
    db.run(sql, (err) => {
      if (err) {
        console.log(`Orders table creation error: ${err.message}`);
        throw err;
      }
    });
  },
};
