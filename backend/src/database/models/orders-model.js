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
  getAllOrders(){
    const sql = 'SELECT * FROM orders'
    return new Promise((resolve, reject)  => {
      db.all(sql, (err, rows) => {
        if(err) reject(err)
        else{
          resolve(rows)
        }
      })
    })
  },
  createOrder({ id, userId, created, isDone, deliveryDate }, cartItems){
    const sql1 = `INSERT INTO orders ( id, user_id, created, is_done, deliver_date ) VALUES ($id, $userId, $created, $isDone, $deliveryDate )`;
    const params1 = {
      $id :  id,
      $userId : userId,
      $created: created,
      $isDone : isDone,
      $deliveryDate : deliveryDate
    }
    const sql2 = `INSERT INTO ordered_products ( order_id, product_id, quantity, total_price ) VALUES (?, ?, ?, ?)`;
   
    return new Promise((resolve,reject) => {
      
        db.run(sql1,params1, (err) => {
          if(err) reject(err)
          else{
            cartItems.forEach(item => {
              console.log("item ",item)
              db.run(sql2,[id, item.product_id, item.quantity, item.subtotal],(err) => {
                if(err) reject(err)
                else{
                  resolve("order sent")
                }
              })
            });
          }
        })
    })
  },
  getUserOrders(userId){
    const sql = `SELECT * FROM orders WHERE user_id = ?`
    
    return new Promise((resolve, reject) => {
      db.all(sql,[userId], (err, rows) => {
        if(err) reject(err)
        else{
          resolve(rows)
        }
      })
    })
  },
  deleteOrder(orderId){
    const sql1 = `DELETE FROM orders WHERE id = ?`
    const sql2 = `DELETE FROM ordered_products WHERE order_id = ?`
    return new Promise((resolve, reject) => {
      db.serialize(() => {
        db.run(sql2,[orderId],(err) => {
          if(err) reject(err)
        });
        db.run(sql1,[orderId],(err) => {
          if(err) reject(err)
          else{
            resolve("order deleted")
          }
        });
      })
    })
  }
};
