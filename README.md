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
