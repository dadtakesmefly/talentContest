/**
 * Created by cnaisin06 on 2017/6/21.
 */
//        var baseUrl = "http://192.168.31.248:7070/AXGY_OP/"; //本地联调地址
//    var baseUrl = "https://rest.cnaisin.com:8443/AXGY_OP/";
//    var baseUrl="http://192.168.31.248:7070/AXGY_OP/";
var baseUrl = "https://rest.cnaisin.com:15443/AXGY_OP/"; //product
var voteList = baseUrl + "voteList"; //作品详情

(function () {
    [].slice.call(document.querySelectorAll('.tabs')).forEach(function (el) {
        new CBPFWTabs(el);
    });
})();

/*让文字和标签的大小随着屏幕的尺寸做变话 等比缩放*/
var html = document.getElementsByTagName('html')[0];
var width = window.innerWidth;
var fontSize = 100 / 640 * width;
if (width > 640) {
    fontSize = 100;
}
html.style.fontSize = fontSize + 'px';
window.onresize = function () {
    var html = document.getElementsByTagName('html')[0];

    var width = window.innerWidth;

    var fontSize = 100 / 640 * width;

    html.style.fontSize = fontSize + 'px';
}
$(function () {
    $(".close").on("click", function () {
        $(".links").fadeOut();
        $(".backtop").animate({"bottom":"10px"})
    })
    $(".downloading").on("click", function () {
        window.location.href="./download.html"
    })
})
//判断用户设备是pc还是移动
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
        return
    } else {
        $(".links").hide();
        $(".backtop").css({"bottom":"10px"})
    }
}
browserRedirect();
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
$("#actphone").attr("value",actphone);
var htmltop =GetQueryString("htmltop");
console.log(htmltop);
var eq=GetQueryString("eq");
console.log(eq);

$(".tabs ul li").on("click", function () {
    eq=$(this).index()
    console.log(eq);
})
$.ajax({
    url:voteList,
    type:"post",
    success: function (result) {
        console.log(result);
        var html=template("head",result.data)
        $("#section-iconbox-1").html(html);
        var html1=template("second",result.data)
        $("#section-iconbox-2").html(html1);
        var html2=template("third",result.data)
        $("#section-iconbox-3").html(html2);
        var html3=template("fouth",result.data)
        $("#section-iconbox-4").html(html3);
        $(".totalChild").html(result.data.totalChild)
        $(".totalTicket").html(result.data.totalTicket)
        $(".totalPerson").html(result.data.totalPerson);
        $(function () {
            $(".content-wrap ul li").on("click", function () {
                var workNumber=$(this).find(".num").text();
                var phone=$(this).find(".phone").text();
                var htmltop = $(document).scrollTop();
                window.location.href="./voteshow.html"+"?actRegisterPhone="+phone+"&workNumber="+workNumber+"&htmltop="+htmltop+"&eq="+eq

            })
        })
    }
})
$(function () {
    $(".topnav img").on("click", function () {
        window.location.href=document.referrer
    })
})
$(window).scroll(function(){
    var top= $(document).scrollTop();
    if(top<200){
        $(".backtop").css({"display":"none"})
    }
    else{
        $(".backtop").css({"display":"block"})
    }
})
$(".backtop").on('click', function() {
    $("html,body").animate({scrollTop:0}, 0);
});
console.log(htmltop);
$("html,body").animate({scrollTop:htmltop}, 600);

if(eq){
    console.log(eq);
    $(".tabs ul li").eq(eq).trigger("click");
}

$(function () {
    $(".topnav span").on("click", function () {
        layer.open({
            skin:"demo-class",
            title:"提示",
//                area:["500px","500px"],
            content:'<div class="msg clearfix"><div class="out"> <img class="title" src="images/投票规则.png" alt=""/> <ul> <li>1、投票时间5月21日—5月26日，投票期间用户可给自己心仪的作品投票；</li> <li>2、一个用户每天每个作品类型可投票5次，每次投票可以投给不同或者相同的作品；</li> <li>3、在投票的过程中，用户如果出现违规行为（如刷票等）爱信公益APP有权作废该用户的所有投票;</li> <li>4、以上最终解释权归爱信公益APP所有;</li> </ul> </div> </div>',

        })
    })
})