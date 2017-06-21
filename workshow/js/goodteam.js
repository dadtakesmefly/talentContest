/**
 * Created by cnaisin06 on 2017/6/21.
 */
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

$(function () {
    $(".close").on("click", function () {
        $(".links").fadeOut();
        $(".backtop").animate({"bottom":"10px"})
    })
    $(".downloading").on("click", function () {
        window.location.href="./download.html"
    })
})

$.ajax({
    url:"./json/goodteam.json",
    type:"post",
    success: function (data) {
        console.log(data);
        var html1=template("first",data);
        $("#section-iconbox-1").html(html1);
        var html2=template("second",data);
        $("#section-iconbox-2").html(html2);
    }
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