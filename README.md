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
