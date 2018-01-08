<script type="text/javascript" src="https://wechat.hubpd.com/wechat/js/weixin/jweixin-1.0.0.js"></script>
  <script>
  var str = '<script type="text/javascript" src="https://wechat.hubpd.com/wechat/sign?random=' + Math.random() + '"\/><\/script>';
  str += '<script type="text/javascript" src="https://wechat.hubpd.com/wechat/js/weixin/app.js"><\/script>';
  document.write(str);
 
    
  wx.ready(function () {
  
    wx_data.title = '"党媒平台"客户端\n 分享描述：点击下载';                //微信转发的title
    wx_data.desc = "分享描述：点击下载"; //微信转发的描述
    wx_data.imgUrl = "https://www.hubpd.com/hubpd/share/share.png";   //微信分享的图片地址
    wx_data.link = window.location.href;                      //微信分享的地址
        // 分享到朋友圈
        shareTimeline(wx_data);
    // 分享给好友
    shareAppMessage(wx_data);
  });
  wx.error(function (res) {
    // alert(res.errMsg);
  });
    //${Article.LogoFile}  
    
  </script>