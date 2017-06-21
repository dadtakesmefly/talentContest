/**
 * Created by cnaisin06 on 2017/6/21.
 */
//    var baseUrl = "http://192.168.31.248:7070/AXGY_OP/"; //本地联调地址
var baseUrl = "https://rest.cnaisin.com:15443/AXGY_OP/"; //product
//    var baseUrl = "https://rest.cnaisin.com:8443/AXGY_OP/";
var sendCodesMsgUrl = baseUrl + "sendCodesMsg"; //发送验证码
var checkCodesUrl = baseUrl + "checkCodes"; //检查验证码
var checkPhoneSignUpUrl = baseUrl + "checkPhoneSignUp"; //检查手机号是否报名

(function() {
    [].slice.call( document.querySelectorAll( '.tabs' ) ).forEach( function( el ) {
        new CBPFWTabs( el );
    });
})();

var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
//    alert('是否是Android：'+isAndroid);
//    alert('是否是iOS：'+isiOS);

var inpPhone=document.getElementById("usertel");
var regPhone=/^0?(13|14|15|18)[0-9]{9}$/;
check(inpPhone,regPhone);

function check(inp, reg) {
    inp.onblur = function () {

        if (reg.test(this.value)) {
            return;

        } else {

            btn.value = "获取验证码";
//                window.location.href="index.html";
        }
    };
}

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

//    window.location.href="../workshow/votelist.html?eq=0"

