// Import the page-mod API
var pageMod = require("sdk/page-mod");
// Import the self API
var self = require("sdk/self");
 
// Create a page mod
// It will run the script whenever a "dreamwidth.org" URL is loaded
pageMod.PageMod({
  include: "*.dreamwidth.org", //TODO try restricting to HTML
  contentScriptFile: [self.data.url("getElementsByClassName-1.0.1.js"), self.data.url("nona.js"), self.data.url("driver.js")],
  contentScriptWhen: 'ready',
  onAttach: function(worker) {
	  worker.postMessage(require("sdk/simple-prefs").prefs);
  }
});
