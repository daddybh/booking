var settings = {};
$(document).ready(function(){
	chrome.storage.local.get("settings", function(result){
		settings = result.settings;

		$("#checkCode").ready(function(){
			checkCode();
		});
	});
});

function reloadCode(){

	$("#checkCode").attr("src", "ValidateCode.aspx?" + Math.random());

}
/**
 * 提交验证码
 * @return {[type]} [description]
 */
function checkCode(){
    $("#shadowDiv").show();
    $("#divhide").show();

	showMsg("获取验证码...");
	var code = getCookie('CheckCode');
	showMsg("验证码:"+code);
	showMsg("提交验证码...");
	$.post("four.aspx", { type: "checkCode", checkCode: code }, function(data){
		if(data.isError){
			showMsg("重现加载验证码...");
			reloadCode();
		}else{
			submitFouthSteps();
		}
	},"json").fail(function(){
		showMsg("验证码ajax出错");
	});
}

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
} 


function submitFouthSteps(){
	$.post("four.aspx", {"type":"yuyue","name": settings.name, "idCode": settings.idCode, "mobile": settings.mobile, "email": settings.email},
			function(data,textStatus){
			   if (data.isError) {
		 			showMsg("出错重来："+data.message);
		 			//location.href="three.aspx";
		 			//initThirdPage();
		 			checkCode();
                } else {
                	showMsg("跳转到预约成功页面...");
                    location.href = data.url;
                }
			},"json").fail(function(){
				showMsg("ajax请求失败，再来过...");
				checkCode();
	 			//$("#checkCode").ready(checkCode).click();
			}, "json");
}


function showMsg(msg){
	console.log(msg);
}