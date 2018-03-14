new Vue({
	el: '#wrap',
	data() {
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
			height: 260
		}
	},

	created() {

	    var Request=this.getRequest1();//可以查看返回的对象，根据对象的参数获取其中的键值对
		console.log(Request.id, Request.catalogid)
		this.getCont(Request.id, Request.catalogid)
	},
	methods: {
		getRequest1(){
	        var str=window.location.search; //  ?userName=zhanghao$userId=123
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
		getCont(id, catalogid) {
			this.$http.get('http://mb.dev.hubpd.com/xmt/api/appshare/' + id + "?catalogid=" + catalogid).then(response => {
					console.log(response.status)
					console.log(response,response.body.path)
					if(response.status == 200) {
						this.dataStatus = response.status
						console.log(response.body.path)
						this.getJsonData(response.body.path)

					} else {
						this.$Notice.error({
							title: response.data.message,
							desc: false
						})
					}
				},
				error => {
					this.$Notice.error({
						title: error.data.message,
						desc: false
					})
				}
			)
		},
		getJsonData(path) {
			let pathUrl = path
			$.get(path, (data) => {
				//			
//				$.getJSON("http://mobileres.people.com.cn/movie_pub/News/publishfile/lh/_cd/12/24/4153100.json", (data) => {
				console.log(data)
				if(data.code == 1) {

					var That = this
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

								That.commentNum = (data.data.article.commentNum == 0 ? "暂无" : data.data.article.commentNum) ||
									(data.data.article.commentNum == "" ? "暂无" : data.data.article.commentNum) ||
									(data.data.article.commentNum == null ? "暂无" : data.data.article.commentNum) ||
									(data.data.article.commentNum == undefined ? "暂无" : data.data.article.commentNum)

								That.relativet = data.data.relativet

//								That.$nextTick(function() {
//									console.log("niaho")
//									$("#video-scroll").mCustomScrollbar("destroy");
//									$("#video-scroll").mCustomScrollbar({
//										theme: "light-thin",
//										autoHideScrollbar: true
//									});
//									That.$refs.videoPlayer.renderPlayer('', That.videoid, '', That.videourl);
//								})
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

					this.previewVideo = true;
					this.title = data.data.article.videoLink.title;

					this.videourl = data.data.article.videoLink.link[0].url
					this.posterUrl = data.data.article.videoLink.thumb
					this.externallinks = "Y";

					this.studioavatar = data.data.article.publish.avatar
					this.studioname = data.data.article.publish.name

					this.playNum = (data.data.article.playNum == 0 ? "统计中" : data.data.article.playNum) ||
						(data.data.article.playNum == null ? "统计中" : data.data.article.playNum) ||
						(data.data.article.playNum == undefined ? "统计中" : data.data.article.playNum) ||
						(data.data.article.playNum == "" ? "统计中" : data.data.article.playNum)

					this.commentNum = (data.data.article.commentNum == 0 ? "暂无" : data.data.article.commentNum) ||
						(data.data.article.commentNum == "" ? "暂无" : data.data.article.commentNum) ||
						(data.data.article.commentNum == null ? "暂无" : data.data.article.commentNum) ||
						(data.data.article.commentNum == undefined ? "暂无" : data.data.article.commentNum)

					this.relativet = data.data.relativet

//					this.$nextTick(function() {
//						$("#video-scroll").mCustomScrollbar("destroy");
//						$("#video-scroll").mCustomScrollbar({
//							theme: "light-thin",
//							autoHideScrollbar: true
//						});
//						this.$refs.videoPlayer.renderPlayer('', this.videoid, '', this.videourl);
//					})
				}
			}).fail(() => {
				this.dataTrue = !this.dataTrue
				console.log("失败")
			});

		},
		getPreviewDetail(id, catalogid) {
			this.$router.push('/preview/previewDetail?id=' + id + "&catalogid=" + catalogid);

		},

		delfun() {
			this.delbtn = !this.delbtn
		},
		playBtn() {
			let player = document.getElementById("playId")
			player.play()

		}

	},

	mounted() {},

})