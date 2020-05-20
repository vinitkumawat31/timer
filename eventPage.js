chrome.tabs.onCreated.addListener(function(tab){
	var id = "tab_"+tab.id+"_"+tab.windowId;
	var d = new Date();
	var timestamp = d.toLocaleString();
	var milli_sec = d.getTime();
	data = {
		"timestamp": timestamp,
		"milli_sec": milli_sec
	};
	chrome.storage.sync.get(["timer_tabs"], function(result){
		if(result.timer_tabs){
			result.timer_tabs[id] = data;
			chrome.storage.sync.set({"timer_tabs":result.timer_tabs});
		}
		else{
			timer_tabs = {
				id:data
			};
			chrome.storage.sync.set({"timer_tabs":timer_tabs});
		}
	});
});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo){
	var id = "tab_"+tabId+"_"+removeInfo.windowId;
	chrome.storage.sync.get(["timer_tabs"], function(result){
			delete result.timer_tabs[id];
			chrome.storage.sync.set({"timer_tabs":result.timer_tabs});
	});
});