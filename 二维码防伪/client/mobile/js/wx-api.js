/**
 * Created by zen on 2016/2/17.
 */

wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: 'wx0fee3125621bd354', // 必填，公众号的唯一标识
    timestamp: '2016-02-17 15:31:30', // 必填，生成签名的时间戳
    nonceStr: 'werqwer3wert', // 必填，生成签名的随机串
    signature: '0f9de62fce790f9a083d5c99e95740ceb90c27ed',// 必填，签名，见附录1
    jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
});

wx.ready(function(){
    // config信息验证后会执行ready方法，
    // 所有接口调用都必须在config接口获得结果之后，
    // config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，
    // 则须把相关接口放在ready函数中调用来确保正确执行。
    // 对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
    console.log('准备完毕');
    wx.scanQRCode({
        needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
        success: function (res) {
            var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
        }
    });
});

wx.error(function(res){
    // config信息验证失败会执行error函数，
    // 如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，
    // 也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
    console.log('配置出现错误')
});

wx.checkJsApi({
    jsApiList: ['chooseImage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
    success: function(res) {
        // 以键值对的形式返回，可用的api值true，不可用为false
        // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
        console.log('当前支持微信JS api');
    }
});
