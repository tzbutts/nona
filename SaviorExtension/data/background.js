/*
 * developed by tzbutts
 */

// function to get saved settings (falling back to defaults if needed)
function getSettings() {
	var settings = {};
	
	for(var key in defaultSettings) {
		if(key in localStorage) {
			settings[key] = JSON.parse(localStorage[key]);
		} else {
			settings[key] = defaultSettings[key];
		}
	}
	
	return settings;
}

// background process listening for "getSettings" messages
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
    	if(request.method == "getSettings") {
    		sendResponse({data: JSON.stringify(getSettings())});
    	}
    }
);
