/**
 * Created by zen on 2016/2/16.
 */
var Service = require('../service/service'),
    service = new Service(),
    Wrapper = require('../service/service-model/wrapper'),
    BaseConfig = require('../config/base-config');
var productsVertify = function () {

    /**
     * 扫二维码验证
     * @param req
     * @param res
     */
    this.scanningVertify = function (req, res) {
        var p = req.body;
        var param = {
            md5: p.md5
        };
        return service.scanningVertify(param).then(function (data) {
            var wrapper = new Wrapper();
            if (data && data.length > 0) {
                var checkInfo = JSON.parse(data[0].dataValues.checkInfo);
                var checkTimes = data[0].dataValues.checkTimes + 1;

                var newInfo = {};
                newInfo.checkLocation = p.location;
                newInfo.checkTime = new Date();
                checkInfo.push(newInfo);
                var _checkInfo = JSON.stringify(checkInfo);
                var _param = {};
                _param.md5 = data[0].dataValues.md5;
                _param.checkInfo = _checkInfo;
                _param.checkTimes = checkTimes;
                if(data[0].dataValues.status == 0){
                    _param.status = 1;
                }
            }
            if (data && data.length > 0 && data[0].checkTimes == 0) {
                wrapper.content = '感谢您使用正牌雷奥风电产品!您是首次验证!';
                return service.updateCheckInfo(_param).then(function () {
                    res.json(wrapper);
                });
            } else if (data && data.length > 0 && data[0].checkTimes >= 1) {
                wrapper.content = '感谢您使用正牌雷奥风电产品!您的产品已验证过!';
                return service.updateCheckInfo(_param).then(function () {
                    res.json(wrapper);
                });
            } else if (!data || data.length === 0) {
                wrapper.content = '对不起，您的产品未能通过验证，请联系供货商或致电028-8764008';
                res.json(wrapper);
            }
        });
    };

    /**
     * 输入MD5码验证
     * @param req
     * @param res
     * @returns {Promise}
     */
    this.enterCodeVerify = function (req, res) {
        console.log('xxx');
        var p = req.body;
        var param = {
            md5: p.md5
        };
        return service.scanningVertify(param).then(function (data) {
            console.log(data);
            var wrapper = new Wrapper();
            if (data && data.length > 0) {
                wrapper.content = '感谢您使用雷奥风电正牌产品!';
            } else if (data.length > 0 && data.checkTimes > 1) {
                wrapper.content = '你的产品已被验证过!';
            } else if (data.length == 0) {
                wrapper.content = '对不起，你的产品未能通过验证，请联系供货商或致电028-8764008。';
            }
            res.json(wrapper);
        });
    }

};

module.exports = productsVertify;