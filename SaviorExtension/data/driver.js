/*
 * developed by tzbutts
 */

// kick everything off by getting the current settings from the background process
// once we've gotten the settings, kick off the work to do blocking appropriately

var browser = {
	isChrome:  (window && window.chrome) ? true : false,
	isSafari:  (window && window.safari) ? true : false,
	isOpera:   (window && window.opera)  ? true : false,
	isFirefox: (navigator.userAgent.indexOf('Firefox') >= 0) ? true : false
}

if(browser.isChrome || browser.isOpera) {
	chrome.runtime.sendMessage({method: "getSettings"}, function(response) {
		var settings = JSON.parse(response.data);
		//console.log(settings);
		
		checkBlockers(settings, document.body);

		addExpandListener(settings);
		
		listen(settings);
	});
	
} else if(browser.isFirefox) {
	self.on("message", function(data) {
		var settings = {};
		
		for(var key in defaultSettings) {
			if(key in data) {
				settings[key] = data[key];
			} else {
				settings[key] = defaultSettings[key];
			}
		}
		
		checkBlockers(settings, document.body);
		
		addExpandListener(settings);
		
		listen(settings);
	});
}
