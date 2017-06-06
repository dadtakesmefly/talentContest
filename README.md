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

# 阻止滑动

$('body').bind("touchmove",function(e){
            e.preventDefault();  });
#  恢复滑动	
$("body").unbind("touchmove"); 

# 将毫秒数转换为正常的日期，年月日时分秒
    var myDate = new Date();
    var year=myDate.getFullYear()+"年";
    var month = myDate.getMonth()+1+'月';
    var date = myDate.getDate()+'日';
    var hours= myDate.getHours();
    var minutes= myDate.getMinutes();
    var seconds=myDate.getSeconds()
    hours<10?hours="0"+hours:hours=""+hours;
    minutes<10?minutes=":0"+minutes:minutes=":"+minutes;
    seconds<10?seconds=":0"+seconds:seconds=":"+seconds;
    var time =[year,month,date,hours,minutes,seconds].join('')
    alert(time)
	
# 获取url中的参数
	function GetQueryString(name) {
	    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	    var r = window.location.search.substr(1).match(reg);  //获取url中"?"符后的字符串并正则匹配
	    var context = "";
	    if (r != null)
		context = r[2];
	    reg = null;
	    r = null;
	    return context == null || context == "" || context == "undefined" ? "" : context;
	}
	var actphone=GetQueryString("actRegisterPhone");

# 移动端rem布局
	 /*让文字和标签的大小随着屏幕的尺寸做变话 等比缩放*/  100px=1rem
	var html = document.getElementsByTagName('html')[0];
	var width = window.innerWidth;
	var fontSize = 100/640*width;
	if(width>640){
	    fontSize=100;
	}
	html.style.fontSize = fontSize +'px';
	window.onresize = function(){
	    var html = document.getElementsByTagName('html')[0];
	    var width = window.innerWidth;
	    var fontSize = 100/640 * width;
	    html.style.fontSize = fontSize +'px';
	}

# 返回前一页但是要定位在之前的页面高度
1，先记录当前页面滚动条的高度，然后通过url将这个htmltop参数传递到下一个页面，

2，在下一个页面返回时候，再将这个htmltop参数通过url传递过来

3，然后$("html,body").animate({scrollTop:htmltop}, 600);即可

4，多个tab栏时候，先获取tab栏的li的索引，

	$(".tabs ul li").on("click", function () {
	    eq=$(this).index()
	    console.log(eq);
	})
	
然后也是传递到下一个页面，返回时候再将这个参数返回过来

然后自动触发tab栏的点击事件

	if(eq){
	    console.log(eq);
	    $(".tabs ul li").eq(eq).trigger("click");
	}
	
即可

# 七牛压缩图片，判断后台是否有其他类型的操作
	   <script type="text/html" id="head">
	    <ul class="clearfix">
	        {{each list_1 as v i}}
	        <li>
	            <p class="bianhao">作品编号<br/><span class="num">{{v.workNumber}}</span></p>
	            <p class="piaoshutext">票数：<span class="piaoshu">{{v.votesNumber}}</span></p>
	       <img src="{{v.worksContent[0].split('?')[0]}}?{{ v.worksContent[0].split('?')[1]?v.worksContent[0].split('?')[1]+'/size- limit/100k!':'imageMogr2/size-limit/100k!'}} ">
	            <div class="box"><a class="toupiao" href="javascript:;">投票</a></div>
	            <span style="display: none" class="phone">{{v.actRegisterPhone}}</span>
	        </li>
	        {{/each}}
	    </ul>
	   </script>
	   	  
# 克隆
深克隆，克隆事件，并且每次只克隆一个。

	$(function () {
		    $("#add").on("click", function () {
			$(".addd").first().append($(".addtitle1:first").first().clone(true).attr('class',"addtitle1 clone").attr("style","display:block"));
			$(".remove").on("click", function () {
			    $(this).parent(".clone").remove();
			})
		    });
		})

# 文本环绕
	
	       <span class="one">地址：</span>
	       <span class="two">很长的一段文本</span>
	       
	       <style>
		       .one{
		       float：left；
		       display:inline-block;
		       }
		       .two{
		       overflow:hidden;
		       display:block;
		       }
	       </style>
	     
# Jq的not选择器

		if(result.data.worksContent.length>=2){
		    $(".show ul li:not(li:eq(0))").find("div,.bianhao").hide()
		    $(".show ul li:not(li:eq(0)) img").css({"margin-top":"-0.7rem"})
		}
	     
