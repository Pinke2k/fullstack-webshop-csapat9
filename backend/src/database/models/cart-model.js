import db from '../connection';
import { nanoid } from 'nanoid';

export default {
  createTable() {
    const sql = `
        CREATE TABLE IF NOT EXISTS carts(
            id VARCHAR(16) PRIMARY KEY,
            product_id VARCHAR(16) NOT NULL,
            user_id VARCHAR(16) NOT NULL,
            amount INTEGER NOT NULL DEFAULT 1,
            total_price INTEGER NOT NULL DEFAULT 0,
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
  addToCart({ userID, productID, amount, price }){
    const sql = 'INSERT INTO carts (id, product_id, user_id, amount, total_price) VALUES ($id, $productID, $userID, $amount, $price)'
    const id = nanoid(16);
    const params = {
      $id : id,
      $productID: productID,
      $userID: userID,
      $amount: amount,
      $price: price*amount,
    }
    return new Promise((resolve,reject) => {
      db.run(sql,params, (err) => {
        if(err) reject(err)
        else{
          resolve({ id })
        }
      })
    } )
  },
  deleteItem(id){
    const sql = 'DELETE FROM carts WHERE product_id = ?';
    return new Promise((resolve, reject) => {
      db.run(sql, [id], (err) => {
        if(err) reject(err)
        else{
          resolve({ message: `Product with ${id} id, has been succesfully deleted from your cart`})
        }
      })
    })
  },
  updateItem({ id, amount, price}){
    const sql = 'UPDATE carts SET amount = $amount, total_price = $price WHERE product_id = $id'
    const params = {
      $amount: amount,
      $id: id,
      $price: price*amount
    }
    return new Promise((resolve, reject) => {
      db.run(sql,params, (err) => {
        if(err) reject(err)
        else{
          resolve({ id, amount })
        }
      })
    })   
  },
  getCart(userID){
      const sql = 'SELECT * FROM carts WHERE user_id = ?'
      return new Promise((resolve, reject) => {
        db.all(sql,[userID], (err,rows) => {
          const totalPrice = rows.reduce((accumulator, currentObject) => {
            return accumulator + currentObject.total_price;
          }, 0);
          if(err) reject(err)
          else{
            resolve({cartItems: rows, totalPrice})
          }
        })
      })
  }
};
