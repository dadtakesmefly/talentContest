/**
 * Created by cnaisin06 on 2017/6/21.
 */
var baseUrl = "http://192.168.31.248:7070/AXGY_OP/"; //本地联调地址
//    var baseUrl = "https://rest.cnaisin.com:8443/AXGY_OP/";
var baseUrl = "https://rest.cnaisin.com:15443/AXGY_OP/"; //product
var workDetailUrl = baseUrl + "workDetail"; //作品详情
var  voteShowUrl =  baseUrl + "voteShow";
//投票阶段
//    $(function () {
//        $(".xiugai").on("click", function () {
//            window.location.href='./halfupload.html'+"?actRegisterPhone="+actphone+"&workNumber="+workNumber+"&disable="+123
//        })
//        $(".editor").on("click", function () {
//            window.location.href='./resetinfo.html'+"?actRegisterPhone="+actphone+"&workNumber="+workNumber
//        })
//    })

$(function () {
    $(".close").on("click", function () {
        $(".links").fadeOut();
        $(".back").animate({"margin-bottom":"20px"})
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
        $(".back").animate({"margin-bottom":"20px"})
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
var workNumber=GetQueryString("workNumber");
var htmltop =GetQueryString("htmltop");
console.log(GetQueryString("actRegisterPhone"));
console.log(workNumber);
$("#actphone").attr("value",actphone);
console.log(htmltop);
var eq= GetQueryString("eq");
console.log(eq);
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
//            window.history.back()
        window.location.href='./votelist.html'+"?htmltop="+htmltop+"&eq="+eq

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
            var html8=template("holdPicture",result.data)
            $(".image").html(html8);
            $(".votenum").html(Number(result.data.votesNumber))
            //图片超过两张，去掉多余的title
            if(result.data.worksContent.length>=2){
                $(".show ul li:not(li:eq(0))").find("div,.bianhao").hide()
                $(".show ul li:not(li:eq(0)) img").css({"margin-top":"-0.7rem"})
            }
            if(result.data.type==1){
                result.data.type=="手工类";
                $(".type").html("手工类\&nbsp;\&nbsp;")
            }
            if(result.data.type==2){
                result.data.type=="绘画类"
                $(".type").html("绘画类\&nbsp;\&nbsp;")
            }
            if(result.data.type==3){
                result.data.type=="书法类"
                $(".type").html("书法类\&nbsp;\&nbsp;")
            }
            if(result.data.type==4){
                result.data.type=="写作类"
                $(".type").html("写作类\&nbsp;\&nbsp;")
            }
            $(".worktitle").html(result.data.workName);
            $(".bianhao .num").html(result.data.workNumber)
            document.title="第"+result.data.workNumber +"号，"+ result.data.workName+"_留守儿童才艺大赛";
        }
    })
})

//    投票结束
//   $(function () {
//       var cishu=0;
//       $(".xiugai").on("click", function () {
//           cishu++;
//           $.ajax({
//               url:"",
//               type:"post",
//               data:{"workNumber":workNumber},
//               success: function (data) {
//                   if(cishu<5){
//                       console.log(data.data.votesNumber);
//                       $(".votenum").html(Number(data.data.votesNumber))
//                       layer.open({
//                           skin:"demo-class",
//                           title:"提示",
//                           content:"该作品投票数+1",
//                       })
//                   }
//                   else{
//                       console.log(data.data.votesNumber);
//                       $(".votenum").html(Number(data.data.votesNumber))
//                       layer.open({
//                           skin:"demo-class",
//                           title:"提示",
//                           content:"【您今天已经投了5次票】",
//                           end: function () {
//                               $('.xiugai').attr("disabled","true")
//                           }
//                       })
//                   }
//               }
//           })
//       })
//   })