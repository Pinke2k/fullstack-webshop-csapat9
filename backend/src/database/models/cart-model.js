import db from '../connection';
import { nanoid } from 'nanoid';

export default {
  createTable() {
    const sql = `
        CREATE TABLE IF NOT EXISTS carts(
            id VARCHAR(16) PRIMARY KEY,
            user_id VARCHAR(16) NOT NULL,
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
    const sql = 'INSERT INTO cart_products (id, product_id, user_id, amount, total_price) VALUES ($id, $productID, $userID, $amount, $price)'
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
    console.log("userID", userID)
    const sql = `
    SELECT p.id AS product_id, p.name, cp.amount AS qty, cp.amount*p.price AS sub_total
    FROM "cart_products" cp
    JOIN "carts" c ON cp.cart_id = c.id
    JOIN "products" p ON cp.product_id = p.id
    WHERE c.user_id = ?
  `;
      return new Promise((resolve, reject) => {
        db.all(sql,[userID], (err,rows) => {
          if(err) reject(err)
          else{
            resolve(rows)
          }
        })
      })
  }
};

// SELECT p.id, p.name, cp.amount AS qty, cp.amount*p.price AS sub_total
// FROM "cart_products" cp
// JOIN "carts" c ON cp.cart_id = c.id
// JOIN "products" p ON cp.product_id = p.id
// WHERE c.user_id = '98TcU8Tjno3A80TV';
