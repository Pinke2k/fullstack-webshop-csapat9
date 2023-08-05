import db from '../connection';
import { nanoid } from 'nanoid';

export default {
  createTable() {
    const sql = `
        CREATE TABLE IF NOT EXISTS categories (
            id VARCHAR(16) PRIMARY KEY,
            name VARCHAR(50) NOT NULL UNIQUE
        )`;
    db.run(sql, (err) => {
      if (err) {
        console.log(`Categories table creation error: ${err.message}`);
        throw err;
      }
    });
  },

  create(name) {
    const id = nanoid(16);
    const sql = `INSERT INTO categories (id, name) VALUES ($id, $name)`;
    const params = {
      $id: id,
      $name: name
    }
    return new Promise((resolve, reject) => {
      db.run(sql, params, (err) => {
        if (err) reject(err);
        else {
          resolve({ name });
        }
      })
    })
  },

  delete(id) {
    const sql1 = `DELETE FROM products_categories WHERE category_id = ?`
    const sql2 = `DELETE FROM categories WHERE id = ?`
    return new Promise((resolve, reject) => {
      db.serialize(() => {
        db.run(sql1, [id], function (err) {
          if (err) reject(err)
        });
        db.run(sql2, [id], (err) => {
          if (err) reject(err)
          else {
            resolve(this)
          }
        })
      })
    })
  },

  getOne(id) {
    const sql = `SELECT * FROM categories WHERE id = ?`
    return new Promise((resolve, reject) => {
      db.get(sql, [id], (err, row) => {
        if (err) reject(err)
        else {
          resolve(row)
        }
      })
    })
  },
  getAll() {
    const sql = `SELECT * FROM categories`;
    return new Promise((resolve, reject) => {
      db.all(sql, (err, rows) => {
        if (err) reject(err)
        else {
          resolve(rows)
        }
      })
    })
  },
  updateCategory({ id, name }) {
    const sql = `UPDATE categories SET name = $name WHERE id = $id`;
    const params = {
      $id: id,
      $name: name
    };
    return new Promise((resolve, reject) => {
      db.run(sql, params, (err) => {
        if (err) reject(err)
        else {
          resolve("updated sucessfully")
        }
      })
    })
  }
};
