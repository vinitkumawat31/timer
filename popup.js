
function getDuration(t){
	var d = new Date();
	d = d.getTime();
	t = parseInt(t);
	var sec = Math.floor((d-t)/1000);
	var min = Math.floor(sec/60);
	var h = Math.floor(min/60);
	var res = ""+h+" hr : " + min%60 + " min : " + sec%60 + " sec";
	return res;
}
$(function(){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
	    var id = "tab_"+tabs[0].id+"_"+tabs[0].windowId;
	    $("#id_tab").text(tabs[0].id);
	    chrome.storage.sync.get(["timer_tabs"], function(result) {
	    	var data = result.timer_tabs[id];
	    	$("#start_time").text(data["timestamp"]);
	    	$("#duration").text(getDuration(data["milli_sec"]));
        });
	});
});