import db from './connection';
import categoryModel from './models/category-model';
import productsModel from './models/products-model';
import usersModel from './models/users-model';
import ordersModel from './models/orders-model';
import productsCategoryModel from './models/products-category-model';
import orderedProductsModel from './models/orderedProducts-model';
import cartModel from './models/cart-model';

export default function initDb() {
  db.get('PRAGMA foreign_keys = ON');
  productsModel.createTable();
  usersModel.createTable();
  categoryModel.createTable();
  cartModel.createTable();
  ordersModel.createTable();
  productsCategoryModel.createTable();
  orderedProductsModel.createTable();
}
