var registCode = "440111000679747";
var registTime = "2014-12-03";
var busType = "7d250afa-8894-4ca6-8f88-d1a0132baf02";//工商受理（设立/变更/注销/换照）
var people = {
	"Name": "陈金花",
	"IdCode": "",
	"Mobile":"",
	"Email": ""
}

function initThirdPage(){
	$("#busType").val(busType);
	$("#yyTime").val(registTime);

	var timer;

	function getRegistTime(){
		if(timer){
			clearTimeout(timer);
		}
		$.post("three.aspx",{"type":"getyysd","yytime":registTime,"depart":$("#depart").val(),"busId": busType},
				function(data,textStatus){
					if(data.length <=0){
						timer = setTimeout(getRegistTime, 20);
					}else{
						$.each(data, function(i, item){
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
	$.post("three.aspx",{"type":"nextstop","PlanId": ID, "AcceptId":""},
	 	function(data){
	 		if(data.isError){
	 			initThirdPage();
	 		}else{
	 			//location.href= data.url;
	 			submitFouthSteps();
	 		}
	 	},"json")
}

function wrapper(fn, page, next){
	var t;
	function timer(){
		if(t){
			clearTimeout(t);
		}
		var parts = window.location.href.split('/'),
			currPage = parts[parts.length-1];
		if(currPage === page){
			fn();
		}else{
			t = setTimeout(timer,20);
		}
	}
	t = setTimeout(timer, 20);
}

function submitFouthSteps(){
	$.post("four.aspx", {"type":"yuyue","name": people.Name, idCode: people.IdCode, mobile: people.Mobile, email: people.Email},
			function(data,textStatus){
			   if (data.isError) {
                    alert(data.message); //isError=true 验证不通过
                    location.href = data.url;
                } else {
                    location.href = data.url;
                }
			},"json");
}



function main(){
	initThirdPage();
}

main();