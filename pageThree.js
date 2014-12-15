var busType = "7d250afa-8894-4ca6-8f88-d1a0132baf02";//业务类型:工商受理（设立/变更/注销/换照）
var departID = "dd2fa48d-39b7-4b21-93f0-3b4f5cb27c92";//部门名称:白云工商分局
var Accept = "BY001";//办事大厅:白云--政务中心大厅
var yytime = "2015-01-06";//预约时间:
/*chrome.extension.sendMessage({start: "pageThree"}, function(response) {
  	initThirdPage();
});*/

initThirdPage();
//checkCode();

function initThirdPage(){

	/*var timer;
	var ajax, hasSy = false;

	function getRegistTime(){
		hasSy = false;
		if(timer){
			clearTimeout(timer);
			if(ajax) 
				ajax.abort();
		}
		$.post("three.aspx",{"type":"getyysd","yytime":yytime,"depart":departID,"busId": busType},
				function(data,textStatus, xhr){
					ajax = xhr;
					if(data.length <=0){
						console.log("无预约时间列表，重新获取一下...");
						timer = setTimeout(getRegistTime, 20);
					}else{
						$.each(data, function(i, item){
							if(item.syNum > 0){
								hasSy = true;
								console.log("开始提交...");
								console.log("时间段:"+item.yyId);
								submitRequest(item.ID);
								return false;
							}
						});
						if(!hasSy){
							console.log("无剩余预约数,重新来...");
							timer = setTimeout(getRegistTime, 500);
						}
					}
				},"json");
	}

	timer = setTimeout(getRegistTime, 0);*/
	submitRequest("540207AF-68F0-472E-B9BC-4235221B5A6E");
}

function submitRequest(ID){
	$.post("three.aspx",{"type":"nextstop","PlanId": ID, "AcceptId": Accept},
	 	function(data){
	 		if(data.isError){
	 			console.log("出错重来："+data.message);
	 			initThirdPage();
	 		}else{
	 			location.href= data.url;
	 			console.log("提交预约...");
	 			//checkCode();
	 		}
	 	},"json")
}