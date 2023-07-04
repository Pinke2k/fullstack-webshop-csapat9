import db from '../connection';

export default {
  createTable() {
    const sql = `
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            email VARCHAR(32) NOT NULL UNIQUE,
            password VARCHAR(32) NOT NULL,
            username VARCHAR(16) NOT NULL UNIQUE,
            permission TEXT 
        )
        `;
    db.run(sql, (err) => {
      if (err) {
        console.log(`Users table create error: ${err.message}`);
        throw err;
      }
    });
  },

  login({ email, password }) {
    const sql = `SELECT * FROM users WHERE email = ? AND password = ?`;

    return new Promise((resolve, reject) => {
      db.get(sql, [email, password], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  },

  register({ email, password, username, permission }) {
    const sql = `INSERT INTO users (email,password,username,permission) VALUES(?,?,?,?)`;
    return new Promise((resolve, reject) => {
      db.run(sql, [email, password, username, permission], function (err) {
        if (err) reject(err);
        else {
          resolve(this.lastID);
        }
      });
    });
  },
};
