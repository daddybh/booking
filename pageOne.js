chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.registCode){
    	$("#ACCEPTNO").val(request.registCode);
    	$("#code").val($("#checkCode").val());
    	Btn_Next();
    }
 });