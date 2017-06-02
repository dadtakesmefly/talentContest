
/*让文字和标签的大小随着屏幕的尺寸做变话 等比缩放*/
var html = document.getElementsByTagName('html')[0];
//    console.log(html);
/*取到屏幕的宽度*/
var width = window.innerWidth;
//    console.log(width);
/* 640 100  320 50 */
var fontSize = 100/640*width;
//    console.log(fontSize);
/*设置fontsize*/
if(width>640){
    fontSize=100;
}
html.style.fontSize = fontSize +'px';
window.onresize = function(){
    var html = document.getElementsByTagName('html')[0];
//        console.log(html);
    /*取到屏幕的宽度*/
    var width = window.innerWidth;
//        console.log(width);
    /* 640 100  320 50 */
    var fontSize = 100/640 * width;
//        console.log(fontSize);

    html.style.fontSize = fontSize +'px';
}

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
//        var key= a.length+1
//        var v={"name":"teacherTel","value":JSON.stringify(list)}
//        a[key]=v;
    return a;
};



$(function () {
    $("#single").on("click", function () {
//          $(this).attr("href","./singlepic.html")
        layer.open({
            type: 2,
            title: '上传参赛者手执作品照片',
            shadeClose: true,
            shade: false,
            maxmin: true, //开启最大化最小化按钮
            area: ['100%', '100%'],
            content: './singlepic.html'
        });
    });
    $("#multi").on("click", function () {
//          $(this).attr("href","./multipic.html")
        layer.open({
            type: 2,
            title: '上传参赛作品照片',
            shadeClose: true,
            shade: false,
            maxmin: true, //开启最大化最小化按钮
            area: ['100%', '100%'],
            content: './multipic.html'
        });
    });
})

/**
 * Created by cnaisin06 on 2017/4/27.
 */
