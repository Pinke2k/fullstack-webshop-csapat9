import db from '../connection';
import { nanoid } from 'nanoid';

export default {
  createTable() {
    const sql = `
        CREATE TABLE IF NOT EXISTS cart_products(
            cart_id VARCHAR(16) NOT NULL,
            product_id VARCHAR(16) NOT NULL,
            amount INTEGER NOT NULL DEFAULT 1,
            price INTEGER NOT NULL,
            FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE,
            FOREIGN KEY (product_id) REFERENCES products(id)
        )
        `;
    db.run(sql, (err) => {
      if (err) {
        console.log(`Cart_products creation error: ${err.message}`);
        throw err;
      }
    });
  },

  addToCart({ userID, productID, amount, price }) {
    const checkCartSQL = `SELECT id FROM carts WHERE user_id = $userID`;
    const cartParams = { $userID: userID };

    return new Promise((resolve, reject) => {
      db.get(checkCartSQL, cartParams, (err, row) => {
        let cartID;
        if (err) {
          reject(err);
        }
        if (!row) {
          cartID = nanoid(16);
          const newCartParams = {
            $cartID: cartID,
            $userID: userID,
          };
          const newCartSQL = `INSERT INTO carts (id, user_id) VALUES ($cartID, $userID)`;
          db.run(newCartSQL, newCartParams, (err) => {
            if (err) reject(err);
          });
        } else {
          cartID = row.id;
        }
        const cartProductParams = {
          $cartID: cartID,
          $productID: productID,
          $amount: amount,
          $price: price * amount,
        };
        const cartProductSQL = `INSERT INTO cart_products 
          (cart_id, product_id, amount, price) VALUES ($cartID, $productID, $amount, $price)`;
        db.run(cartProductSQL, cartProductParams, (err) => {
          if (err) reject(err);
        });

        resolve({ cartID });
      });
    });

    // const cartRow = db.get(checkCartSQL, cartParams);
    // console.log('meglévő kosár', cartRow);

    // if (cartRow && cartRow.cart_id) {
    //   cartID = cartRow.cart_id;
    // } else {
    //   cartID = nanoid(16);
    //   const newCartParams = {
    //     $cartID: cartID,
    //     $userID: userID,
    //   };
    //   const newCartSQL = `INSERT INTO carts (id, user_id) VALUES ($cartID, $userID)`;
    //   db.run(newCartSQL, newCartParams);
    // }
    // const cartProductParams = {
    //   $cartID: cartID,
    //   $productID: productID,
    //   $amount: amount,
    //   $price: price * amount,
    // };
    // const cartProductSQL = `INSERT INTO cart_products (cart_id, product_id, amount, price) VALUES ($cartID, $productID, $amount, $price)`;
    // db.run(cartProductSQL, cartProductParams);

    // return { cartID };
  },

  deleteItem({ cartId, productId }) {
    const sql = 'DELETE FROM cart_products WHERE cart_id = ? AND product_id = ?';
    console.log(productId, 'product id model');
    return new Promise((resolve, reject) => {
      db.run(sql, [cartId, productId], (err) => {
        if (err) reject(err);
        else {
          resolve({
            message: `Product with ${productId} id, has been succesfully deleted from your cart`,
          });
        }
      });
    });
  },
  updateItem({ productId, amount, price }) {
    const sql = 'UPDATE cart_products SET amount = $amount, price = $price WHERE product_id = $id';
    const params = {
      $amount: amount,
      $id: productId,
      $price: price,
    };
    return new Promise((resolve, reject) => {
      db.run(sql, params, (err) => {
        console.log('productid', productId);
        if (err) reject(err);
        else {
          resolve({ productId, amount });
        }
      });
    });
  },
  getCart(userID) {
    console.log('userID', userID);
    const sql = `
    SELECT p.id AS product_id, p.name, cp.amount AS quanity, cp.amount*p.price AS sub_total
    FROM "cart_products" AS cp
    JOIN "carts" AS c ON cp.cart_id = c.id
    JOIN "products" AS p ON cp.product_id = p.id
    WHERE c.user_id = ?
  `;
    return new Promise((resolve, reject) => {
      db.all(sql, [userID], (err, rows) => {
        if (err) reject(err);
        else {
          resolve(rows);
        }
      });
    });
  },
};

// SELECT p.id, p.name, cp.amount AS qty, cp.amount*p.price AS sub_total
// FROM "cart_products" cp
// JOIN "carts" c ON cp.cart_id = c.id
// JOIN "products" p ON cp.product_id = p.id
// WHERE c.user_id = '98TcU8Tjno3A80TV';
