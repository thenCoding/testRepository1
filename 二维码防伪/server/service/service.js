/**
 * Created by zen on 2016/2/15.
 */
var Repository = require('../repository/repository'),
    repository = new Repository();

var Service = function () {

};

/**
 * 录入产品并生成MD5码
 * @param param
 * @returns {Promise|*}
 */
Service.prototype.productEntryAndGenerateQRcode = function (param) {
    return repository.productEntryAndGenerateQRcode(param);
};

/**
 * 批量录入产品并打包MD5码
 * @param param
 * @returns {Promise|*}
 */
Service.prototype.productsEntryAndPackageQRcode = function (items) {
    return repository.productsEntryAndPackageQRcode(items);
};


/**
 * 扫二维码验证
 * @param param
 * @returns {Promise|*}
 */
Service.prototype.scanningVertify = function (param) {
    return repository.scanningVertify(param);
};

/**
 * 验证成功，更新产品验证信息
 * @param param
 * @returns {Promise|*}
 */
Service.prototype.updateCheckInfo = function (param) {
    return repository.updateCheckInfo(param);
};

/**
 * 输入查询（总数）
 * @param param
 * @returns {Promise|*}
 */
Service.prototype.getFilteredProducts = function (param) {
    return repository.getFilteredProducts(param);
};


/**
 * 输入查询（包含模糊查询）
 * @param param
 * @returns {Promise|*}
 */
Service.prototype.getFilteredFirstPageData = function (param) {
    return repository.getFilteredFirstPageData(param);
};


/**
 * 产品数量查询
 * @returns {Promise|*}
 */
Service.prototype.getTotalProductsNumber = function () {
    return repository.getTotalProductsNumber();
};

/**
 * 获取当前页的产品数据
 * @returns {Promise|*}
 */
Service.prototype.getCurrentPageData = function (param) {
    return repository.getCurrentPageData(param);
};


/**
 * 产品数量查询
 * @returns {Promise|*}
 */
Service.prototype.getFirstPageData = function () {
    return repository.getFirstPageData();
};



module.exports = Service;
