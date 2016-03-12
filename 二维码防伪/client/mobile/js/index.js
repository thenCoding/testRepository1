/**
 * Created by zen on 2016/2/16.
 */

$(function () {

    var currentLocation = null;


    function regeocoder(lnglatXY) {  //逆地理编码
        var geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: "all"
        });
        geocoder.getAddress(lnglatXY, function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
                alert('成功编码');
                geocoder_CallBack(result);
            }
        });
    }
    function geocoder_CallBack(result) {
        alert(result.regeocode.formattedAddress);
        currentLocation = result.regeocode.formattedAddress; //返回地址描述
    }


    $('.index-bg').width(window.innerWidth * 0.6);
    $('.index-bg').height(window.innerWidth * 0.6);

    //获取配置所需ticket
    $.ajax({
        url: 'getToken',
        type: 'POST',
        sync: true,
        timeout: 15000,
        data: {}
    }).then(function (data) {
        if (data) {
            var _data = JSON.parse(data);
            var m = hex_sha1('jsapi_ticket=' + _data.ticket + '&noncestr=rwerwerfbfbb&timestamp=1414587458&url=http://md5.ad.6starhome.com/mobile/view/index-mobile.html');
            wx.config({
                debug: false, //开启调试(结果会被alert出来)
                appId: 'wx0fee3125621bd354',//公众号appId
                timestamp: '1414587458',
                nonceStr: 'rwerwerfbfbb',
                signature: m,
                jsApiList: ['scanQRCode', 'getNetworkType', 'getLocation']
            });
        }
    }).error(function (err) {
        alert('请求获取ticket出现错误！' + err);
    });

    //微信检查能使用的JS API
    wx.checkJsApi({
        jsApiList: ['scanQRCode', 'getNetworkType', 'getLocation'],
        success: function (res) {

        }
    });

    //微信配置完毕
    wx.ready(function () {
        console.log('配置完毕!');
        $('#scanningButton').on('tap', function () {


            //获取网络状态
            wx.getNetworkType({
                success: function (res) {
                    var networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
                    if (networkType) {
                        //h5地理定位
                        (function getLocation() {
                            if (navigator.geolocation) {
                                navigator.geolocation.getCurrentPosition(showPosition, showError);
                            }
                            else {
                                alert("Geolocation is not supported by this browser.");
                            }
                        })();
                        //h5地理定位成功回调
                        function showPosition(position) {
                            alert("获取位置成功!" + "Latitude:" + position.coords.latitude + ",Longitude: " + position.coords.longitude);
                            regeocoder([parseInt(position.coords.longitude), parseInt(position.coords.latitude)]); //地理逆编码
                            wx.scanQRCode({
                                needResult: 1,
                                scanType: ["qrCode", "barCode"],
                                success: function (res) {
                                    //扫描成功，发起验证请求
                                    var result = res.resultStr;
                                    $.ajax({
                                        url: 'scanningVerify',
                                        type: 'POST',
                                        sync: true,
                                        timeout: 15000,
                                        data: {
                                            md5: result || 'testingMD5',
                                            location: currentLocation
                                        }
                                    }).success(function (data) {
                                        //根据验证结果提示信息
                                        $('.modal-body').text(data.content);
                                        $('#IndexcheckResultDialog').modal('toggle');
                                    });
                                }
                            });
                        }
                        //h5地理定位错误处理
                        function showError(error) {
                            switch (error.code) {
                                case error.PERMISSION_DENIED:
                                    alert("User denied the request for Geolocation.");
                                    break;
                                case error.POSITION_UNAVAILABLE:
                                    alert("Location information is unavailable.");
                                    break;
                                case error.TIMEOUT:
                                    alert("The request to get user location timed out.")
                                    break;
                                case error.UNKNOWN_ERROR:
                                    alert("An unknown error occurred.");
                                    break;
                            }
                        }

                        /**
                         * hello world!
                         */
                        //wx获取地理位置
                        /*wx.getLocation({
                         type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                         success: function (res) {
                         var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                         var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                         var speed = res.speed; // 速度，以米/每秒计
                         var accuracy = res.accuracy; // 位置精度

                         regeocoder([parseInt(longitude), parseInt(latitude)]); //地理逆编码
                         wx.scanQRCode({
                         needResult: 1,
                         scanType: ["qrCode", "barCode"],
                         success: function (res) {
                         //扫描成功，发起验证请求
                         var result = res.resultStr;
                         $.ajax({
                         url: 'scanningVerify',
                         type: 'POST',
                         sync: true,
                         timeout: 15000,
                         data: {
                         md5: result || 'testingMD5',
                         location: currentLocation
                         }
                         }).success(function (data) {
                         //根据验证结果提示信息
                         $('.modal-body').text(data.content);
                         $('#IndexcheckResultDialog').modal('toggle');
                         });
                         }
                         });
                         }
                         });*/
                    } else {
                        //提示关闭wifi
                        $('#netTypeModal').modal('toggle');
                    }
                }
            });


        });
    });

    //微信配置错误处理
    wx.error(function (res) {
        alert('配置出现错误!')
    });

    //输入二维码验证
    $('.enterVertifyButton').click(function () {
        var qrCodeText = $('.qrCodeText').get(0).value;
        qrCodeText || alert('请输入二维码！');
        qrCodeText && $.ajax({
            url: 'scanningVerify',
            type: 'POST',
            async: true,
            data: {
                md5: qrCodeText,
                location: '成都'
            },
            timeout: 15000
        }).then(function (data) {
            console.log(data);
            $('.modal-body').text(data.content);
            $('#checkResultDialog').modal('toggle');
        }).error(function (err) {
            alert('请求出错!' + err);
        });
    });
});






var x = {
    month:[
        {
            day:[1,2,3,4,5,6,7,8,9,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
        },{},{},{},{},{},{},{},{},{},{},{}
    ]
};

for(var i = 0,len = x.month.length;i< len;i++){
    for(var j = 0,length = x.month[i].day.length;j<length;j++){
        $('.li').text(j+1);
    }
}

var timeStep = {
    "approvalTime":"2016-02-02",
    "startTime":"2016-02-11",
    "proposalTime":"2016-02-26",
    "capitalTime":"2016-03-02",
    "endTime":"2016-03-14"
};
var approval = new Date(timeStep.approvalTime),
    start = new Date(timeStep.startTime),
    proposal = new Date(timeStep.proposalTime),
    capital = new Date(timeStep.capitalTime),
    end = new Date(timeStep.endTime),
    myDate = new Date();
var s1 = approval.getTime(),
    s2 = start.getTime(),
    s3 = proposal.getTime(),
    s4 = capital.getTime(),
    s5 = end.getTime(),
    s0 = myDate.getTime();
var totalDay = (s5 - s1)/1000/ (24*60*60)+1,
    startDay= (s2 - s1)/1000/ (24*60*60),
    proposalDay= (s3 - s2)/1000/ (24*60*60),
    capitalDay = (s4 - s3)/1000/ (24*60*60),
    endDay = (s5 -s4)/1000/ (24*60*60),
    myDay =  (s0 -s1)/1000/ (24*60*60);

var timeBar_width = $(window).width()-120;
var timeStep_ML = timeBar_width/(totalDay);

for (var i = 0; i < totalDay; i++) {
    $('#timeBar').append('<li></li>');
}










