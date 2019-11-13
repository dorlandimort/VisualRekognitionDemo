'use strict';

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  const sql = `CREATE TABLE PRODUCTS (
      id SERIAL PRIMARY KEY,
      name character varying(140) NOT NULL,
      description character varying(2000),
      category_id int NOT NULL,
      CONSTRAINT fk_products_category
      FOREIGN KEY(category_id) REFERENCES categories(id)
    );

    CREATE INDEX idx_products_category_id ON products(category_id);
    CREATE INDEX idx_products_name ON products(name);`;
  return db.runSql(sql);
};

exports.down = function(db) {
  return db.dropTable('products');
};

exports._meta = {
  version: 1
};
