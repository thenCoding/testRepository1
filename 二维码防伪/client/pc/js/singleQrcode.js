/**
 * Created by lee on 2016/2/15.
 */
jQuery(function () {
    var productNumber = $('.productNumber');
    var factoryYears = $('.factoryYears');
    var totalProductionNumber = $('.totalProductionNumber');
    productNumber.keyup(function () {
        if (productNumber.get(0).value.length >= 6) {
            productNumber.blur();
            factoryYears.focus();
        }
    });
    factoryYears.keyup(function () {
        if (factoryYears.get(0).value.length >= 4) {
            factoryYears.blur();
            totalProductionNumber.focus();
        }
    });
    totalProductionNumber.keyup(function () {
        if (totalProductionNumber.get(0).value.length >= 5) {
            totalProductionNumber.blur();
        }
    });
    $(".determine").click(function () {
        $('#qrCodeImg').empty();
        $('#qrCode').css('display','block');
        var serialNumber = '';
        jQuery('#qrCode').empty();
        $.ajax({
            url: 'productEntryAndGenerateQRcode',
            type: 'POST',
            async: true,
            data: {
                model: $('.productNumber').get(0).value,
                serialNumber: $('.factoryYears').get(0).value + $('.totalProductionNumber').get(0).value
            }
        }).then(function (data) {
            if (data.status == 0) {
                serialNumber = data.content;
                jQuery('#qrCode').qrcode({
                    render: "canvas", //canvas方式
                    width: 200,//宽度
                    height: 200,//高度
                    text: serialNumber //生成二维码内容
                });
                var md5SerialNumber = serialNumber.split('=');
                var md5 = $('<p>' + md5SerialNumber[0] + '</p>');
                $('#qrCode').append(md5);

                html2canvas(document.getElementById("qrCode"), {
                    allowTaint: true, taintTest: true,
                    onrendered: function (canvas) {
                        canvas.id = "myTest";
                        //document.body.appendChild(canvas);
                        // 生成base64图片数据
                        var dataUrl = canvas.toDataURL();
                        var newImg = document.createElement("img");
                        newImg.src = dataUrl;
                        $('#qrCodeImg').append(newImg);
                        $('#qrCode').css('display','none')
                    }
                });
            }
        });
    });

    $(".cancel").click(function () {
        $('#qrCodeImg').empty();
        jQuery('#qrCode').empty();
    })
});
