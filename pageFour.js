
$(document).ready(function(){
	$("#checkCode").ready(function(){
		checkCode();
	});
});
/**
 * 提交验证码
 * @return {[type]} [description]
 */
function checkCode(){
    $("#shadowDiv").show();
    $("#divhide").show();

	console.log("获取验证码...");
	var code = getCookie('CheckCode');
	console.log("验证码:"+code);
	console.log("提交验证码...");
	$.post("four.aspx", { type: "checkCode", "checkCode": code }, function(data){
		if(data.isError){
			console.log("重现加载验证码...");
			$("#checkCode").ready(checkCode).click();
		}else{
			submitFouthSteps();
		}
	});
}

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
} 


function submitFouthSteps(){
	$.post("four.aspx", {"type":"yuyue","name": "陈金花", "idCode": "441481198605120021", "mobile": "18302039757", "email": "370862573@qq.com"},
			function(data,textStatus){
			   if (data.isError) {
		 			console.log("出错重来："+data.message);
		 			//location.href="three.aspx";
		 			//initThirdPage();
		 			$("#checkCode").ready(checkCode).click();
                } else {
                	console.log("跳转到预约成功页面...")
                    location.href = data.url;
                }
			},"json");
}