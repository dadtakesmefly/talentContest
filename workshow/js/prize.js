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
$.ajax({
    url: "./json/prize.json",
    type: "get",
    dataType: "json",
    success: function (data) {
        console.log(data);
        console.log(data.list_1[0].worksContent [0]);
        var html1=template("first",data)
        $("#section-iconbox-1").html(html1);
        var html2=template("second",data)
        $("#section-iconbox-2").html(html2);
        var html3=template("third",data)
        $("#section-iconbox-3").html(html3);
        var html4=template("fouth",data)
        $("#section-iconbox-4").html(html4);
        $(".list ul li:first-child .left img").attr("src","./images/第一名.png")
        $(".list ul li:first-child .left p").html("第一名");
        $(".list ul").find("li:eq(1) .left img").attr("src","./images/第二名.png")
        $(".list ul").find("li:eq(1) .left p").html("第二名");
        $(".list ul").find("li:eq(2) .left img").attr("src","./images/第二名.png")
        $(".list ul").find("li:eq(2) .left p").html("第二名");
        $(".list ul").find("li:eq(3) .left img").attr("src","./images/第三名.png")
        $(".list ul").find("li:eq(3) .left p").html("第三名");
        $(".list ul").find("li:eq(4) .left img").attr("src","./images/第三名.png")
        $(".list ul").find("li:eq(4) .left p").html("第三名");
        $(".list ul").find("li:eq(5) .left img").attr("src","./images/第三名.png")
        $(".list ul").find("li:eq(5) .left p").html("第三名");
        $(".list ul li:nth-last-child(-n+9) .left p").html("纪念奖").css({"margin-top":"0.25rem"})
        $(".list ul li:nth-last-child(-n+9) .left img").attr("src","./images/纪念奖.png").css({"margin-top":"0.25rem"});
        $(".content-wrap section ul li").on("click", function () {
            var workNumber=$(this).find(".bianhao").text();
            var phone=$(this).find(".phone").text();
            window.location.href="./voteshow.html"+"?actRegisterPhone="+phone+"&workNumber="+workNumber
        })
    }
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

$(function () {
    $(".close").on("click", function () {
        $(".links").fadeOut();
        $(".backtop").animate({"bottom":"10px"})
    })
    $(".downloading").on("click", function () {
        window.location.href="./download.html"
    })
})
$(function () {
    $(window).scroll(function(){
        var top= $(document).scrollTop();
        if(top<200){
            $(".backtop").css({"display":"none"})
            $(".foot").animate({"height":"10px"})
        }
        else{
            $(".backtop").css({"display":"block"})
        }
    })
    $(".backtop").on('click', function() {
        $("html,body").animate({scrollTop:0}, 0);
    });
})