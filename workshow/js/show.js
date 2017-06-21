/**
 * Created by cnaisin06 on 2017/6/21.
 */
//    var baseUrl = "http://192.168.31.248:7070/AXGY_OP/"; //本地联调地址
//      var baseUrl = "https://rest.cnaisin.com:8443/AXGY_OP/";
var baseUrl = "https://rest.cnaisin.com:15443/AXGY_OP/"; //product
var workDetailUrl = baseUrl + "workDetail"; //作品详情

var  voteShowUrl =  baseUrl + "voteShow";


$(function () {
    $(".xiugai").on("click", function () {
        window.location.href='./halfupload.html'+"?actRegisterPhone="+actphone+"&workNumber="+workNumber+"&disable="+123
    })
    $(".editor").on("click", function () {
        window.location.href='./resetinfo.html'+"?actRegisterPhone="+actphone+"&workNumber="+workNumber
    })
})
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
var workNumber=GetQueryString("workNumber");
console.log(GetQueryString("actRegisterPhone"));
console.log(workNumber);
$("#actphone").attr("value",actphone);

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
$(function () {
    $(".back").on("click", function () {
        window.location.href='./worklist.html'+"?actRegisterPhone="+actphone
    })
})
$(function () {
    $.ajax({
        url:workDetailUrl,
        datatype:"json",
        data:{"actRegisterPhone":actphone,"workNumber":workNumber},
        type:"post",
        success: function (result) {
            console.log(result);
            console.log(result.data.childUrl)
            console.log(result.data.teacherTel);
            console.log((typeof result.data.teacherTel));
            console.log(result.data.votesNumber);
            var parms=JSON.stringify(result.data.teacherTel)
            console.log(parms);
            $("#msg").attr("value",parms);
            var html = template("banner",result.data)
            $(".show").html(html);
            var html1 = template("school",result.data.school)
            $(".school").html(html1)
            var html2 = template("teacher",result.data)
            $(".teacherlist").html(html2)
            var html3 = template("foot",result.data.area)
            $(".foot").html(html3);
            var html4=template("zuzhi",result.data.organization)
            $(".zuzhi").html(html4);
            var html5=template("fuzeren",result.data.person)
            $(".fuzeren").html(html5);
            var html6=template("childname",result.data.child)
            $(".child").html(html6);
            var html7=template("childpic",result.data)
            $(".childpic").html(html7);
            $(".num").html(result.data.votesNumber)
        }
    })

})
