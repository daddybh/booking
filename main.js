$(document).ready(function(){
	$("#start").bind("click", );
});

var GlobalEnv = {};

function initVar(){
	GlobalEnv.registCode = $("#ACCEPTNO").val();
	GlobalEnv.name = $("#name").val();
	GlobalEnv.IdCode = $("#IdCode").val();
	GlobalEnv.Mobile = $("#Mobile").val();
	GlobalEnv.Email = $("#Email").val();
}

function startRegist(){
	initVar();
	sendMessage({"registCode": GlobalEnv.registCode});
}

function sendMessage(msg){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, msg, function(response) {
		console.log(response.farewell);
		});
	});
}