$(function () {

    var flag = false;

    var customerEmail = $.cookie("email");
    $(".customerName").text(customerEmail);
    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        } else { return null };
    }
    var lenovoID = GetQueryString("LenovoID");
    $(".LenovoName").text(lenovoID);
	//验证信息
    $("#submitBtn").click(function () {
        $(".completeMsg").text("");
        var completeName,completePhone,company;
        function checkEmpty(dom,warningdom,warningMsg){
            var infoName = $(dom).val().trim();//用户真实名字
            if (infoName === null || infoName === "" || infoName == undefined) {
                flag = false;
                $(warningdom).text(warningMsg);
                return;
            } else {
                flag = true;
                $(warningdom).text("");
                return infoName;
            }
        }
        completeName = checkEmpty("#Cusname", ".warningName", "Name cannot be empty");
        completePhone = checkEmpty("#phoneNum", ".warningPhone", "phoneNumber cannot be empty");
        company = checkEmpty("#Conpony", ".warningCompony", "company name cannot be empty");
        //获取职位信息
        var chk_positions = "";
        $('input[name="chk"]:checked').each(function () {
           chk_positions += $(this).val();
        });

        var radioLength = $('input[name="chk"]:checked').length;
        console.log(radioLength);
        if (radioLength == 0) {
            $(".radioClass").text("Select at least one");
            flag = false;
        } else {
            $(".radioClass").text("");
            flag = true;
        }

        var obj = {};
        obj.Name = completeName;
        obj.Phone = completePhone;
        obj.Company = company;
        obj.Depart = chk_positions;	
    
        if (flag == true) {
            $.ajax({
                type: "post",
                dataType: 'json',
                url: "../../EN/Handler/Person.ashx",
                data: {
                    method: "Complete",
                    content: JSON.stringify(obj)
                },
                success: function (res) {
                  
                    //0 失败，
                    //1 成功                	
                    if (res.Flag == 1) {
                        $(".completeMsg").text("Improve information success");
                        window.location.href = "RegisSuccessful.html";
                    } else if (res.Flag == 500) {
                        $("#LoginOut").zxxbox();
                        $("#loginBtn2").click(function () {
                            $.zxxbox.hide();
                        });
                        $("#wrapClose").click(function () {
                            window.location.href = "RegisSuccessful.html";
                        });
                    } else {
                        $(".completeMsg").text("Failure to improve information");
                    }
                },
                error: function (res) {
                    console.log(res)
                }
            });
        }
        })
        

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

