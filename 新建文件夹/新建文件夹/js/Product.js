$(function () {
    var customerEmail = $.cookie("email");
    $(".customerName").text(customerEmail);
    function nofind() {
        var img = event.srcElement;
        img.src = "http://support.lenovo.com.cn/images/fittings.jpg";
        img.onerror = null;
    };

    //	加载分页,一进来就是调用接口,当调用接口成功且返回来数据以后,更据总条数,假如一页显示5条,计算出一共有多少页
    var totalPages1 = 3;
    var lastPage;
    var flag = false;
    pageLoad();
    function pageLoad() {
        var visiblePages = 3;//可见几页
        var currentPage = 1;
        var pageInde = 1;
        var pagesize = 10;
        var a = Load(pagesize, currentPage);
    };
    function Load(pagesize, PageIndex) {
        $(".machineOne").empty();
        $.ajax({
            url: "../../EN/Handler/Product.ashx",
            type: "post",
            data: {
                EventType: "SearchProduct",
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
                var totalCount = result.Flag;
                lastPage = Math.ceil(totalCount / pagesize);
                var res = JSON.parse(result.Message);
              
                for (var i = 0 ; i < res.length; i++) {
                    if (res[i].PicPath == null) {
                        res[i].PicPath = "http://support.lenovo.com.cn/images/fittings.jpg";
                    };
                    var productLine = res[i].ProductLine;
                    switch (res[i].ProductLine)
                    {
                        case "笔记本":
                            productLine = "Notebook";
                            break;
                        case "台式":
                            productLine = "Desktop";
                            break;
                        case "服务器":
                            productLine = "Server";
                            break;
                        default:
                            break;
                    }
                    var html = "<ul class=productUl id=" + res[i].Id + " name=Ul" + res[i].Id + "><li><img src=" + res[i].PicPath + "></li><li id= " + res[i].Id + " ProductSN=" + res[i].ProductSN + " ><p>" + res[i].ProductName + "</p></li><li><p>" + res[i].ProductSN + "</p></li><li><p>" + productLine + "</p></li><li><p>" + res[i].SerialName.replace("系列","") + "</p></li><li class=floatR><button><a href=repair.html?ProductSN=" + res[i].ProductSN + ">Repair</a></button><button class=removeBtn>Unbind</button></li></ul>"
                    $(".machineOne").append(html);
                    flag = true;

                    if (flag == true) {
                        $(".removeBtn").click(function () {
                            var dom = $(this).parents(".productUl");
                            var removeID = dom.attr("id");

                            $.ajax({
                                url: "../../EN/Handler/Product.ashx",
                                type: "post",
                                data: {
                                    EventType: "UnbindProduct",
                                    Id: removeID
                                },
                                success: function (result) {
                                   
                                    var res = JSON.parse(result);
                                    if (res.Flag == 1) {
                                        window.location.href = "Product.html";
                                    }
                                }
                            });
                        });
                    };
                    };
                };

                $.jqPaginator('#box', {
                    totalPages: lastPage,
                    visiblePages: 3,
                    currentPage: PageIndex,
                    //这个函数使用来获取分页条上显示的第几页数，在这里写ajax请求，吧num传入后台
                    onPageChange: function (num, type) {
                        if (type != "init") {
                            pagesize = 10;
                            productLineType = num;
                            $(".threeUl").empty();
                            Load(pagesize, productLineType);
                        }
                    }
                });
            }
        });
    };

    //点击绑定弹出框
    $(".topBtn").click(function () {
        $("#bindSN").zxxbox();
        ProductInfoBind();
    });
    $("#loginBtn4").click(function () {
        $.zxxbox.hide();
    });
    $("#cancelBtn4").click(function () {
        $.zxxbox.hide();
    });
    //绑定sn方法
    function ProductInfoBind() {
        var SN = $.trim($("#product-number").val());
        var obj = {};
        obj.EventType = "ProductBind";
        obj.ProductSN = SN;
        $.ajax({
            type: "Post",
            data: obj,
            dataType: "json",
            url: "../../EN/Handler/Product.ashx",
            success: function (data) {
              
                $("#loginBtn").click(function () {
                    $.zxxbox.hide();
                });
                if (data.Flag == 1) {
                    $(".waringMsg").text(data.Message);
                    //$("#BindSuccess").click(function () {
                    //    $("#bindSN").zxxbox();
                    //    ProductInfoBind();
                    //});
                    //$("#loginBtn1").click(function () {
                    //    $.zxxbox.hide();
                    //});
                    window.location.reload();
                } else if (data.Flag == 2) {
                    $(".waringMsg").text(data.Message);
                } else if (data.Flag == 3) {
                    $(".waringMsg").text(data.Message);
                } else if(data.Flag == 500){
                    $("#LoginOut").zxxbox();
                    $("#loginBtn2").click(function(){
                        $.zxxbox.hide();
                    });
                    $("#wrapClose").click(function () {
                        window.location.href = "Login.html";
                    })
                 }else{}

            },
            error: function (data) {
                alert(data);
            }
        });
    }

    //绑定sn是弹窗的确定键
    $("#loginBtn").click(function () {
        ProductInfoBind();
    });
    $("#cancelBtn").click(function () {
        $.zxxbox.hide();
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