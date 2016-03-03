/**
 * Created by zen on 2016/2/16.
 */
var Service = require('../service/service'),
    service = new Service(),
    Wrapper = require('../service/service-model/wrapper'),
    BaseConfig = require('../config/base-config');
var productsInquire = function () {

    /**
     * 输入查询（总数）
     * @param req
     * @param res
     */
    this.getFilteredProducts = function (req, res) {
        var p = req.body;
        var param = {
            serialNumber: p.serialNumber || '',
            productModel: p.model || ''
        };
        var wrapper = new Wrapper();
        return service.getFilteredProducts(param).then(function (data) {
            console.log(data[0].num);
            wrapper.content.totalNumber = data[0].num;
        }).then(function () {
            return service.getFilteredFirstPageData(param).then(function (data) {
                wrapper.content.data = data;
                res.json(wrapper);
            });
        });
    };

    /**
     * 产品数量查询
     * @param req
     * @param res
     */
    this.getTotalProductsNumber = function (req, res) {
        //获取产品总数
        return service.getTotalProductsNumber().then(function (data) {
            var num = data[0].cnt || data[0].dataValues.num;
            //获取首页数据
            return service.getFirstPageData().then(function (data) {
                var wrapper = new Wrapper();
                wrapper.content = {};
                wrapper.content.totalNumber = num;
                wrapper.content.data = data;
                res.json(wrapper);
            });
        });
    };

    /**
     * 获取当前页产品数据
     * @param req
     * @param res
     */
    this.getCurrentPageData = function (req, res) {
        var p = req.body;
        var param = {
            offset: (p.pageIndex - 1) * 9
        };
        return service.getCurrentPageData(param).then(function (data) {
            var wrapper = new Wrapper();
            wrapper.content = {};
            wrapper.content.data = data;
            res.json(wrapper);
        });
    };


};

module.exports = productsInquire;