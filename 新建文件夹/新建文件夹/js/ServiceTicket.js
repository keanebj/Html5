$(function () {
    var customerEmail = $.cookie("email");
    $(".customerName").text(customerEmail);
    $(".ReservedSuccessfully ").addClass("active");
    $(".top li").bind("click", function () {
        $(this).addClass("active").siblings().removeClass("active")
    })

    $(".hadAct li").bind("click", function () {
        $(this).addClass("active").siblings().removeClass("active")
    })

    //默认加载预约单的信息
    var totalPages1 = 3;
    var lastPage;
    pageLoad();
    function pageLoad() {
        var visiblePages = 5;//可见几页
        var currentPage = 1;
        var pageInde = 1;
        var pagesize = 10;
        var a = Load(pagesize, currentPage, "", "id");
    };

    //点击预约单，传空
    $(".ReservedSuccessfully").click(function () {
        $(".serviceListBox").css("display", "none");
        $(".repairListBox").css("display", "block");
        $(".reservedSuccessfully").empty();
        var totalPages1 = 3;
        var lastPage;
        pageLoad();
        function pageLoad() {
            var visiblePages = 5;//可见几页
            var currentPage = 1;
            var pageInde = 1;
            var pagesize = 10;
            var a = Load(pagesize, currentPage, "", "id");
        };
    });
    //点击服务单,传service
    $(".ServiceFinished").click(function () {
        $(".serviceListBox").css("display", "block");
        $(".repairListBox").css("display", "none");
        $(".reservedSuccessfully").empty();
        var totalPages1 = 3;
        var lastPage;
        pageLoad();
        function pageLoad() {
            var visiblePages = 5;//可见几页
            var currentPage = 1;
            var pageInde = 1;
            var pagesize = 10;
            var a = Load(pagesize, currentPage, "Service", "soid");
        };
    });
    function Load(pagesize, PageIndex, productType, IDName) {
        $.ajax({
            url: "../../EN/Handler/Repair.ashx",
            type: "post",
            data: {
                EventType: "GetServiceSOInfoPagedList",
                ProductType: productType,    // 传空
                PageIndex: PageIndex,
                PageSize: pagesize,
            },
            success: function (data) {

                if (JSON.parse(data).Flag == 500) {
                    $("#LoginOut").zxxbox();
                    $("#loginBtn2").click(function () {
                        $.zxxbox.hide();
                    });
                    $("#wrapClose").click(function () {
                        window.location.href = "Login.html";
                    });
                } else {
                    var result = JSON.parse(data);
                    var totalCount = result.rescount;
                    var res = result.CustomerSoInfo;
                    lastPage = Math.ceil(totalCount / pagesize);
                    for (var i = 0; i < res.length; i++) {                     
                        var da = eval('new ' + (res[i].CreateTime.replace(/\//g, '')));
                        da = new Date(da);
                        var year = da.getFullYear();
                        var month = da.getMonth() + 1;
                        var date = da.getDate();
                        var hours = da.getHours();
                        var mi = da.getMinutes();
                        var second = da.getSeconds();
                        var currentTime = [year, month, date].join('-');
                        var curhour = [hours, mi, second].join(':')

                        var ti = res[i].ModifyTime;
                        if (ti == undefined || ti === "" || ti === null) { } else {
                            var modifyTime = eval('new ' + (res[i].ModifyTime.replace(/\//g, '')));
                            modifyTime = new Date(modifyTime);
                            var year = modifyTime.getFullYear();
                            var month = modifyTime.getMonth() + 1;
                            var date = modifyTime.getDate();
                            var hours = modifyTime.getHours();
                            var mi = modifyTime.getMinutes();
                            var second = modifyTime.getSeconds();
                            var modifyTime = [year, month, date].join('-');
                            var modifyhour = [hours, mi, second].join(':')
                        }
                        if (IDName == "id") {
                            var html = "<div class=machineOne><div><ul><li>" + res[i].Id + "</li><li>" + res[i].ProductSN + "</li><li>" + res[i].FaultPhenoment + "</li><li>" + res[i].BreakPart + "</li><li>Reserved</li><li>" + currentTime + ' ' + curhour + "</li></ul></div></div>";
                            $(".reservedSuccessfully").append(html);
                        } else if (IDName == "soid") {
                            var html = "<div class=machineOne><div><ul><li class=soid>" + res[i].SoId + "</li><li>" + res[i].ProductSN + "</li><li>" + res[i].FaultPhenoment + "</li><li>" + res[i].BreakPart + "</li><li>" + modifyTime + ' ' + modifyhour + "</li><li soid=" + res[i].SoId + " class=CheckDetail1>Detail</li></ul></div></div>";
                            $(".reservedSuccessfully").append(html);
                        } else { }
                    }
                    $.jqPaginator('#box', {
                        totalPages: lastPage,
                        visiblePages: 5,
                        currentPage: PageIndex,

                        onPageChange: function (num, type) {
                            if (type != "init") {
                                pagesize = 10;
                                productLineType = num;
                                $(".reservedSuccessfully").empty();
                                Load(pagesize, productLineType, productType, IDName);
                            }
                        }
                    });
                    $(".CheckDetail1").click(function () {
                        $(".detailMsg ul").empty();
                        var SOID = $(this).attr("soid");
                        var info = {
                            method: "GetOStatusBySOID",
                            soid: "201712262100880004"
                        };

                        checkDetail(info);
                    });
                }
            }
        });
    };

    //查看详情信息
    function checkDetail(info) {
        $.ajax({
            url: "../../EN/Handler/bindHandler.ashx",
            type: "post",
            data: info,
            success: function (data) {

                if (data == undefined || data === "" || data === null) {
                } else {
                    $(".detailMsg").css("display", "block");
                    $(".detailMsg ul").append(data);
                }
            }
        });
    };

    $(".closeBtn").click(function () {
        $(".detailMsg ").css("display", "none");
    });


    //退出按钮
    $(".LogOut").click(function () {
        $.ajax({
            type: "Post",
            url: "../../EN/Handler/Person.ashx",
            data: {
                method: "LogOut",
            },
            success: function (data) {

                var res = JSON.parse(data);
                if (res.Flag == 1) {
                    window.location.href = "Login.html";
                    $.cookie("email", null);
                }
            }
        })
    });
});
