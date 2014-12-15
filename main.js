$(document).ready(function(){
	$("#start").bind("click", function(){
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, GlobalEnv, function(response) {
			//console.log(response.farewell);
			});
		});
	});
});



function startRegist(){
	initVar();
	addListener();
	sendToPageOne();
}

var GlobalEnv = {};

function initVar(){
	GlobalEnv.registCode = $("#ACCEPTNO").val();
	GlobalEnv.name = $("#name").val();
	GlobalEnv.IdCode = $("#IdCode").val();
	GlobalEnv.Mobile = $("#Mobile").val();
	GlobalEnv.Email = $("#Email").val();
	GlobalEnv.Date = $("#Date").val();
}

function addListener(){
	chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse){

			if (request.start === "pageThree"){
				sendResponse(GlobalEnv)
		    }
		});
}

function sendToPageOne(){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, GlobalEnv, function(response) {
		//console.log(response.farewell);
		});
	});

}

function sendMessage(msg){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, msg, function(response) {
		//console.log(response.farewell);
		});
	});
}
