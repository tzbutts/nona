/*
 * developed by tzbutts
 */

//kick everything off by getting the current settings from the background process
//once we've gotten the settings, kick off the work to do blocking appropriately
chrome.runtime.sendMessage({method: "getSettings"}, function(response) {
	var settings = JSON.parse(response.data);
	//console.log(settings);

	replacePlaceholder(settings, document.body);

	addExpandListener(settings);
});
