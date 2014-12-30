$(document).ready(function(){
	initPage();
	initPageElement();
});

function initPage(){
	$("#saveBtn").bind("click", saveSetting);
}

function initPageElement(){
	chrome.storage.local.get("settings", function(result){
		var settings = result.settings;
		$("#name").val(settings.name);
		$("#idCode").val(settings.idCode);
		$("#mobile").val(settings.mobile);
		$("#email").val(settings.email);
	});
}

function saveSetting(){
	var settings = {
		"name":$("#name").val(),
		"idCode":$("#idCode").val(),
		"mobile":$("#mobile").val(),
		"email":$("#email").val()
	};
	chrome.storage.local.set({"settings":settings}, function(){
		alert('保存成功');
	});
}