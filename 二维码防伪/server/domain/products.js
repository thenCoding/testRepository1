/**
 * Created by zen on 2016/2/15.
 */
var Sequelize = require('../node_modules/sequelize');
var dataType = require('./timestamp');
var Base = require('../config/base-db-item');
var products = function () {
    Base.apply(this);

    this.productId = {  //产品ID
        type: Sequelize.STRING,
        filed: 'product_id'
    };

    this.checkInfo = {  //验证信息
        type: Sequelize.STRING,
        filed: 'check_info'
    };

    this.serialNumber = {   //序列号
        type: Sequelize.STRING,
        filed: 'serial_number'
    };
    this.md5 = {    //md5加密码
        type: Sequelize.STRING,
        filed: 'md5'
    };
    this.productModel = {  //产品型号
        type: Sequelize.STRING,
        filed: 'product_model'
    };

    this.checkTimes = {  //验证次数
        type: Sequelize.INTEGER,
        filed: 'check_times'
    };
};

module.exports = products;
