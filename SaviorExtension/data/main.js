var pageMod = require("sdk/page-mod");
var self = require("sdk/self");
var panels = require('panel');
var widgets = require('widget');

// Create a page mod
// It will run the script whenever a "dreamwidth.org" URL is loaded
pageMod.PageMod({
  include: "*.dreamwidth.org", //TODO try restricting to HTML
  contentScriptFile: [self.data.url("getElementsByClassName-1.0.1.js"), self.data.url("savior.js"), self.data.url("driver.js")],
  contentScriptWhen: 'ready',
  onAttach: function(worker) {
	  worker.postMessage(window.content.localStorage);
  }
});

firefoxOptionsPanel = panels.Panel({
	width: 400,
	height: 400,
	contentURL: self.data.url('options.html')
});

//firefoxOptionsPanel.on('message', firefoxOptionsMessageHandler);

var optionsWidget = widgets.Widget({
	id: 'optionsWidget',
	label: 'Nona Savior Options',
	panel: firefoxOptionsPanel,
	contentURL: self.data.url("img/icon16.png")
});
