/**
 * Created by zen on 2016/2/15.
 */
var Sequelize = require('../node_modules/sequelize');
var MysqlConfig = require('../config/mySql-config');
var products = require('../domain/products');
var dbContext = function () {
    this.db = new Sequelize(MysqlConfig.dbConfig.DB_NAME, MysqlConfig.dbConfig.DB_USER, MysqlConfig.dbConfig.DB_PASSWD, {
        host: MysqlConfig.dbConfig.DB_ADDR,
        port: MysqlConfig.dbConfig.DB_PORT,
        dialect: 'mysql'
    });

    this.products = this.db.define('leo_products', new products(), {
        tableName: 'leo_products',
        charset: "utf8",
        engine: "InnoDB"
    });
};

/**
 * 创建products
 * @returns {*}
 */
dbContext.prototype.createProductsTable = function () {
    return this.products.sync({force:true});
};
module.exports = new dbContext();
