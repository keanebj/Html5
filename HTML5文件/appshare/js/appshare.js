new Vue({
	el: '#wrap',
	data :function() {
		return {
			previewVideo: true,
			title: '',
			content: '',
			author: '',
			videoid: '',
			videourl: '',
			posterUrl: "",
			externallinks: 'Y',
			columnname: "",
			commentId: '',
			catalogid: "",
			id: "4144756",
			commentNum: "",
			studioname: "",
			studioavatar: "",
			relativet: [],
			dataJson: {},
			shareImage: "",
			delbtn: true,
			dataTrue: true,
			dataStatus: "",
			height: 260,
			dateTime:"",
			pIcon:"img/pIcon.png"
		}
	},

	created :function() {
		
//		alert("nihao")
	    var Request=this.getRequest1();//可以查看返回的对象，根据对象的参数获取其中的键值对
		
//		4153910&catalogid=80000
		this.getCont(Request.id, Request.catalogid)
	},
	methods: {
		getRequest1: function(){
	        var str=window.location.search; //  ?userName=zhanghao&userId=123
	        if(str){
	            var url=str.substr(1),arr=url.split('&'),len=arr.length,i= 0,request={};
	            //        ["userName=zhanghao", "userId=123"]
	            for(;i<len;i++){
	                request[arr[i].split('=')[0]]=arr[i].split('=')[1];
	                //           ["userName", "zhanghao"]  ["userId", "123"]
	            }
	            return request; //{userName: "zhanghao", userId: "123"}
	        }else{
	            console.log('没有传递参数');
	        }
	    },
		getCont: function(id, catalogid) {
			var  That=this;
			this.$http.get('http://mb.dev.hubpd.com/xmt/api/appshare/' + id + "?catalogid=" + catalogid).then(function(response) {
					if(response.status == 200) {
						console.log(response)
						That.dataStatus = response.status
						That.getJsonData(response.body.path)
					} else {
						That.$Notice.error({
							title: response.data.message,
							desc: false
						})
					}
				}
			)
		

		},
		getJsonData : function (path) {
			var pathUrl = path
			var That = this
			$.get(path, function(data){
				//			
//				$.getJSON("http://mobileres.people.com.cn/movie_pub/News/publishfile/lh/_cd/12/24/4153100.json", (data) => {
				console.log(data)
				if(data.code == 1) {
					//addWXCode
					$.getScript('http://wechat.hubpd.com/wechat/sign?random=' + Math.random(), function(re, st) {

						$.getScript('http://wechat.hubpd.com/wechat/js/weixin/app.js', function(response, status) {

							wx.config({
								debug: false,
								appId: pdmi_appid,
								timestamp: pdmi_timestamp,
								nonceStr: pdmi_nonceStr,
								signature: pdmi_signature,
								jsApiList: [
									'checkJsApi',
									'onMenuShareTimeline',
									'onMenuShareAppMessage',
									'onMenuShareQQ',
									'onMenuShareWeibo',
									'startRecord',
									'stopRecord',
									'onVoiceRecordEnd',
									'playVoice',
									'translateVoice'
								]
							});
							wx.ready(function() {

								//								console.log(data.data.article.videoLink.title)
								//start

								That.previewVideo = true;
								That.title = data.data.article.videoLink.title;

								That.videourl = data.data.article.videoLink.link[0].url
								That.posterUrl = data.data.article.videoLink.thumb
								That.externallinks = "Y";

								That.studioavatar = data.data.article.publish.avatar
								That.studioname = data.data.article.publish.name

								That.playNum = (data.data.article.playNum == 0 ? "统计中" : data.data.article.playNum) ||
									(data.data.article.playNum == null ? "统计中" : data.data.article.playNum) ||
									(data.data.article.playNum == undefined ? "统计中" : data.data.article.playNum) ||
									(data.data.article.playNum == "" ? "统计中" : data.data.article.playNum)

								That.commentNum = (data.data.article.commentNum == 0 ? "暂无评论" : data.data.article.commentNum+"评论") ||
									(data.data.article.commentNum == "" ? "暂无评论" : data.data.article.commentNum+"评论") ||
									(data.data.article.commentNum == null ? "暂无评论" : data.data.article.commentNum+"评论") ||
									(data.data.article.commentNum == undefined ? "暂无评论" : data.data.article.commentNum+"评论")

								That.relativet = data.data.relativet
////								That.$nextTick(function() {
////									console.log("niaho")
////									$("#video-scroll").mCustomScrollbar("destroy");
////									$("#video-scroll").mCustomScrollbar({
////										theme: "light-thin",
////										autoHideScrollbar: true
////									});
////									That.$refs.videoPlayer.renderPlayer('', That.videoid, '', That.videourl);
////								})
								//end

								wx_data.title = data.data.article.videoLink.title; //微信转发的title

								wx_data.desc = ""; //微信转发的描述ht

								wx_data.imgUrl = data.data.article.shareImage; //微信分享的图片地址

								wx_data.link = data.data.article.shareLink; //微信分享的地址

								console.log(wx_data)
								// 分享到朋友圈
								shareTimeline(wx_data);

								// 分享给好友
								shareAppMessage(wx_data);

							});

							wx.error(function() {
								console.log('wechat error')
							})

						})

					});

					That.previewVideo = true;
					That.title = data.data.article.videoLink.title;

					That.videourl = data.data.article.videoLink.link[0].url
					That.posterUrl = data.data.article.videoLink.thumb
					That.externallinks = "Y";
					
				
					var publishTime=new Date(parseInt(data.data.article.publishTime))  
//					console.log(data.data.article.publishTime)
//					console.log(publishTime)
//					console.log((new Date(parseInt(publishTime))))
					var Y = publishTime.getFullYear() + '-';
			        var M = (publishTime.getMonth()+1 < 10 ? '0'+(publishTime.getMonth()+1) : publishTime.getMonth()+1) + '-';
			        var D = publishTime.getDate() + ' ';
			        var h = publishTime.getHours() + ':';
			        var m = publishTime.getMinutes();
					
				    That.dateTime=Y+M+D+h+m
					console.log(That.dateTime)
					
					That.studioavatar = data.data.article.publish.avatar
					That.studioname = data.data.article.publish.name

					That.playNum = (data.data.article.playNum == 0 ? "统计中" : data.data.article.playNum) ||
						(data.data.article.playNum == null ? "统计中" : data.data.article.playNum) ||
						(data.data.article.playNum == undefined ? "统计中" : data.data.article.playNum) ||
						(data.data.article.playNum == "" ? "统计中" : data.data.article.playNum)

					That.commentNum = (data.data.article.commentNum == 0 ? "暂无评论" : data.data.article.commentNum+"评论") ||
									(data.data.article.commentNum == "" ? "暂无评论" : data.data.article.commentNum+"评论") ||
									(data.data.article.commentNum == null ? "暂无评论" : data.data.article.commentNum+"评论") ||
									(data.data.article.commentNum == undefined ? "暂无评论" : data.data.article.commentNum+"评论")

					That.relativet = data.data.relativet

//					this.$nextTick(function() {
//						$("#video-scroll").mCustomScrollbar("destroy");
//						$("#video-scroll").mCustomScrollbar({
//							theme: "light-thin",
//							autoHideScrollbar: true
//						});
//						this.$refs.videoPlayer.renderPlayer('', this.videoid, '', this.videourl);
//					})
				}
			}).fail(function(){
				That.dataTrue = !That.dataTrue
				console.log("失败")
			});

		},
		

		delfun: function () {
			this.delbtn = !this.delbtn
		},
		playBtn : function () {
			var player = document.getElementById("playId")
			player.play()

		}

	}
})