var btn = document.getElementById("btn");
var num = 60;
var timer = null;
var usertel=$("#usertel");
var test=$("#test");
$("#usertel").die().live("change", function () {
    var val=this.value;
    console.log(val);
    $("#btn").removeAttr("disabled");
    //检查手机号是否已经报名
//        $.ajax({
//            url:checkPhoneSignUpUrl,
//            type:"post",
//            data:{phone:val},
//            success: function (data) {
//                console.log(data);
//                console.log(data.data);
//                if(data.ok===true){
//                    //报名已上传
//                    btn.disabled = true;
//                    if(data.data.hasWorksContent=="true"){
//                        btn.disabled = true;
//                        layer.open({
//                            skin:"demo-class",
//                            title:"提示",
//                            content:"您的作品已经上传,请前往详情页查看",
//                            end: function () {
//                                window.location.href='../workshow/show.html'+"?actRegisterPhone="+val
//                            }
//                        })
//                    }
//                    //报名未上传
//                   else if(data.data.hasWorksContent=="false"){
//                        layer.open({
//                            skin:"demo-class",
//                            title:"提示",
//                            content:"您已报名，但未上传作品，点击确定上传作品",
//                            end: function () {
//                                window.location.href='../workshow/workdetails.html'+"?actRegisterPhone="+val
//                            }
//                        })
//                    }
//                    btn.disabled = true;
////                    $(".mask").css({"display":"none"});
//                    return false
//                }
//            }
//        });

    $("#btn").die().live("click", function () {
        this.disabled = true;
        $.ajax({
            url:sendCodesMsgUrl,
            async: false,
            type:"post",
            data:{phone:val},
            success: function (data) {
                console.log(data);
                if(data.ok==true){
//                        $("#btn").removeAttr("disabled");
                    btn.disabled = true;
//                        alert("验证码已发送,请查收")
                    var nun=60;
                    timer = setInterval(function () {
                        nun--;
                        btn.disabled = true;
                        btn.value = nun + "秒";
                        if (nun === 0) {
                            clearInterval(timer);
                            btn.value = "获取验证码";
                            btn.disabled = false;
                            nun = 60;
                        }
                    }, 1000);
                }

//                    else if(data.exCode==="RepeatedSubmit"){
//                        alert("")
//                    }

                else if(data.exCode==="TimesExceeded"){
//                        alert("一个手机号一天只能获取3次验证码,请明天再试!");
                    layer.open({
                        skin:"demo-class",
                        title:"提示",
                        content:"一个手机号一天只能获取3次验证码,请明天再试!"
                    })
                    btn.disabled = false;
//                        $(".mask").css({"display":"none"});
                    return false
                }

                else{
//                        alert("手机号错误，请重新输入");
                    layer.open({
                        skin:"demo-class",
                        title:"提示",
                        content:"手机号错误，请重新输入"
                    })
                    btn.disabled=false;
                    btn.value = "获取验证码";
                    return false
                }

            }
        })
    })

    var num;
    $("#test").die().live("change", function () {
        num=this.value;
        console.log(num);
        $("#sbm").die().live("click", function () {
//                    var params = $("#myform").serialize();
//                    console.log(params);
            $.ajax({
//                        url:"https://rest.cnaisin.com:8443/AXGY_OP/checkCodes",
                url:checkCodesUrl,
                type:"post",
                data:{phone:val,codes:num},
                success: function (data) {
                    console.log(data);
                    if(data.ok==true){
                        $.ajax({
                            url:checkPhoneSignUpUrl,
                            type:"post",
                            data:{phone:val},
                            success: function (data) {
                                console.log(data);
                                console.log(data.data);
                                if(data.ok===true){
                                    //报名已上传
//                                            btn.disabled = true;
                                    if(data.data.hasTeamInfo=="true"){
//                                                alert("您的作品已经上传,请前往详情页查看");
                                        $(".usertel").val("");
                                        $(".test").val("");
//                                                window.location.href='../workshow/show.html'+"?actRegisterPhone="+val
                                        window.location.href='../workshow/worklist.html'+"?actRegisterPhone="+val

//                                                layer.confirm({
//                                                    skin:"demo-class",
//                                                    title:"提示",
//                                                    content:"您的作品已经上传,请前往详情页查看",
//                                                    end: function () {
//                                                    window.location.href='../workshow/show.html'+"?actRegisterPhone="+val
//                                                    }
//                                                })
//                                                btn.disabled = true;
//                                                layer.open({
//                                                    skin:"demo-class",
//                                                    title:"提示",
//                                                    content:"您的作品已经上传,请前往详情页查看",
//                                                    yes: function () {
//                                                        window.location.href='../workshow/show.html'+"?actRegisterPhone="+val
//                                                    }
//                                                })
                                    }
                                    //报名未上传
                                    else if(data.data.hasTeamInfo=="false"){
//                                                alert("您已报名，但未上传作品,点击跳转到上传作品页")
                                        $(".usertel").val("");
                                        $(".test").val("");
                                        window.location.href='../workshow/halfregister.html'+"?actRegisterPhone="+val
//                                                layer.open({
//                                                    skin:"demo-class",
//                                                    title:"提示",
//                                                    content:"您已报名，但未上传作品，点击确定上传作品",
//                                                    end: function () {
//                                                        $(this).prop('is-shown', true)
//                                                        window.location.href='../workshow/workdetails.html'+"?actRegisterPhone="+val
//                                                    }
//                                                })
                                    }
//                                            btn.disabled = true;
//                                            $(".mask").css({"display":"none"});
//                                            return false
                                }
                                else{
                                    layer.open({
                                        skin:"demo-class",
                                        title:"提示",
                                        content:"验证成功,请先提交报名信息后再上传作品",
                                        end: function () {
                                            $(".usertel").val("");
                                            $(".test").val("");
                                            window.location.href='../workshow/halfregister.html'+"?actRegisterPhone="+val
                                        }
                                    })
                                }
                            }
                        });
//                                layer.open({
//                                    skin:"demo-class",
//                                    title:"提示",
//                                    content:"验证成功,点击确定上传作品",
//                                    end: function () {
//                                        window.location.href='../workshow/halfregister.html'+"?actRegisterPhone="+val
//                                    }
//                                })
                    }
                    else{
                        layer.open({
                            skin:"demo-class",
                            title:"提示",
                            content:"短信验证码错误"
                        })
                        btn.disabled = false;
                        return false
                    }
                }
            })
        })

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


$(function () {
    $(".canyu").on("click", function () {
        $(".mask").css({"display":"block"})
    })
})

$(function () {
    $("#close").on("click", function () {
        $(".mask").hide();
    })
})