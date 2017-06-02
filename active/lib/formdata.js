// jQuery zepto vue angular 等库皆有 progress 的实现 以jQuery为例：

$(function(){
  var $key = $('#key');  // file name    eg: the file is image.jpg,but $key='a.jpg', you will upload the file named 'a.jpg'
  var $userfile = $('#userfile');  // the file you selected

  // upload info
  var $selectedFile = $('.selected-file');
  var $progress = $(".progress");
  var $uploadedResult = $('.uploaded-result');

  $("#userfile").change(function() {  // you can ues 'onchange' here to uplpad automatically after select a file
    $uploadedResult.html('');
    var selectedFile = $userfile.val();
    if (selectedFile) {
      // randomly generate the final file name
      var ramdomName = Math.random().toString(36).substr(2) + $userfile.val().match(/\.?[^.\/]+$/);
      $key.val(ramdomName);
      $selectedFile.html('文件：' + selectedFile);
    } else {
      return false;
    }
    var f = new FormData(document.getElementById("testform"));
    $.ajax({
      url: 'https://upload.qbox.me',  // Different bucket zone has different upload url, you can get right url by the browser error massage when uploading a file with wrong upload url.
      type: 'POST',
      data: f,
      processData: false,
      contentType: false,
      xhr: function(){
        myXhr = $.ajaxSettings.xhr();  
        if(myXhr.upload){
          myXhr.upload.addEventListener('progress',function(e) {
            // console.log(e);
            if (e.lengthComputable) {
              var percent = e.loaded/e.total*100;
              //$progress.html('上传：' + e.loaded + "/" + e.total+" bytes. " + percent.toFixed(2) + "%");
              $progress.html('上传：'  + percent.toFixed(2) + "%");
            }
          }, false);
        }
        return myXhr;
      },
      success: function(res) {
        console.log("成功：" + JSON.stringify(res));
        //var str = '<span>已上传：' + res.key + '</span>';
        //var str = '<span>已上传</span>';
        if (res.key && res.key.match(/\.(jpg|jpeg|png|gif|bmp)$/)) {
          str = '<img src="' + domain + res.key + '"/>';
        }
        $uploadedResult.html(str);
        console.log(res.key);
        //$("#getscr").attr("src", domain + res.key)
        //$(window.parent.document).find("#getscr").attr("value",domain + res.key);
        $(window.top.document).find("#getscr").attr("value",domain + res.key);
        //var src= $("#getscr").val();

        //console.log(src);
        //if(src!=""){
        //  //$("#sbm").attr({"disabled":"disabled"})
        //  $("#sbm").removeAttr("disabled")
        //}
        //else{
          //$("#sbm").removeAttr("disabled")
          //$("#sbm").on("click", function () {
          //  $("#myform").serializeObject();
          //  console.log($("#myform").serializeObject());
          //  $.ajax({
          //    url:"https://rest.cnaisin.com:8443/AXGY_OP/enrollment",
          //    type:"post",
          //    data:$("#myform").serializeObject(),
          //    success: function (data) {
          //      console.log(data)
          //      if(data.ok==true){
          //        alert("提交成功");
          //        window.location.href="./succeed.html?add=copy";
          //      }
          //      else{
          //        alert("请填写必填项")
          //      }
          //    }
          //  })
          //})
        //}



        //document.getElementById('iframeid').contentWindow.myFunc();
        //$("#getscr",window.parent.document).attr("value",domain + res.key)
        //$("pre",document.getElementById('test_iframe').contentWindow.document).attr("innerHTML")
        },
      error: function(res) {  
        console.log("失败:" +  JSON.stringify(res));
        //$uploadedResult.html('上传失败：' + res.responseText);
        $progress.html('上传失败：' + res.responseText);
      }
    });
    return false;
  });
});