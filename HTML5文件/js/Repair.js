$(function () {   
    var customerEmail = $.cookie("email");
    $(".customerName").text(customerEmail);
    $(".nextBox").attr("disabled", true);
    $(".nextBox").css("backgroundColor", "grey");
    //var aa = false;//表示是不是直接从product页面中跳转过来的，false为不是，true为是
    var SNInfo = GetQueryString("ProductSN");
    if (SNInfo == undefined || SNInfo === "" || SNInfo === null) {
        $(".secondSteep").css("display", "none");
        $(".fristSteep").css("display", "block");
    } else {
        $(".secondSteep").css("display", "block");
        $(".fristSteep").css("display", "none");
        $(".machine").get(0).innerHTML = '<n class=ok_snlist id="ok_snlist">' + SNInfo + '</n>';
    };

   
    //	加载分页,一进来就是调用接口,当调用接口成功且返回来数据以后,更据总条数,假如一页显示5条,计算出一共有多少页
    var totalPages1 = 3;
    var lastPage;
    pageLoad();
    function pageLoad() {
        var visiblePages = 5;//可见几页
        var currentPage = 1;
        var pageInde = 1;
        var pagesize = 3;
        var a = Load(pagesize, currentPage);
       
    };
    function Load(pagesize, PageIndex) {
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
                        var html = "<li class=checkGB  id= " + res[i].Id + " ProductSN=" + res[i].ProductSN + " IsGuoBao=" + res[i].IsGuoBao + " ><input class='items'  type='checkbox' name='items'  value='" + res[i].ProductSN + "'><span>" + res[i].ProductName + "</span><span>" + res[i].ProductSN + "</span></li>"
                        $(".threeUl").append(html);
                    };

                    $.jqPaginator('#box', {
                        totalPages: lastPage,
                        visiblePages: 5,
                        currentPage: PageIndex,
                        //这个函数使用来获取分页条上显示的第几页数，在这里写ajax请求，吧num传入后台
                        onPageChange: function (num, type) {
                            if (type != "init") {
                                pagesize = 3;
                                productLineType = num;
                                $(".threeUl").empty();
                                Load(pagesize, productLineType);
                            }
                        }
                    })
                }
            }
        });
        return
    };

    $(".nextBox").click(function () {
        $(".secondSteep").css("display", "block");
        $(".fristSteep").css("display", "none");
        //nextStep();
    });

    $(".fristP").click(function () {
        $(this).addClass("on");
        $(".secondP").removeClass("on")
        $(".fristSteep").css("display", "block");
        $(".secondSteep").css("display", "none");
    });
    $(".secondP").click(function () {
        $(this).addClass("on");
        $(".fristP").removeClass("on")
        $(".secondSteep").css("display", "block");
        $(".fristSteep").css("display", "none");
    });
    var addNumCount = 0;
    $(".addBtn").click(function () {
        if (addNumCount < 2) {
            var html = "<ul id=" + addNumCount + " class=nextUl><li><input type=text  id=linkMan/></li><li><input type=text id=phone/></li><li><input type=text id=email/></li></ul>";
            $(".addBOX").append(html);
            $($(".addBOX ul")[addNumCount]).prop('id', "info" + addNumCount);
            addNumCount = addNumCount + 1;
            $(".addBtn").css("display", "none");
            $(".removeBtn").css("display", "block");
        } else {
            //alert("最多只能加一组！");
        }
    });

    var flag = ''
    $(".addBtn").click(function () {
        flag = "true"
        addNumCount = $(".addBOX ul").length;
    });
    $(".removeBtn").click(function () {
        var lastChild = $(".addBOX")[0].children;
        $(lastChild).eq(-1).remove();
        if (addNumCount >= 1) {
            addNumCount = addNumCount - 1;
        } else {
            addNumCount = 0;
        }
        $(".addBtn").css("display", "block");
        $(".removeBtn").css("display", "none");
    });

    //点击绑定弹出框
    $("#bindBtn").click(function () {
        $("#bindSN").zxxbox();
    });
    $("#loginBtn").click(function () {
        ProductInfoBind();
        $.zxxbox.hide();
    });
    $("#cancelBtn").click(function () {
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
               
                $(".warningText").text(data.Message);
                if (data.Flag == 1) {
                    window.location.href = "Repair.html";
                    $(".warningText").text(data.Message);
                }
            },
            error: function (data) {
                alert(data);
            }
        });
    }
    //点击下一步
    $(".nextBox").click(function () {
        $(".secondSteep").css("display", "block");
        $(".fristSteep").css("display", "none");
        nextStep();
    });
    $(".fristP").click(function () {
        $(".fristSteep").css("display", "block");
        $(".secondSteep").css("display", "none");
    });
    $(".secondP").click(function () {
        $(".secondSteep").css("display", "block");
        $(".fristSteep").css("display", "none");
    });
})

function GetQueryString(name, url) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var txturl = window.location.search.substr(1);
    if (url)
        txturl = url.substr(url.indexOf('?') + 1);
    var r = txturl.match(reg);
    if (r != null) return unescape(r[2]); return null;
}

