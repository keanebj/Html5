$(function () {
    //var chk_index;
    var chkName;
    var modifyBtn = $("#modifyBtn");
    var saveBtn = $("#saveBtn");
    modifyBtn.click(function () {
        if (chkName !== undefined || chkName !== "" || chkName !== null) {
            chkName = chkName;
            $("input[value='" + chkName.toLowerCase() + "']")[0].checked = true;
            //console.log($("input[value='" + chkName.toLowerCase() + "']")[0]);

        } else { }
        modifyBtn.css("display", "none");
        saveBtn.css("display", "block");
        $(".personalInfo input").removeAttr('readonly').css("border", "1px solid grey");
        $("#BindEmial").attr("readonly", "true").css("border", "none");
        $("#departName").css("display", "none");
        $(".departUL").css("display", "block");
       
    });
    saveBtn.click(function () {
        modifyBtn.css("display", "block");
        saveBtn.css("display", "none");
        $(".personalInfo input").attr('readonly', "ture").css("border", "none");
        $("#departName").css("display", "block");
        $(".departUL").css("display", "none");
    });
    fun();
//一打开页面就加载这个用户的相关信息并绑定
function fun(){
		$.ajax({
			 type: "Post",
			 url: "../../EN/Handler/Person.ashx",
			 data: {
			     method: "getinfo",
			 },
			 success: function (data) {
			  
			     var result = JSON.parse(data);
			     if (result.Flag == 1) {
			         var res = JSON.parse(result.Message);
			        
			         if (res.DetailAddress == null || res.DetailAddress === "" || res.DetailAddress === null) {
			             res.DetailAddress = '';
			         }
			         if (res.Position == null || res.Position === "" || res.Position === null) {
			             res.Position = '';
			         }
			         if (res.EngineerCode == null || res.EngineerCode === "" || res.EngineerCode === null) {
			             res.EngineerCode = '';
			         }
			         $("#name").val(res.Name);
			         $("#phoneNumber").val(res.Phone);
			         $("#BindEmial").val(res.Email);
			         $(".customerName").text(res.Email);
			         $("#CompanyName").val(res.Company);
			         $("#departName").val(res.Depart);
			         chkName = res.Depart;
			         //window.location.reload();
			     } else if (result.Flag == 500) {
			         $("#LoginOut").zxxbox();
			         $("#loginBtn2").click(function () {
			             $.zxxbox.hide();
			         });
			         $("#wrapClose").click(function () {
			             window.location.href = "Login.html";
			         });
			     } else { }
			 }
       })
	}
$("#saveBtn").click(function () {
    //获取职位信息
    var falg = false;
    var chk_positions = "";
    $('input[name="chk"]:checked').each(function () {
        chk_positions += $(this).val();
    });
    //获取公司名称
    var CompanyNames = $("#CompanyName").val();
    var nmae = $("#name").val();
    var phone = $("#phoneNumber").val();
    var department = $("#departName").val();
    if (CompanyNames === "" || CompanyNames === null || CompanyNames == undefined) {
        $(".company").text("The company name cannot be empty");
        flag = false;
        return;
    } else {
        $(".company").text("");
        flag = true;
    };
    if (nmae === "" || nmae === null || nmae == undefined) {
        $(".name").text("The name cannot be empty");
        flag = false;
        return;
    } else {
        $(".name").text("");
        flag = true;
    };
    if (phone === "" || phone === null || phone == undefined) {
        $(".phone").text("The phone number cannot be empty");
        flag = false;
        return;
    }else{
        $(".phone").text("");
        flag = true;
    };
    if (chk_positions === "" || chk_positions === null || chk_positions == undefined) {
        $(".radioMsg").text("The department name is mandatory");
        flag = false;
        return;
    } else {
        $(".radioMsg").text("");
        flag = true;
    };
        var param = {
            Name: $('#name').val(),
            Phone: $("#phoneNumber").val(),
            email: $("#BindEmial").val(),
            Company: CompanyNames,
            Depart: chk_positions
        };
      

        if (flag == true) {
            $.ajax({
                type: "Post",
                data: {
                    method: "Complete",
                    content: JSON.stringify(param)
                },
                dataType: 'json',
                url: "../../EN/Handler/Person.ashx",
                success: function (data) {
                   
                    if (data.Flag == 1) {
                        $(".Department").text(data.Message);
                        window.location.reload();
                    } else if (data.Flag == 500) {
                        $("#LoginOut").zxxbox();
                        $("#loginBtn2").click(function () {
                            $.zxxbox.hide();
                        });
                        $("#wrapClose").click(function () {
                            window.location.href = "Login.html";
                        });
                    } else { }
                },
                error: function (result) {
                    alert(result);
                }
            });
        } else {

        }
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

