/**
 * Created by cnaisin06 on 2017/6/21.
 */
//    var baseUrl = "http://192.168.31.248:7070/AXGY_OP/"; //本地联调地址
//var baseUrl = "https://rest.cnaisin.com:8443/AXGY_OP/";
var baseUrl = "https://rest.cnaisin.com:15443/AXGY_OP/"; //product
var workDetailUrl = baseUrl + "workDetail"; //作品详情
var modifyTutorInfoUrl = baseUrl + "modifyTutorInfo"; //修改辅导老师

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
var workNumber=GetQueryString("workNumber");

$("#actphone").attr("value",actphone)
$("#workNumber").attr("value",workNumber);
var name=GetQueryString("name");
console.log(name);
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
    $("#add").on("click", function () {
        $(".addd").first().append($(".addtitle1:first").first().clone(true).attr('class',"addtitle1 clone").attr("style","display:block"));
        $(".remove").on("click", function () {
            $(this).parent(".clone").remove();
        })
    });
})
$("#sbm").on("click", function () {
    $("myform").serializeObject();
    console.log($("#myform").serializeObject());
    $.ajax({
        url:modifyTutorInfoUrl,
        type:"post",
        data:$("#myform").serializeObject(),
        success: function (data) {
            console.log(data)
            if(data.ok==true){
                layer.open({
                    skin:"demo-class",
                    title:"提示",
                    content:"修改成功",
                    end: function () {
                        window.location.href=document.referrer
//                            window.location.href='../workshow/show.html'+"?actRegisterPhone="+actphone
//                            window.history.back().reload()
                    }
                })
            }
            else if(data.ok==false){
                layer.open({
                    skin:"demo-class",
                    title:"提示",
                    content:"修改失败"
                })
            }
        }
    })
})

$.ajax({
    url:workDetailUrl,
    datatype:"json",
    type:"post",
    data:{"actRegisterPhone":actphone,"workNumber":workNumber},
    success: function (result) {
        console.log(result.data.teacherTel);
        var html = template("teachermsg",result.data)
        $(".addtitle").html(html)
    }
})