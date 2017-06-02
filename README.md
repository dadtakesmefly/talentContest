# talentContest

自定义layer弹层的皮肤样式

引入jq       <script src="jquery-1.8.3/jquery.min.js"></script>

引入layer    <script src="layer/layer.js"></script>

自定义样式

	   ` <style>
	        body .demo-class .layui-layer-title{background:#E74538; color:#fff; border: none;}
	        body .demo-class .layui-layer-btn a {background:#E74538;}
	        body .demo-class .layui-layer-btn a {border: none}
	        body .demo-class .layui-layer-btn .layui-layer-btn1{background:#999;}
	    </style>`
      
弹层代码

 ` layer.open({
	     skin:"demo-class",
	     title:"提示",
	     content:"该作品投票数+1"
})`

## 判断用户设备是pc还是移动
			
	function browserRedirect() {
		 var sUserAgent = navigator.userAgent.toLowerCase();
		 var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
		 var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
		 var bIsMidp = sUserAgent.match(/midp/i) == "midp";
		 var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
		 var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
		 var bIsAndroid = sUserAgent.match(/android/i) == "android";
		 var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
		 var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
		 if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
	            return   移动端
		    } else {
			$(".links").hide();
			$(".backtop").css({"bottom":"10px"})  pc端
		    }
		 }
	browserRedirect();

## 模板引擎 动态渲染加上if判断

	<script type="text/html" id="details">
	       {{each photoText as v i}}  
	       {{if i%2==0}}<div id="showbox{{i/2}}">{{/if}}  //这个判断是将p和img渲染在div里面
		   {{if v.type=="text"}}<p>{{v.content}}</p>{{/if}} //文本渲染在p标签 
		   {{if v.type=="image"}}<img src="{{v.content}}" alt=""/>{{/if}}//图片渲染在img标签 
		   {{if i%2==1}}</div>{{/if}}
	       {{/each}}
	</script>

## 微信分享自定义分享名片

    <script src="https://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
   
	<script>
	$.ajax({
		url:weixinUrl,
		data:{"appId":"···········","url":window.location.href},
		type:"post",
		success: function (result) {
		console.log(result.data);
		console.log(result.data.jsapi_ticket);
		 wx.config({
		debug: false, // 开启调试模式
		appId: 'wx5c2a0cf831ae3610', // 必填，公众号的唯一标识
		timestamp: result.data.timestamp, // 必填，生成签名的时间戳
		nonceStr: result.data.nonceStr, // 必填，生成签名的随机串
		signature: result.data.signature,// 必填，签名，见附录1
		jsApiList: [
		"onMenuShareTimeline",
		 "onMenuShareAppMessage",
		"onMenuShareQQ",
		"onMenuShareWeibo",
		"onMenuShareQZone",
		] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		 });
		window.share_config = {
		"share": {
		"imgUrl":"./images/爱信.png",//分享图，默认当相对路径处理，所以使用绝对路径的的话，“http://”协议前缀必须在。
		"desc" : "公益专属App,随时随地做公益",//摘要,如果分享到朋友圈的话，不显示摘要。
		"title" : document.title,//分享卡片标题
	         "link": window.location.href,//分享出去后的链接，这里可以将链接设置为另一个页面。
		"success":function(){//分享成功后的回调函数
		},
		'cancel': function () {
		// 用户取消分享后执行的回调函数
		 }
		}
                };
		 wx.ready(function () {
			wx.onMenuShareAppMessage(share_config.share);//分享给好友
			wx.onMenuShareTimeline(share_config.share);//分享到朋友圈
			wx.onMenuShareQQ(share_config.share);//分享给手机QQ
			wx.onMenuShareWeibo(share_config.share);//分享给微博
			wx.onMenuShareQZone(share_config.share)//QQ空间
		  });
	 	}
	     })
         </script>
