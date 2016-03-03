/**
 * Created by lee on 2016/2/16.
 */
jQuery(function () {
    var totalPageNumbers;
    var getData = function () {
        $.ajax({
            type: "POST",
            url: "getTotalProductsNumber",
            data: ''
        }).then(function (data) {
            totalPageNumbers = data.content.totalNumber;
            var pageIndex = 0;     //页面索引初始值
            var pageSize = 9;     //每页显示条数初始化，修改显示条数，修改这里即可
            $(function () {
                $.ajax({
                    type: "POST",
                    url: 'getTotalProductsNumber',      //提交到一般处理程序请求数据
                    data: {}
                }).then(function (data) {
                    for (var i = 0; i < 9; i++) {
                        $($('.footerTableUl li:nth-child(1)').get(i)).text(data.content.data[i].productModel);
                        $($('.footerTableUl li:nth-child(2)').get(i)).text(data.content.data[i].serialNumber);
                        $($('.footerTableUl li:nth-child(3)').get(i)).text(data.content.data[i].status);
                        $($('.footerTableUl li:nth-child(4)').get(i)).text(data.content.data[i].checkTimes);
                    }
                });
                InitTable(0);    //Load事件，初始化表格数据，页面索引为0（第一页）
                //分页，PageCount是总条目数，这是必选参数，其它参数都是可选
                $("#Pagination").pagination(totalPageNumbers, {
                    callback: PageCallback,  //PageCallback() 为翻页调用次函数。
                    prev_text: "« 上一页",
                    next_text: "下一页 »",
                    items_per_page: pageSize,
                    num_edge_entries: 2,       //两侧首尾分页条目数
                    num_display_entries: 6,    //连续分页主体部分分页条目数
                    current_page: pageIndex   //当前页索引
                });
                //翻页调用
                function PageCallback(index, jq) {
                    InitTable(index);
                }

                //请求数据
                function InitTable(pageIndex) {
                    $.ajax({
                        type: "POST",
                        url: 'getCurrentPageData',      //提交到一般处理程序请求数据
                        data: "pageIndex=" + (parseInt(pageIndex) + 1)      //提交两个参数：pageIndex(页面索引)，pageSize(显示条数)
                    }).then(function (data) {
                        $('.footerTableUl li:nth-child(5)').empty();
                        for (var i = 0; i < data.content.data.length; i++) {
                            var productStatus;
                            if (data.content.data[i].status == 0) {
                                productStatus = "未验证"
                            } else {
                                productStatus = "已验证"
                            }
                            $($('.footerTableUl li:nth-child(1)').get(i)).text(data.content.data[i].productModel);
                            $($('.footerTableUl li:nth-child(2)').get(i)).text(data.content.data[i].serialNumber);
                            $($('.footerTableUl li:nth-child(3)').get(i)).text(productStatus);
                            $($('.footerTableUl li:nth-child(4)').get(i)).text(data.content.data[i].checkTimes);
                            $('.footerTableUl li:nth-child(5)').get(i).data = data.content.data[i];
                        }
                        var button = '<button type="button" data-toggle="modal" data-target="#mymodal" class="detailButton">查看详情</button>';
                        $('.footerTableUl li:nth-child(5)').append(button);
                    })
                }
            });
        })
    };
    getData();
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

    $('.currentLi').click(function () {
        console.log(this.data);
        $("#modalFooterTable").empty();
        var checkInfo = JSON.parse(this.data.checkInfo);
        console.log(checkInfo.length);
        for (var i = 0; i < checkInfo.length; i++) {
            var ul = "<ul>" +
                "<li>" + this.data.productModel + "</li>" +
                "<li>" + this.data.serialNumber + "</li>" +
                "<li>" + this.data.checkTimes + "</li>" +
                "<li>" + checkInfo[i].checkTime + "</li>" +
                "<li>" + checkInfo[i].checkLocation + "</li>" +
                "</ul>";
            $("#modalFooterTable").append(ul)
        }
    });

    /*
    点击查询按钮发起ajax请求
     */
    $('.queryButton').click(function () {
        if( productNumber.get(0).value.length != 0|| factoryYears.get(0).value.length != 0||totalProductionNumber.get(0).value.length != 0){
            $('#Pagination').css('display', 'none');
            $('#queryPagination').css('display', 'block');
            $.ajax({
                type: "POST",
                url: "getFilteredProducts",
                data: {
                    "model": $(".productNumber").get(0).value,
                    "serialNumber": $(".factoryYears").get(0).value + $(".totalProductionNumber").get(0).value
                }
            }).then(function (data) {
               var queryTotalPageNumbers = data.content.totalNumber;
                var pageIndex = 0;     //页面索引初始值
                var pageSize = 9;     //每页显示条数初始化，修改显示条数，修改这里即可
                $('.footerTableUl li').empty();
                for (var i = 0; i < data.content.data.length; i++) {
                    var productStatus;
                    if (data.content.data[i].status == 0) {
                        productStatus = "未验证"
                    } else {
                        productStatus = "已验证"
                    }
                    $($('.footerTableUl li:nth-child(1)').get(i)).text(data.content.data[i].productModel);
                    $($('.footerTableUl li:nth-child(2)').get(i)).text(data.content.data[i].serialNumber);
                    $($('.footerTableUl li:nth-child(3)').get(i)).text(productStatus);
                    $($('.footerTableUl li:nth-child(4)').get(i)).text(data.content.data[i].checkTimes);
                    $('.footerTableUl li:nth-child(5)').get(i).data = data.content.data[i];
                    var button = '<button type="button" data-toggle="modal" data-target="#mymodal" class="detailButton">查看详情</button>';
                    $('.footerTableUl li:nth-child(5)').eq(i).append(button)
                }

                InitTable(0);    //Load事件，初始化表格数据，页面索引为0（第一页）
                //分页，PageCount是总条目数，这是必选参数，其它参数都是可选
                $("#queryPagination").pagination(queryTotalPageNumbers, {
                    callback: PageCallback,  //PageCallback() 为翻页调用次函数。
                    prev_text: "« 上一页",
                    next_text: "下一页 »",
                    items_per_page: pageSize,
                    num_edge_entries: 2,       //两侧首尾分页条目数
                    num_display_entries: 6,    //连续分页主体部分分页条目数
                    current_page: pageIndex   //当前页索引
                });
                //翻页调用
                function PageCallback(index, jq) {
                    InitTable(index);
                }

                //请求数据
                function InitTable(pageIndex) {
                    $.ajax({
                        type: "POST",
                        url: 'getCurrentPageData',      //提交到一般处理程序请求数据
                        data: "pageIndex=" + (parseInt(pageIndex) + 1)      //提交两个参数：pageIndex(页面索引)，pageSize(显示条数)
                    }).then(function (data) {
                        $('.footerTableUl li:nth-child(5)').empty();
                        for (var i = 0; i < data.content.data.length; i++) {
                            var productStatus;
                            if (data.content.data[i].status == 0) {
                                productStatus = "未验证"
                            } else {
                                productStatus = "已验证"
                            }
                            $($('.footerTableUl li:nth-child(1)').get(i)).text(data.content.data[i].productModel);
                            $($('.footerTableUl li:nth-child(2)').get(i)).text(data.content.data[i].serialNumber);
                            $($('.footerTableUl li:nth-child(3)').get(i)).text(productStatus);
                            $($('.footerTableUl li:nth-child(4)').get(i)).text(data.content.data[i].checkTimes);
                            $('.footerTableUl li:nth-child(5)').get(i).data = data.content.data[i];
                        }
                        var button = '<button type="button" data-toggle="modal" data-target="#mymodal" class="detailButton">查看详情</button>';
                        $('.footerTableUl li:nth-child(5)').append(button);
                    })
                }


            })
        }
    });


/*
点击取消按钮
 */
    $('.cancelButton').click(function () {
        $('#queryPagination').css('display', 'none');
        $('#Pagination').css('display', 'block');
        getData();
        productNumber.get(0).value = '';
        factoryYears.get(0).value = '';
        totalProductionNumber.get(0).value = ''
    })

});
