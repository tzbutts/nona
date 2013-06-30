/*
 * developed by tzbutts
 */

// default settings
var defaultSettings = {
	"block": true,
	"whole_words_only": true,
	"include_title": true,
	"blockers": ["poop", "pee"]
};

// background process listening for "getSettings" messages
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
    	if(request.method == "getSettings") {
    		sendResponse({data: JSON.stringify(getSettings())});
    	}
    }
);

// function to get saved settings (falling back to defaults if needed)
function getSettings() {
	var settings = {};
	
	for(var key in defaultSettings) {
		var val = localStorage[key];
		if(val) {
			val = JSON.parse(val);
		} else {
			val = defaultSettings[key];
		}
		settings[key] = val;
	}
	
	return settings;
}
