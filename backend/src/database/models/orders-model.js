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
  },
  getOrderById(orderId){
    const sql = `SELECT o.id AS order_id, o.user_id, o.created, o.is_done, o.deliver_date,
    op.product_id, op.quantity, op.total_price, p.name AS product_name
    FROM orders o
    LEFT JOIN ordered_products AS op ON o.id = op.order_id
    LEFT JOIN products AS p ON p.id = op.product_id
    WHERE o.id = ?`

    return new Promise((resolve, reject) => {
      db.all(sql,[orderId],(err,rows)=>{
        if(err) reject(err)
        else{
          const orderDetails = {
            order_id: rows[0].order_id,
            userId: rows[0].user_id,
            created: rows[0].created,
            is_done: rows[0].is_done,
            deliver_date: rows[0].deliver_date,
            products: rows.map((row) => ({
              product_id: row.product_id,
              quantity: row.quantity,
              total_price: row.total_price,
              product_name: row.product_name,
            })),
          };
  
          resolve(orderDetails);
        }
      })
    })
  }
};
