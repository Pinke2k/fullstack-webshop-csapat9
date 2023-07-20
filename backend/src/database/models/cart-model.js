import { nanoid } from 'nanoid';
import db from '../connection';
import { normalizeParams, paramsToFieldsExpr } from '../../utils/sql-helper';

export default {
  createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS cart (
        id INT PRIMARY KEY,
        user_id TEXT,
        created_at DATE,
        updated_at DATE,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `;
    db.run(sql, (err) => {
      if (err) {
        console.log(`Cart table creation error: ${err.message}`);
        throw err;
      }
    });
    const sql2 = `
      CREATE TABLE IF NOT EXISTS cart_item (
        id INTEGER PRIMARY KEY,
        cart_id INT,
        product_id INT,
        quantity INT DEFAULT 1,
        FOREIGN KEY (cart_id) REFERENCES cart(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id)
      )
    `;
    db.run(sql2, (err) => {
      if (err) {
        console.log(`Cart item table creation error: ${err.message}`);
        throw err;
      }
    });
  },
  getOne(id) {
    const sql = `SELECT ci.product_id, ci.quantity, p.name, p.price, p.price * ci.quantity AS subtotal
    FROM cart c
    JOIN cart_item ci ON c.id = ci.cart_id
    JOIN products p ON ci.product_id = p.id
    WHERE c.user_id = ?`;
    return new Promise((resolve, reject) => {
      db.all(sql, id, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },

  getCartIdByUserId(userId) {
    const sql = 'SELECT id FROM cart WHERE user_id = $userId';
    const params = { $userId: userId };
    console.log('getCart...');
    return db.getAsync(sql, params).then((row) => {
      if (!row?.id) return null;
      const { id } = row;
      return id;
    });
  },

  getCartItem({ cartId, productId }) {
    const sql = `SELECT * 
        FROM cart_item 
        WHERE cart_item.cart_id = $cartId
          AND cart_item.product_id = $productId`;
    const params = { $cartId: cartId, $productId: productId };
    return db.getAsync(sql, params);
  },

  async create({ userId, productId, quantity }) {
    let cartId = await this.getCartIdByUserId(userId);
    const cartItemsSQL =
      'INSERT INTO cart_item(product_id,quantity,cart_id) VALUES ($productId,$qty,$cartId) ';
    if (!cartId) {
      cartId = nanoid(8);
      const newCartSQL =
        'INSERT INTO cart(id,user_id,created_at) VALUES($cartid,$userid,$createdat)';
      const newCartParams = {
        $cartid: cartId,
        $userid: userId,
        $createdat: new Date().toISOString(),
      };
      await db.runAsync(newCartSQL, newCartParams);
      const cartItemsParams = { $productId: productId, $qty: quantity, $cartId: cartId };
      return db.runAsync(cartItemsSQL, cartItemsParams);
    }

    const cartItem = await this.getCartItem({ cartId, productId });
    console.log('cart item: ', cartItem);
    if (cartItem) {
      await db.runAsync('UPDATE cart_item SET quantity = $qty WHERE id = $id', {
        $qty: Number(quantity) + Number(cartItem.quantity),
        $id: cartItem.id,
      });
      return { message: 'successful created' };
    }

    const cartItemsParams = { $productId: productId, $qty: quantity, $cartId: cartId };
    await db.runAsync(cartItemsSQL, cartItemsParams);
    return { message: 'successful created' };
  },

  async deleteCartIdByUserId(userId) {
    const sql = 'DELETE FROM cart WHERE user_id = $userId';
    const params = { $userId: userId };
    console.log(userId);
    console.log('deleteCart...');
    await db.runAsync(sql, params);

    return { message: 'successful deleted Cart' };
  },
  async deleteCart(id) {
    const cartId = await this.getCartIdByUserId(id);
    const sql = 'DELETE  FROM cart_item WHERE cart_id=$cart_id';
    const param = { $cart_id: cartId };
    await db.runAsync(sql, param);
    return { message: 'successful deleted Cart' };
  },
  async update(id, payload) {
    const cartId = await this.getCartIdByUserId(id);
    const params = normalizeParams({
      $product_id: payload.productId,
      $quantity: payload.quantity,
      $cart_id: cartId,
    });

    const sql = `UPDATE cart_item SET ${paramsToFieldsExpr(params).join(
      ', ',
    )} WHERE cart_id=$cart_id AND product_id=$product_id`;
    await db.runAsync(sql, params);

    return { message: 'successful updated Cart' };
  },
};
