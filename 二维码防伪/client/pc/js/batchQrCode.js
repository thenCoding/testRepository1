/**
 * Created by lee on 2016/2/16.
 */
jQuery(function(){
    jQuery('#abc').qrcode("777AF9894F30DFC4994CD78848E1C7C0");

    var productNumber=$('.productNumber');
    var factoryYears=$('.factoryYears');
    var totalProductionNumber=$('.totalProductionNumber');
    var totalProductionEndNumber=$('.totalProductionEndNumber');
    productNumber.keyup(function () {
        if(productNumber.get(0).value.length>=6){
            productNumber.blur();
            factoryYears.focus();
        }
    });
    factoryYears.keyup(function () {
        if(factoryYears.get(0).value.length>=4){
            factoryYears.blur();
            totalProductionNumber.focus();
        }
    });
    totalProductionNumber.keyup(function () {
        if(totalProductionNumber.get(0).value.length>=5){
            totalProductionNumber.blur();
            totalProductionEndNumber.focus();
        }
    });
    totalProductionEndNumber.keyup(function () {
        if(totalProductionEndNumber.get(0).value.length>=5){
            totalProductionEndNumber.blur();
            if(parseInt(totalProductionNumber.get(0).value)>parseInt(totalProductionEndNumber.get(0).value)){
                alert('起始编号不能大于结束编号请重新输入');
                totalProductionNumber.get(0).value='';
                totalProductionEndNumber.get(0).value='';
                totalProductionNumber.focus();
            }else if(parseInt(totalProductionEndNumber.get(0).value)-parseInt(totalProductionNumber.get(0).value)>1000){
                alert('超过数量限制最大为1000');
                totalProductionNumber.get(0).value='';
                totalProductionEndNumber.get(0).value='';
                totalProductionNumber.focus();
            }
        }
    });

    $(".determine").click(function(){
        var serialNumber='';
        jQuery('#qrCode').empty();
        var k=parseInt(totalProductionEndNumber.get(0).value)-parseInt(totalProductionNumber.get(0).value);
        var serialNumberArray=[];
        for(var i=0;k>=i;i++){
            var j=parseInt($('.factoryYears').get(0).value+$('.totalProductionNumber').get(0).value)+parseInt(i);
            if(j<100000000){
                j= 0+ j.toString();          //判断输入数，调整传参
            }
            serialNumberArray.push(j)
        }

        $.ajax({
            url:'productsEntryAndPackageQRcode',
            type:'POST',
            async:true,
            data:{
                model:$('.productNumber').get(0).value,
                serialNumber:serialNumberArray
            }
        }).then(function (data) {

        });
    });

});
