/*
 * developed by tzbutts
 */

var TEXT = {
	NONE     : { key: "NONE",     display: "None",
		apply : function(parent, image) {
		
		}},
	STD      : { key: "STD",      display: "Nona embedded image",
		apply : function(parent, image) {
    		var newElem = document.createElement('b');
    		newElem.innerHTML = "Nona embedded image:";
    		parent.insertBefore(newElem, image);
    		parent.insertBefore(document.createElement('br'), image);
		}},
	STD_SIZE : { key: "STD_SIZE", display: "Nona embedded image (WIDTH x HEIGHT)",
		apply : function(parent, image) {
    		var newElem = document.createElement('b');
    		newElem.innerHTML = "Nona embedded image:";
    		parent.insertBefore(newElem, image);
    		parent.insertBefore(document.createElement('br'), image);
    		
			image.onload = function() {
				newElem.innerHTML = "Nona embedded image (" + this.width + " x " + this.height + "):";
			}
		}}
};

// default settings
var defaultSettings = {
	"text": TEXT.STD["key"]
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
