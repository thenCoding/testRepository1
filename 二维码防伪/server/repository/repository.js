/**
 * Created by zen on 2016/2/15.
 */
var dbContext = require('./dbContext');
var Sequelize = require('sequelize');
var when = require('when');
var repository = function () {
    this.dbContext = dbContext.db;
    this.productDb = dbContext.products;
};

/**
 * 录入产品并生成MD5码
 * @param param
 * @returns {*}
 */
repository.prototype.productEntryAndGenerateQRcode = function (param) {
    return this.productDb.create({
        status: '0',
        serialNumber: param.serialNumber,
        md5: param.md5,
        checkInfo: JSON.stringify([{
            checkTime: '',
            checkLocation: ''
        }]),
        checkTimes: 0,
        productModel: param.model
    });
};


/**
 * 批量录入产品
 * @param items
 * @returns {*}
 */
repository.prototype.productsEntryAndPackageQRcode = function (items) {
    return this.productDb.bulkCreate(items);
};


/**
 * 扫二维码验证
 * @param param
 * @returns {*}
 */
repository.prototype.scanningVertify = function (param) {
    return this.productDb.findAll({
        where: {
            md5: param.md5
        }
    });
};

/**
 * 扫二维码验证
 * @param param
 * @returns {*}
 */
repository.prototype.updateCheckInfo = function (param) {
    return this.productDb.update({
        'status': param.status,
        'checkInfo': param.checkInfo,
        'checkTimes': param.checkTimes
    }, {
        where: {
            'md5': param.md5
        }
    });
};


/**
 * 输入查询（总数）
 * @param param
 * @returns {*}
 */
repository.prototype.getFilteredProducts = function (param) {
    if (param.productModel && param.serialNumber) {
        var sql = "SELECT COUNT(*) AS num FROM leo_products WHERE productModel LIKE " + "'%" + param.productModel + "%'"
            + "AND serialNumber LIKE " + "'%" + param.serialNumber + "%'";
        return this.dbContext.query(sql, {type: Sequelize.QueryTypes.SELECT});
    } else if (param.productModel && !param.serialNumber) {
        var sql = "SELECT COUNT(*) AS num FROM leo_products WHERE productModel LIKE " + "'%" + param.productModel + "%'";
        return this.dbContext.query(sql, {type: Sequelize.QueryTypes.SELECT});
    } else if (!param.productModel && param.serialNumber) {
        var sql = "SELECT COUNT(*) AS num FROM leo_products WHERE serialNumber LIKE " + "'%" + param.serialNumber + "%'";
        return this.dbContext.query(sql, {type: Sequelize.QueryTypes.SELECT});
    }

};


/**
 * 输入查询（包含模糊查询）
 * @param param
 * @returns {*}
 */
repository.prototype.getFilteredFirstPageData = function (param) {
    if (param.productModel && param.serialNumber) {
        return this.productDb.findAll({
            where: {
                $and: [{
                    productModel: {
                        $like: '%' + param.productModel + '%'
                    }
                }, {
                    serialNumber: {
                        $like: '%' + param.serialNumber + '%'
                    }
                }]
            },
            limit: 9
        });
    } else if (param.productModel && !param.serialNumber) {
        return this.productDb.findAll({
            where: {
                productModel: {
                    $like: '%' + param.productModel + '%'
                }
            },
            limit: 9
        });
    } else if (!param.productModel && param.serialNumber) {
        return this.productDb.findAll({
            where: {
                serialNumber: {
                    $like: '%' + param.serialNumber + '%'
                }
            },
            limit: 9
        })
    }
};


/**
 * 产品数量查询
 * @returns {*}
 */
repository.prototype.getTotalProductsNumber = function () {
    var _this = this;
    var sql = "select count(1) as cnt from leo_products";
    return this.dbContext.query(sql, {type: Sequelize.QueryTypes.SELECT});
};

/**
 * 获取当前页的产品数据
 * @returns {*}
 */
repository.prototype.getCurrentPageData = function (param) {
    //return this.dbContext.query(sql, {type: Sequelize.QueryTypes.SELECT});
    console.log(param);
    return this.productDb.findAll({
        limit: 9,
        offset: param.offset
    });
};


/**
 * 获取首页数据
 * @returns {*}
 */
repository.prototype.getFirstPageData = function () {
    return this.productDb.findAll({
        where: {
            recycled: 0
        },
        limit: 9
    });

};


module.exports = repository;
