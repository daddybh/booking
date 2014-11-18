var busType = "7d250afa-8894-4ca6-8f88-d1a0132baf02";
var GlobalVar = {};
chrome.extension.sendMessage({start: "pageThree"}, function(response) {
  	GlobalVar = response;
  	initThirdPage();
});



function initThirdPage(){
	$("#busType").val(busType);
	$("#yyTime").val(GlobalVar.Date);

	var timer;
	var ajax;

	function getRegistTime(){
		if(timer){
			clearTimeout(timer);
			if(ajax) 
				ajax.abort();
		}
		ajax = $.post("three.aspx",{"type":"getyysd","yytime":GlobalVar.Date,"depart":$("#depart").val(),"busId": busType},
				function(data,textStatus){
					console.log(data);
					if(data.length <=0){
						timer = setTimeout(getRegistTime, 20);
					}else{
						$.each(data, function(i, item){
							console.log(item);
							if(item.syNum > 0){
								submitRequest(item.ID);
								return;
							}
						})
					}
				},"json");
	}

	timer = setTimeout(getRegistTime, 0);
}

function submitRequest(ID){
	$.post("three.aspx",{"type":"nextstop","PlanId": ID},
	 	function(data){
	 		if(data.isError){
	 			initThirdPage();
	 		}else{
	 			//location.href= data.url;
	 			submitFouthSteps();
	 		}
	 	},"json")
}


function submitFouthSteps(){
	$.post("four.aspx", {"type":"yuyue","name": GlobalVar.name, idCode: people.IdCode, mobile: people.Mobile, email: people.Email},
			function(data,textStatus){
			   if (data.isError) {
                    alert(data.message); //isError=true 验证不通过
                    location.href = data.url;
                } else {
                    location.href = data.url;
                }
			},"json");
}