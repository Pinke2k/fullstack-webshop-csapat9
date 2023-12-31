import db from '../connection';
import { nanoid } from 'nanoid';

export default {
  createTable() {
    const sql = `
        CREATE TABLE IF NOT EXISTS users (
            id VARCHAR(16) PRIMARY KEY,
            email VARCHAR(32) NOT NULL UNIQUE,
            password_hash TEXT NOT NULL,
            username VARCHAR(16) UNIQUE,
            first_name VARCHAR(100),
            last_name VARCHAR(100),
            birthday TIMESTAMP,
            phone_number VARCHAR(100),
            postcode INTEGER,
            city VARCHAR(50),
            street VARCHAR(100),
            house_number VARCHAR(30),
            created_at TEXT DEFAULT CURRENT_TIMESTAMP,
            is_admin BOOLEAN DEFAULT FALSE
        )
        `;
    db.run(sql, (err) => {
      if (err) {
        console.log(`Users table create error: ${err.message}`);
        throw err;
      }
    });
  },

  getEmail(email) {
    const sql = 'SELECT * FROM users WHERE email = ?';
    return new Promise((resolve, reject) => {
      db.get(sql, [email], (err, row) => {
        if (err) reject(err);
        else if(row) {
          const { id, password_hash: passwordHash, is_admin: isAdmin } = row;
          resolve({ id, email, passwordHash, isAdmin });
        }
        else {
          reject(err)
        }
      });
    });
  },

  create({ email, passwordHash }) {
    const id = nanoid(16);
    const sql = `INSERT INTO users (id,email,password_hash) VALUES($id,$email,$passwordHash)`;
    const params = { $id: id, $email: email, $passwordHash: passwordHash };

    return new Promise((resolve, reject) => {
      db.run(sql, params, (err) => {
        if (err) reject(err);
        else {
          resolve({ id, email });
        }
      });
    });
  },

  getALL() {
    // const sql = 'SELECT id, email,is_admin FROM users';
    const sql = 'SELECT * FROM users';

    return new Promise((resolve, reject) => {
      db.all(sql, (err, rows) => {
        console.log(rows);

        if (err) reject(err);
        else resolve(rows);
      });
    });
  },
  readById(id) {
    const sql = 'SELECT * FROM users WHERE id = ?';

    return new Promise((resolve, reject) => {
      db.get(sql, [id], (err, row) => {
        if (err) reject(err);
        else {
          console.log(row);
          resolve(row);
        }
      });
    });
  },
  updateUser({ id, email, username }) {
    const sql = `UPDATE users SET email = $email, username = $username WHERE id = $id`;
    const params = {
      $id: id,
      $email: email,
      $username: username,
    };
    return new Promise((resolve, reject) => {
      db.run(sql, params, (err) => {
        if (err) reject(err);
        else {
          resolve('succes');
        }
      });
    });
  },
  delete(id) {
    const sql = `DELETE FROM users WHERE id = ?`;
    return new Promise((resolve, reject) => {
      db.run(sql, [id], function (err) {
        if (err) reject(err);
        else resolve(this);
      });
    });
  },
};
