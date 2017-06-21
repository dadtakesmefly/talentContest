/**
 * Created by cnaisin06 on 2017/6/21.
 */

//    var baseUrl = "http://192.168.31.248:7070/AXGY_OP/"; //本地联调地址
//var baseUrl = "https://rest.cnaisin.com:8443/AXGY_OP/";
var baseUrl = "https://rest.cnaisin.com:15443/AXGY_OP/"; //product
var workList = baseUrl + "workList"; //作品详情
//    var uploadMultipleEntries = baseUrl + "uploadMultipleEntries"; //上传文件


/*让文字和标签的大小随着屏幕的尺寸做变话 等比缩放*/
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
console.log(GetQueryString("actRegisterPhone"));
$("#actphone").attr("value",actphone);

//    var upload=document.querySelector(".upload");
//    upload.onclick= function () {
//        window.location.href='./uploadagain.html'+"?actRegisterPhone="+actphone
//
//    }

$(function () {
    $.ajax({
        url:workList,
        datatype:"json",
        type:"post",
        data:{"actRegisterPhone":actphone},
        success: function (result) {
            console.log(result);
            console.log(result.data);
            var html = template("head",result)
            $(".list").html(html);
            $(function () {
                $(".li").off().on("click", function () {
                    var workNumber=$(this).find(".num").text();
                    console.log(workNumber);
                    window.location.href='./show.html'+"?actRegisterPhone="+actphone+"&workNumber="+workNumber
                })
            })
        }
    })
})