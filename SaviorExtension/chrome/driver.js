/*
 * developed by tzbutts
 */

// kick everything off by getting the current settings from the background process
// once we've gotten the settings, kick off the work to do blocking appropriately

if(typeof chrome !== "undefined") { // chrome
	chrome.runtime.sendMessage({method: "getSettings"}, function(response) {
		var settings = JSON.parse(response.data);
		//console.log(settings);
		
		checkBlockers(settings, document.body);

		addExpandListener(settings);
	});
	
} else { // firefox
	/*
	self.on("message", function(data) {
		var settings = {};
		
		for(var key in defaultSettings) {
			var val = data[key];
			if(!val) {
				val = defaultSettings[key];
			}
			settings[key] = val;
		}
		
		//var settings = getSettings(data);
		//console.log(settings);

		replacePlaceholder(settings, document.body);

		addExpandListener(settings);
	});
	*/
}
