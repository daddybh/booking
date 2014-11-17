chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.registCode){
    	$("#ACCEPTNO").val(request.registCode);
    	$("#code").val($("#checkCode").html());
    	var btn = $($(".step_mar").find("button")[1]);
    	$(btn).click();
    }
 });