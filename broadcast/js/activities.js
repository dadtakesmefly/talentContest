/**
 * Created by cnaisin06 on 2017/6/21.
 */
//    var baseUrl = "http://192.168.31.248:7070/AXGY_OP/"; //����������ַ
var baseUrl = "https://rest.cnaisin.com:15443/AXGY_OP/"; //product
//    var baseUrl = "https://rest.cnaisin.com:8443/AXGY_OP/";
var sendCodesMsgUrl = baseUrl + "sendCodesMsg"; //������֤��
var checkCodesUrl = baseUrl + "checkCodes"; //�����֤��
var checkPhoneSignUpUrl = baseUrl + "checkPhoneSignUp"; //����ֻ����Ƿ���

(function() {
    [].slice.call( document.querySelectorAll( '.tabs' ) ).forEach( function( el ) {
        new CBPFWTabs( el );
    });
})();

var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android�ն�
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios�ն�
//    alert('�Ƿ���Android��'+isAndroid);
//    alert('�Ƿ���iOS��'+isiOS);

var inpPhone=document.getElementById("usertel");
var regPhone=/^0?(13|14|15|18)[0-9]{9}$/;
check(inpPhone,regPhone);

function check(inp, reg) {
    inp.onblur = function () {

        if (reg.test(this.value)) {
            return;

        } else {

            btn.value = "��ȡ��֤��";
//                window.location.href="index.html";
        }
    };
}

/*�����ֺͱ�ǩ�Ĵ�С������Ļ�ĳߴ����仰 �ȱ�����*/
var html = document.getElementsByTagName('html')[0];
//    console.log(html);
/*ȡ����Ļ�Ŀ��*/
var width = window.innerWidth;
//    console.log(width);
/* 640 100  320 50 */
var fontSize = 100/640*width;
//    console.log(fontSize);
/*����fontsize*/
if(width>640){
    fontSize=100;
}
html.style.fontSize = fontSize +'px';
window.onresize = function(){
    var html = document.getElementsByTagName('html')[0];
//        console.log(html);
    /*ȡ����Ļ�Ŀ��*/
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
    //����ֻ����Ƿ��Ѿ�����
//        $.ajax({
//            url:checkPhoneSignUpUrl,
//            type:"post",
//            data:{phone:val},
//            success: function (data) {
//                console.log(data);
//                console.log(data.data);
//                if(data.ok===true){
//                    //�������ϴ�
//                    btn.disabled = true;
//                    if(data.data.hasWorksContent=="true"){
//                        btn.disabled = true;
//                        layer.open({
//                            skin:"demo-class",
//                            title:"��ʾ",
//                            content:"������Ʒ�Ѿ��ϴ�,��ǰ������ҳ�鿴",
//                            end: function () {
//                                window.location.href='../workshow/show.html'+"?actRegisterPhone="+val
//                            }
//                        })
//                    }
//                    //����δ�ϴ�
//                   else if(data.data.hasWorksContent=="false"){
//                        layer.open({
//                            skin:"demo-class",
//                            title:"��ʾ",
//                            content:"���ѱ�������δ�ϴ���Ʒ�����ȷ���ϴ���Ʒ",
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
//                        alert("��֤���ѷ���,�����")
                    var nun=60;
                    timer = setInterval(function () {
                        nun--;
                        btn.disabled = true;
                        btn.value = nun + "��";
                        if (nun === 0) {
                            clearInterval(timer);
                            btn.value = "��ȡ��֤��";
                            btn.disabled = false;
                            nun = 60;
                        }
                    }, 1000);
                }

//                    else if(data.exCode==="RepeatedSubmit"){
//                        alert("")
//                    }

                else if(data.exCode==="TimesExceeded"){
//                        alert("һ���ֻ���һ��ֻ�ܻ�ȡ3����֤��,����������!");
                    layer.open({
                        skin:"demo-class",
                        title:"��ʾ",
                        content:"һ���ֻ���һ��ֻ�ܻ�ȡ3����֤��,����������!"
                    })
                    btn.disabled = false;
//                        $(".mask").css({"display":"none"});
                    return false
                }

                else{
//                        alert("�ֻ��Ŵ�������������");
                    layer.open({
                        skin:"demo-class",
                        title:"��ʾ",
                        content:"�ֻ��Ŵ�������������"
                    })
                    btn.disabled=false;
                    btn.value = "��ȡ��֤��";
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
                                    //�������ϴ�
//                                            btn.disabled = true;
                                    if(data.data.hasTeamInfo=="true"){
//                                                alert("������Ʒ�Ѿ��ϴ�,��ǰ������ҳ�鿴");
                                        $(".usertel").val("");
                                        $(".test").val("");
//                                                window.location.href='../workshow/show.html'+"?actRegisterPhone="+val
                                        window.location.href='../workshow/worklist.html'+"?actRegisterPhone="+val

//                                                layer.confirm({
//                                                    skin:"demo-class",
//                                                    title:"��ʾ",
//                                                    content:"������Ʒ�Ѿ��ϴ�,��ǰ������ҳ�鿴",
//                                                    end: function () {
//                                                    window.location.href='../workshow/show.html'+"?actRegisterPhone="+val
//                                                    }
//                                                })
//                                                btn.disabled = true;
//                                                layer.open({
//                                                    skin:"demo-class",
//                                                    title:"��ʾ",
//                                                    content:"������Ʒ�Ѿ��ϴ�,��ǰ������ҳ�鿴",
//                                                    yes: function () {
//                                                        window.location.href='../workshow/show.html'+"?actRegisterPhone="+val
//                                                    }
//                                                })
                                    }
                                    //����δ�ϴ�
                                    else if(data.data.hasTeamInfo=="false"){
//                                                alert("���ѱ�������δ�ϴ���Ʒ,�����ת���ϴ���Ʒҳ")
                                        $(".usertel").val("");
                                        $(".test").val("");
                                        window.location.href='../workshow/halfregister.html'+"?actRegisterPhone="+val
//                                                layer.open({
//                                                    skin:"demo-class",
//                                                    title:"��ʾ",
//                                                    content:"���ѱ�������δ�ϴ���Ʒ�����ȷ���ϴ���Ʒ",
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
                                        title:"��ʾ",
                                        content:"��֤�ɹ�,�����ύ������Ϣ�����ϴ���Ʒ",
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
//                                    title:"��ʾ",
//                                    content:"��֤�ɹ�,���ȷ���ϴ���Ʒ",
//                                    end: function () {
//                                        window.location.href='../workshow/halfregister.html'+"?actRegisterPhone="+val
//                                    }
//                                })
                    }
                    else{
                        layer.open({
                            skin:"demo-class",
                            title:"��ʾ",
                            content:"������֤�����"
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
    var r = window.location.search.substr(1).match(reg);  //��ȡurl��"?"������ַ���������ƥ��
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