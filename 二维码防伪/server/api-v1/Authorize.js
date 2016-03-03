/**
 * Created by Administrator on 2016/2/17 0017.
 */
var https = require('https');
var Service = require('../service/service'),
    service = new Service(),
    Wrapper = require('../service/service-model/wrapper'),
    auth = require('../config/auth-config');
var Authorize = function () {

    /**
     * getToken
     * @param req
     * @param res
     */
    this.getToken = function (req, res) {
        var _res = res;
        https.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + auth.appid + '&secret=' + auth.secret, function (res) {
            var datas = [];
            var size = 0;
            var _datas = [];
            var _size = 0;
            res.on('data', function (data) {
                datas.push(data);
                size += data.length;
                //process.stdout.write(data);
            });
            res.on("end", function () {
                var buff = Buffer.concat(datas, size);
                //var result = iconv.decode(buff, "utf8");//ת��//var result = buff.toString();//����Ҫת����,ֱ��tostring
                var result = buff.toString();
                result = JSON.parse(result);
                console.log('access_token:' + result.access_token);
                https.get('https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + result.access_token + '&type=jsapi', function (res) {
                    res.on('data', function (data) {
                        _datas.push(data);
                        _size += data.length;
                        var _buff = Buffer.concat(_datas, _size);
                        var _result = _buff.toString();
                        _res.json(_result);
                    });
                    res.on('end', function () {

                    });
                })
            });
        }).on("error", function (err) {
            console.log('请求获取token出现错误:' + err);
        });
    }
};

module.exports = Authorize;
