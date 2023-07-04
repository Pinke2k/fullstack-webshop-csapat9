import db from './connection';
import productsModel from './models/products-model';
import usersModel from './models/users-model';

export default function initDb() {
  db.get('PRAGMA foreign_keys = ON');
  productsModel.createTable();
  usersModel.createTable();
}