var productListInfo = "";
//勾选CheckBox 显示是否过期
var dom;
$(function () {
    $('.items').live("click", function () {
        dom = $(this);
       
        var tempThis = this;
        var flag = true;
        var Guoqi = true;
        var selectCount = $('input[type=checkbox][name=items]:checked').length;
       
        $(".selectCount").text(selectCount);
        if (selectCount == 0) {
            $(".nextBox").attr({ "disabled": "disabled" });
            $(".nextBox").css({ "backgroundColor": "grey" });
        } else {
            $(".nextBox").removeAttr("disabled");
            $(".nextBox").css({ "backgroundColor": "#E12726" });
        };
        var isGuoBao = $(this).parents(".checkGB")[0].getAttribute("isguobao");
        if (isGuoBao == 1) {
            //点击绑定弹出框
            $("#GuoPi").zxxbox();
        } else {
            //$(".msg").text("Not been confirmed");
        }
    });
    $("#loginBtn4").click(function () {
        $.zxxbox.hide();
    });
    $("#cancelBtn4").click(function () {
        $.zxxbox.hide();
        dom[0].checked = false;
        var selectCount = $('input[type=checkbox][name=items]:checked').length;
        console.log(selectCount);
        $(".selectCount").text(selectCount);
        if (selectCount == 0) {
            $(".nextBox").attr("disabled", true);
            $(".nextBox").css("backgroundColor", "grey");
        } else {
            $(".nextBox").attr("disabled", false);
            $(".nextBox").css("backgroundColor", "#E12726");
        }


    });
});

var productListInfo = "";
function nextStep() {
    var countChecked = $('input[type=checkbox][name=items]:checked').length;
    if (countChecked > 0) {
        productListInfo = "";
        $("input[type=checkbox][name=items]:checked").each(function () {
            productListInfo += $(this).val() + "$";
        });
       

        if (productListInfo.length > 0) {
            var ok_str = productListInfo.split('$');
            
            $(".machine").get(0).innerHTML = '<n class=ok_snlist id="ok_snlist">' + ok_str + '</n>';
        }
    }
}

//第二步的操作
$(function () {
    //检测是否输入为空
    function checkEmpty(dom, warningdom, warningMsg) {
        var infoName = $(dom).val().trim();//用户真实名字
        if (infoName === null || infoName === "" || infoName == undefined) {
            $(warningdom).text(warningMsg);
            return "";
        } else {
            $(warningdom).text("");
            return infoName;
        };
    };

    $(".submitBtn").bind("click", function () {
        var snStr = $(".ok_snlist").text().split(",").join("$");
        var obj = [];
        var info = {};
        var faultPhenomeno = checkEmpty("#faultDesc", ".textmsg", "name cannot be empty");
        var Brokenpart = checkEmpty("#brokenPart", ".textmsg", "Damaged part description");
        var Location = checkEmpty("#detailPosition", ".textmsg", "company address cannot be empty");
        var linkMan = checkEmpty("#linkMan", ".textmsg", "Contacts cannot be empty");
        var phone = checkEmpty("#phone", ".textmsg", "phone cannot be empty");
        var Email = checkEmpty("#email", ".textmsg", "Mailbox cannot be empty");
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (filter.test(Email)) {
                email = Email;
                $(".textmsg").text("");
            } else {
                $(".textmsg").text("Incorrect login email format");
                return false
            };

        info.FaultPhenoment = faultPhenomeno;
        info.BreakPart = Brokenpart;
        info.Address = Location;
        info.ContactName = linkMan;
        info.ContactPhone = phone;
        info.ContactMail = Email;
        info.contactList = obj;
        info.ProductSN = snStr;
        obj.push({
            ContactName: info.ContactName,
            ContactPhone: info.ContactPhone,
            ContactMail: info.ContactMail,
        });

        var count = $(".addBOX ul").length;
        {
            for (var i = 0 ; i < count; i++) {
                var dom1 = '#info' + i;
                obj.push({
                    ContactName: $(dom1)[0].childNodes[0].lastChild.value,
                    ContactPhone: $(dom1)[0].childNodes[1].lastChild.value,
                    ContactMail: $(dom1)[0].childNodes[1].lastChild.value,
                });
            }
        }
       
        var ff = false;
        jQuery.each(info, function (i, val) {
            if (val == undefined || val === "" || val === null) {
                ff = false;
                return false
            } else {
                ff = true;
            };
        });
       
        if (ff == true) {
            $(".textmsg").text("");
            var jsonInfo = JSON.stringify(info);
            $.ajax({
                url: "../../EN/Handler/Repair.ashx",
                type: "post",
                dataType: "json",
                data: {
                    EventType: "SubmitWebIRInfo",
                    info: jsonInfo
                },
                success: function (res) {
                   
                    if (res === null) {
                        return false;
                    } else {
                        //var result = JSON.parse(res);
                        if (res.Flag == 1) {
                            //var res = result.Message;
                            $("#repairSuccess").zxxbox();
                            $(".submitBtn").attr("disabled", true);
                            $(".submitBtn").css("backgroundColor", "grey");

                            $("#loginBtn3").click(function () {
                                $.zxxbox.hide();
                            });
                            $("#cancelBtn3").click(function () {
                                $.zxxbox.hide();
                                window.location.href = "Repair.html";
                            });
                        } else if (res.Flag == 500) {
                            $("#LoginOut").zxxbox();
                            $("#loginBtn2").click(function () {
                                $.zxxbox.hide();
                            });
                            $("#wrapClose").click(function () {
                                window.location.href = "Login.html";
                            });
                        } else { }
                    }
                }
            })
        } else {
            $(".textmsg").text("The number of the * is mandatory");
          };
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
})



