/**
 * Created by cnaisin06 on 2017/6/21.
 */
//    var baseUrl = "http://192.168.31.248:7070/AXGY_OP/"; //本地联调地址
//var baseUrl = "https://rest.cnaisin.com:8443/AXGY_OP/";
var baseUrl = "https://rest.cnaisin.com:15443/AXGY_OP/"; //product
var workDetailUrl = baseUrl + "workDetail"; //上传文件


$(function () {
    $(".upload").on("click", function () {
        window.location.href='./halfupload.html'+"?actRegisterPhone="+actphone+"&nodisabled=123"
    })
    $(".editor").on("click", function () {
        window.location.href='./resetinfo.html'+"?actRegisterPhone="+actphone
    })
})
$.fn.serializeObject = function()
{
    var list=[];
    var name=[];
    var phone=[];
    var a = this.serializeArray();
    $.each(a, function(index,obj) {

        if (obj.name == 'teacher') {
            name.push(obj.value)
        }
        if (obj.name == 'teachertel') {
            phone.push(obj.value)
        }
    });
    for(var i=0;i<name.length;i++){
        var o={};
        if(name[i]!=""|| phone[i]!=""){
            o.name=name[i];
            o.phone=phone[i];
            list.push(o);
        }
    }
    var key= a.length+1
    var v={"name":"teacherTel","value":JSON.stringify(list)}
    a[key]=v;
    return a;
};
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
    $.ajax({
        url:workDetailUrl,
        datatype:"json",
        type:"post",
        data:{"actRegisterPhone":actphone},
        success: function (result) {
            console.log(result);
            console.log(result.data.childUrl)
            console.log(result.data.teacherTel);
            console.log((typeof result.data.teacherTel));
            var parms=JSON.stringify(result.data.teacherTel)
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
        }
    })
})