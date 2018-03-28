$(function () {
    //base 64 加密
    var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);

    $("#RegisterLogin").click(function () {
        $(".registerMsg").val(" ");
	 	//验证邮箱
	 	var Email = $("#RegisterEmail").val().trim();
		var Password = $("#RegisterPsd").val().trim();  
	    var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;   
		if (filter.test(Email)){ 
		    var registerEmail1 = Email;
		    var registerEmail = base64encode(base64encode(Email) + "||==||==" + new Date());
		
		    $(".warningMsg").text("");
		}else {
		    $(".warningMsg").text("Incorrect login email format");
		    return false
		};


        //验证密码，至少包含两种不同的字符
		var filteremail = /^(([a-zA-Z]+[0-9]+)|([0-9]+[a-zA-Z]+)|([a-z]+[!@#$%^&*.])|([0-9]+[!@#$%^&*.]))([a-zA-Z0-9!@#$%^&*.]*)$/;
		if (filteremail.test(Password)) {
		    var registerPassword = base64encode(base64encode(Password) + "||==||==" + new Date());
		    $(".warningMsg").text("");
		} else {
		    $(".warningMsg").text("The password contains at least two different characters");
		    return false
		};
	 
        //验证码不为空：
	    var ValidateCode = $('#txtEmailValidateCode').val();
	    if (ValidateCode == undefined || ValidateCode === "" || ValidateCode === null) {
	        $(".warningMsg").text("The ValidateCode cannot be empty");
	        return;
	    } else {
	        var registerValidateCode = ValidateCode;
	        $(".warningMsg").text("");
	    };
	    
	    var obj = {};
	    obj.method = "Regist";
	    obj.account = registerEmail;
	    obj.password = registerPassword;
	    //obj.checkCode = "1234";
	    obj.checkCode = registerValidateCode;

	    $.ajax({
            url: "../../EN/Handler/Person.ashx",
            type: "post", 
           
            data:{   method:"Regist",
                     account:registerEmail,
                     password:registerPassword,
        //obj.checkCode = "1234";
                     checkCode:registerValidateCode},
            success: function (res) {
        
                var result = JSON.parse(res);
                if(result.Flag == 0 ){  // 失败
                    $(".registerMsg").text(result.Message);
                    setTimeout("location.reload()", 3000);
                } else if (result.Flag == 1) {
                    $(".registerMsg").text(result.Message);
                    $.cookie("email", registerEmail1);
                    window.location.href = "Complete.html?LenovoID=" + registerEmail1;
                } else if (result.Flag == 4) {
                    $(".registerMsg").text(result.Message);
                    setTimeout("location.reload()", 3000);
                }  else if (result.Flag == 500) {
                    $("#LoginOut").zxxbox();
                    $("#loginBtn2").click(function () {
                        $.zxxbox.hide();
                    });
                    $("#wrapClose").click(function () {
                        window.location.href = "Login.html";
                    })
                } else {
                    $(".registerMsg").text("Registered successfully！");
                }
            },
            error:function(res){
            	console.log(res)
            }
       });
 	})
 	//验证码切换
$("#Img2").click(function () {
        var dateTime = new Date();
        var lastTime = dateTime.getFullYear() + "" + dateTime.getMonth() + dateTime.getDate() + dateTime.getHours() + dateTime.getMinutes() + dateTime.getSeconds() + dateTime.getMilliseconds();
        $("#Img2").attr("src", "../../business_website/dev/LoginAndRegister/Images.aspx?t=" + lastTime);
});

    /**
     * base64编码
     * @param {Object} str
     */
function base64encode(str) {
    var out, i, len;
    var c1, c2, c3;
    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt((c1 & 0x3) << 4);
            out += "==";
            break;
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += base64EncodeChars.charAt((c2 & 0xF) << 2);
            out += "=";
            break;
        }
        c3 = str.charCodeAt(i++);
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        out += base64EncodeChars.charAt(c3 & 0x3F);
    }
    return out;
}
})
