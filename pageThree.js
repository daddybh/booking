var busType = "";//业务类型:工商受理（设立/变更/注销/换照）
var departID = "";//部门名称:白云工商分局
var Accept = "";//办事大厅:白云--政务中心大厅
var yytime = "";//预约时间:
var top = 30, index=1;
$(document).ready(function(){
	initEvts();
});

function initThirdPage(){

	var timer;
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
						showMsg("无预约时间列表，重新获取一下...");
						timer = setTimeout(getRegistTime, 20);
					}else{
						$.each(data, function(i, item){
							if(item.syNum > 0){
								hasSy = true;
								showMsg("开始提交...");
								showMsg("时间段:"+item.yyId);
								submitRequest(item.ID);
								return false;
							}
						});
						if(!hasSy){
							yytime = addDate();
							showMsg("无剩余预约数,重新来，查询："+yytime);
							timer = setTimeout(getRegistTime, 500);
						}
					}
				},"json");
	}

	timer = setTimeout(getRegistTime, 0);
}

function initVariable(){
	yytime = $("#yyTime").val();
	departID = $("#depart").val();
	Accept = $("#Accept").val();
	busType = $("#busType").val();
}

function addDate(){
	var d = new Date(yytime);
	var m = moment(d);
	m = m.add(index,'d');
	if(m.day() === 0 || m.day() === 6){
		index++;
		return addDate();
	}
	return m.format("YYYY-MM-DD");
}

function initEvts(){
	var btn = $("<button id=\"next\" >预约</button>").bind("click", function(){
		initVariable();
		initThirdPage();
	});
	btn.insertAfter($("#next"));
}

function submitRequest(ID){
	var params = {"type":"nextstop","PlanId": ID};
	if(Accept && Accept !== ""){
		params.AcceptId = Accept;
	}
	$.post("three.aspx",params,
	 	function(data){
	 		if(data.isError){
	 			showMsg("出错重来："+data.message);
	 			initThirdPage();
	 		}else{
	 			location.href= data.url;
	 			showMsg("提交预约...");
	 			//checkCode();
	 		}
	 	},"json")
}

function showMsg(msg){
	console.log(msg);
}