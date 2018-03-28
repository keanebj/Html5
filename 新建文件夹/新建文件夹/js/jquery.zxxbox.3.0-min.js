/*! 
* zxxbox.js 
* © 2010-2011 by zhangxinxu http://www.zhangxinxu.com/
* v1.0 2010-03-20
* v1.1 2010-04-03 #添加拖拽
* v1.2 2010-07-12 #修改浏览器高宽以及页面滚动高度获取
* v2.0 2010-08-01 #重写js，增加可读性，维护性
*                 #添加问答框确认的回调方法
*                 #修复浏览器大小变化时黑背景高度不变化的bug，且弹框一直居中显示
* v3.0 2010-09-05 #修改自定义提示的调用方法
				  #增加提示方法的回调函数接口
				  #增加弹窗打开和关闭的回调方法接口
				  #增加Ajax功能
				  #增加外框CSS3外阴影效果，美化UI
				  #弹框关闭以渐隐动画显示
* v3.1 2010-11-25 #更准确使用$.noop方法
* v3.2 2010-11-26 #修改些属性，使向下兼容1.3版本
* v3.3 2010-11-30 #阻止弹框重复关闭执行
* v3.4 2011-01-21 #修复错别字符，修复IE下弹框高度超过一屏拖拽会隐藏的bug
* v3.5 2011-03-03 #添加新的api参数protect
* v3.6 2011-04-06
* v3.7 2012-06-05 #修复ajax加载页面或html片段含JavaScript脚本时重复执行的bug
* v3.8 2012-06-12 #修复title记忆shut参数在ajax 加载时不起作用的问题
* v4.0 2012-06-13 #框架CSS实现大调整
*/
(function (d) { var c = "linear-gradient(top, #fafafa, #eee)", a = '<style type="text/css">#zxxBlank{position:absolute;z-index:2000;left:0;top:0;width:100%;height:0;background:black;}.wrap_out{padding:5px;background:#eee;box-shadow:0 0 6px rgba(0,0,0,.5);position:absolute;z-index:2000;left:-9999px;}.wrap_in{background:#fafafa;border:1px solid #ccc;}.wrap_bar{border-bottom:1px solid #ddd;background:#f0f0f0;background:-moz-' + c + ";background:-o-" + c + ";background:-webkit-" + c + ";background:" + c + ";}.wrap_title{line-height:24px;padding-left:10px;margin:0;font-weight:normal;font-size:1em;}.wrap_close{position:relative;}.wrap_close a{width:20px;height:20px;text-align:center;margin-top:-22px;color:#34538b;font:bold 1em/20px Tahoma;text-decoration:none;cursor:pointer;position:absolute;right:6px;}.wrap_close a:hover{text-decoration:none;color:#f30;}.wrap_body{background:white;}.wrap_remind{width:16em;padding:30px 40px;}.wrap_remind p{margin:10px 0 0;}.submit_btn, .cancel_btn{display:inline-block;padding:3px 12px 1.99px;line-height:16px;border:1px solid;cursor:pointer;overflow:visible;}.submit_btn{background:#486aaa;border-color:#a0b3d6 #34538b #34538b #a0b3d6;color:#f3f3f3;}.submit_btn:hover{text-decoration:none;color:#fff;}.cancel_btn{background:#eee;border-color:#f0f0f0 #bbb #bbb #f0f0f0;color:#333;}</style>"; d("head").append(a); var e = '<div id="zxxBlank" onselectstart="return false;"></div><div class="wrap_out" id="wrapOut"><div class="wrap_in" id="wrapIn"><div id="wrapBar" class="wrap_bar" onselectstart="return false;"><h4 id="wrapTitle" class="wrap_title"></h4><div class="wrap_close"><a href="javasctipt:" id="wrapClose" title="Close"></a></div></div><div class="wrap_body" id="wrapBody"></div></div></div>'; d.fn.zxxbox = function (f) { f = f || {}; var g = d.extend({}, b, f); return this.each(function () { var h = this.nodeName.toLowerCase(); if (h === "a" && g.ajaxTagA) { d(this).click(function () { var i = d.trim(d(this).attr("href")); if (i && i.indexOf("javascript:") != 0) { if (i.indexOf("#") === 0) { d.zxxbox(d(i), f) } else { d.zxxbox.loading(); var j = new Image(), k; j.onload = function () { var l = j.width, n = j.height; if (l > 0) { var m = d('<img src="' + i + '" width="' + l + '" height="' + n + '" />'); f.protect = false; d.zxxbox(m, f) } }; j.onerror = function () { d.zxxbox.ajax(i, {}, f) }; j.src = i } } return false }) } else { d.zxxbox(d(this), f) } }) }; d.zxxbox = function (j, g) { if (!j) { return } var h = d.extend({}, b, g || {}); var f = d("#wrapOut"), i = d("#zxxBlank"); if (f.size()) { f.show(); i[h.bg ? "show" : "hide"]() } else { d("body").append(e) } if (typeof (j) === "object") { j.show() } else { j = d(j) } d.o = { s: h, ele: j, bg: i.size() ? i : d("#zxxBlank"), out: f.size() ? f : d("#wrapOut"), tit: d("#wrapTitle"), bar: d("#wrapBar"), clo: d("#wrapClose"), bd: d("#wrapBody") }; d.o.tit.html(h.title); d.o.clo.html(h.shut); d.o.bd.empty().append(j); if (d.isFunction(h.onshow)) { h.onshow() } d.zxxbox.setSize(); d.zxxbox.setPosition(); if (h.fix) { d.zxxbox.setFixed() } if (h.drag) { d.zxxbox.drag() } else { d(window).resize(function () { d.zxxbox.setPosition() }) } if (!h.bar) { d.zxxbox.barHide() } else { d.zxxbox.barShow() } if (!h.bg) { d.zxxbox.bgHide() } else { d.zxxbox.bgShow() } if (!h.btnclose) { d.zxxbox.closeBtnHide() } else { d.o.clo.click(function () { d.zxxbox.hide(); return false }) } if (h.bgclose) { d.zxxbox.bgClickable() } if (h.delay > 0) { setTimeout(d.zxxbox.hide, h.delay) } }; d.extend(d.zxxbox, { setSize: function () { if (!d.o.bd.size() || !d.o.ele.size() || !d.o.bd.size()) { return } d.o.out.css({ width: d.o.s.width, "height:": d.o.s.height }); return d.o.out }, setPosition: function (k) { k = k || false; if (!d.o.bg.size() || !d.o.ele.size() || !d.o.out.size()) { return } var n = d(window).width(), i = d(window).height(), p = d(window).scrollTop(), j = d("body").height(); if (j < i) { j = i } d.o.bg.width(n).height(j).css("opacity", d.o.s.opacity); var m = d.o.out.outerHeight(), f = d.o.out.outerWidth(); var o = p + (i - m) / 2, g = (n - f) / 2; if (d.o.s.fix && window.XMLHttpRequest) { o = (i - m) / 2 } if (k === true) { d.o.out.animate({ top: o, left: g }) } else { d.o.out.css({ top: o, left: g, zIndex: d.o.s.index }) } return d.o.out }, setFixed: function () { if (!d.o.out || !d.o.out.size()) { return } if (window.XMLHttpRequest) { d.zxxbox.setPosition().css({ position: "fixed" }) } else { d(window).scroll(function () { d.zxxbox.setPosition() }) } return d.o.out }, bgClickable: function () { if (d.o.bg && d.o.bg.size()) { d.o.bg.click(function () { d.zxxbox.hide() }) } }, bgHide: function () { if (d.o.bg && d.o.bg.size()) { d.o.bg.hide() } }, bgShow: function () { if (d.o.bg && d.o.bg.size()) { d.o.bg.show() } else { d('<div id="zxxBlank"></div>').prependTo("body") } }, barHide: function () { if (d.o.bar && d.o.bar.size()) { d.o.bar.hide() } }, barShow: function () { if (d.o.bar && d.o.bar.size()) { d.o.bar.show() } }, closeBtnHide: function () { if (d.o.clo && d.o.clo.size()) { d.o.clo.hide() } }, hide: function () { if (d.o.ele && d.o.out.size() && d.o.out.css("display") !== "none") { d.o.out.fadeOut("fast", function () { if (d.o.s.protect && (!d.o.ele.hasClass("wrap_remind") || d.o.ele.attr("id"))) { d.o.ele.hide().appendTo(d("body")) } d(this).remove(); if (d.isFunction(d.o.s.onclose)) { d.o.s.onclose() } }); if (d.o.bg.size()) { d.o.bg.fadeOut("fast", function () { d(this).remove() }) } } return false }, drag: function () { if (!d.o.out.size() || !d.o.bar.size()) { d(document).unbind("mouseover").unbind("mouseup"); return } var j = d.o.bar, h = d.o.out; var i = false; var g = 0, f = 0, l = h.css("left"), k = h.css("top"); j.mousedown(function (m) { i = true; g = m.pageX; f = m.pageY }).css("cursor", "move"); d(document).mousemove(function (q) { if (i) { var n = q.pageX, m = q.pageY; var p = n - g, o = m - f; h.css("left", parseInt(l) + p).css("top", parseInt(k) + o) } }); d(document).mouseup(function () { i = false; l = h.css("left"); k = h.css("top") }) }, loading: function () { var f = d('<div class="wrap_remind">Loading...</div>'); d.zxxbox(f, { bar: false }) }, ask: function (j, h, f, g) { var i = d('<div class="wrap_remind">' + j + '<p><button id="zxxSureBtn" class="submit_btn">Sure</button>&nbsp;&nbsp;<button id="zxxCancelBtn" class="cancel_btn">Cancel</button></p></div>'); d.zxxbox(i, g); d("#zxxSureBtn").click(function () { if (d.isFunction(h)) { h.call(this) } }); d("#zxxCancelBtn").click(function () { if (f && d.isFunction(f)) { f.call(this) } d.zxxbox.hide() }) }, remind: function (h, i, f) { var g = d('<div class="wrap_remind">' + h + '<p><button id="zxxSubmitBtn" class="submit_btn">Sure</button</p></div>'); d.zxxbox(g, f); d("#zxxSubmitBtn").click(function () { if (i && d.isFunction(i)) { i.call(this) } d.zxxbox.hide() }) }, ajax: function (g, h, f) { if (g) { d.zxxbox.loading(); f = f || {}; f.protect = false; d.ajax({ url: g, data: h || {}, success: function (j, i) { d.zxxbox(j, f) }, error: function () { d.zxxbox.remind("Loading Error") } }) } } }); var b = { title: "Information", shut: "×", index: 2000, opacity: 0.5, width: "auto", height: "auto", bar: true, bg: true, btnclose: true, fix: false, bgclose: false, drag: false, ajaxTagA: true, protect: "auto", onshow: d.noop, onclose: d.noop, delay: 0 } })(jQuery);