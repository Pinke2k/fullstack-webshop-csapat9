import db from '../connection';

export default {
  createTable() {
    const sql = `
        CREATE TABLE IF NOT EXISTS categories (
            id VARCHAR(16) NOT NULL,
            name VARCHAR(50) NOT NULL UNIQUE
        )`;
    db.run(sql, (err) => {
      if (err) {
        console.log(`Categories table creation error: ${err.message}`);
        throw err;
      }
    });
  },
};
