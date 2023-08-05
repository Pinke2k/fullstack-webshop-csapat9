import db from '../connection';

export default {
  createTable() {
    const sql = `
        CREATE TABLE IF NOT EXISTS products_categories(
            product_id VARCHAR(16) NOT NULL,
            category_id VARCHAR(16) DEFAULT besorolatlan,
            FOREIGN KEY (product_id) REFERENCES products(id),
            FOREIGN KEY (category_id) REFERENCES categories(id) 
        )
        `;
    db.run(sql, (err) => {
      if (err) {
        console.log(`products_categories table creation error: ${err.message}`);
        throw err;
      }
    });
  },
};
