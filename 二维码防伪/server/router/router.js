/**
 * Created by zen on 2016/2/15.
 */
var express = require('express');
var router = express.Router();
var app = require('../../app');
var ProductsManagment = require('../api-v1/products-managment'),
    productsManagment = new ProductsManagment();
var ProductsVertify = require('../api-v1/products-vertify'),
    productsVertify = new ProductsVertify();
var ProductsInquire = require('../api-v1/products-inquire'),
    productsInquire = new ProductsInquire();
var Authorize = require('../api-v1/Authorize'),
    authorize = new Authorize();

router.post('/pc/view/productEntryAndGenerateQRcode', productsManagment.productEntryAndGenerateQRcode);//录入单个产品并生成产品二维码的md5码
router.post('/pc/view/productsEntryAndPackageQRcode', productsManagment.productsEntryAndPackageQRcode); //批量录入产品，并打包二维码
router.post('/mobile/view/scanningVerify', productsVertify.scanningVertify);//扫二维码验证
router.post('/mobile/view/enterCodeVerify', productsVertify.enterCodeVerify);//输入md5码验证
router.post('/pc/view/getFilteredProducts', productsInquire.getFilteredProducts); //输入查询（包含模糊查询）
router.post('/pc/view/getTotalProductsNumber', productsInquire.getTotalProductsNumber);  //获取数据总数，默认返回第一页数据
router.post('/mobile/view/getToken',authorize.getToken); //获取token,ticket
router.post('/pc/view/getCurrentPageData',productsInquire.getCurrentPageData);  //获取当前页的产品数据
router.post('/pc/view/saveQrImage',productsManagment.saveQrImage); //保存二维码图片




module.exports = router;

