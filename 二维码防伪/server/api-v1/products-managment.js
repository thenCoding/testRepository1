/**
 * Created by zen on 2016/2/16.
 */
var Service = require('../service/service'),
    service = new Service(),
    Wrapper = require('../service/service-model/wrapper'),
    md5 = require('md5'),
    fs = require('fs'),
    BaseConfig = require('../config/base-config');
var productsmanagment = function () {

    /**
     * 录入产品并生成MD5码
     * @param req
     * @param res
     * @returns {Promise|*}
     */
    this.productEntryAndGenerateQRcode = function (req, res) {
        var p = req.body;
        var md5code = md5(p.serialNumber);
        var param = {
            model: p.model,
            serialNumber: p.serialNumber,
            md5: md5code
        };
        return service.productEntryAndGenerateQRcode(param).then(function (data) {
            var wrapper = new Wrapper();
            wrapper.content = md5code;
            res.json(wrapper);
        });
    };

    /**
     * 保存二维码图片
     * @param req
     * @param res
     */
    this.saveQrImage = function(req, res){
        //接收前台POST过来的base64
        var imgData = req.body.imgData;
        var imgName = req.body.imgName;
        //过滤data:URL
        var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
        //var binaryData = new Buffer(base64Data, 'base64').toString('binary');
        var dataBuffer = new Buffer(base64Data, 'base64');
        console.log(base64Data);
        fs.writeFile(imgName+".png", dataBuffer, function(err) {
            if(err){
                res.send(err);
            }else{
                res.send("保存成功！");
            }
        });
    };

    /**
     * 批量录入产品并生成MD5码
     * @param req
     * @param res
     * @returns {Promise|*}
     */
    this.productsEntryAndPackageQRcode = function (req, res) {
        var p = req.body;
        console.log(p);
        var items = [];
        if (p.serialNumber instanceof Array)
            p.serialNumber.map(function (item,i) {
                items[i] = {};
                items[i].productModel = p.model;
                items[i].serialNumber = item;
                items[i].md5 = md5(item);
                items[i].checkInfo = JSON.stringify([{checkTime:'',checkLocation:''}]);
                items[i].status = '0';
                items[i].checkTimes = 0;
            });

        return service.productsEntryAndPackageQRcode(items).then(function (data) {
            var wrapper = new Wrapper();
            wrapper.content = BaseConfig.baseUrl + '?m=' + '';
            res.json(wrapper);
        });
    };

};
module.exports = productsmanagment;
