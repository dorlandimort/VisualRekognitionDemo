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

exports.up = function(db) {
  const sql = `
    CREATE TABLE PICTURES (
      id SERIAL PRIMARY KEY,
      name character varying(140) NOT NULL,
      path character varying(2000) NOT NULL,
      order_position INT NOT NULL DEFAULT 0,
      product_id INT NOT NULL,
      CONSTRAINT fk_pictures_product
      FOREIGN KEY(product_id) REFERENCES products(id)
    );

  CREATE INDEX idx_pictures_product_id ON pictures(product_id);`;
  return db.runSql(sql);
};

exports.down = function(db) {
  return db.dropTable('pictures');
};

exports._meta = {
  version: 1
};
