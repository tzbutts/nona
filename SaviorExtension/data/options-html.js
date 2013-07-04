/*
 * developed by tzbutts
 */

// save the setting based on checkbox
function saveBoolSetting(name) {
	var elem = document.getElementById("opt_" + name);
	localStorage[name] = JSON.stringify(elem.checked);
}

// save the setting based on the blockers list
function saveBlockers(name) {
	var divElem = document.getElementById("opt_" + name);

	var values = [];
	var count = 0;

	// check all children of the outer div element
	var n = getNumBlockers(divElem);
	for(var i = 0; i < n; i++) {
		var elem = getBlockerAt(divElem, i);
		// if something's been entered in, add it to the list
		if(elem.value && 0 !== elem.value.length) {
			values[count] = {"phrase": elem.value, "hidden": elem.type == "password"};
			count++;
		}
	}
	
	localStorage[name] = JSON.stringify(values);
}

// function to save all settings currently on the page
function saveSettings() {
	saveBoolSetting("block");
	saveBoolSetting("whole_words_only");
	saveBoolSetting("include_title");
	
	saveBlockers("blockers");
	
	doExport();
	
	var elem = document.getElementById("message");
	elem.innerHTML = "Options saved!";
	setTimeout(function() {
	    elem.innerHTML = "";
	}, 1500);
}

// function to restore a bool setting to a checkbox
function restoreBoolSetting(name) {
	var val = localStorage[name];
	if(val) {
		val = JSON.parse(val);
	} else {
		val = defaultSettings[name];
	}
	
	var elem = document.getElementById("opt_" + name);
	elem.checked = val;
}

// adds 5 more blocker fields to the end of the outer div element
function addMoreBlockerFieldsToEnd() {
	var name = "blockers";
	var divElem = document.querySelector("#opt_" + name);
	addMoreBlockerFields(name, divElem, getNumBlockers(divElem), 5);
}

// adds more blocker fields to the given div element
function addMoreBlockerFields(name, divElem, startIndex, numToAdd) {
	for(var i = 0; i < numToAdd; i++) {
		var span = document.createElement("span");
		span.setAttribute("style", "white-space: nowrap");
		
		var inputElem = document.createElement("input");
		inputElem.setAttribute("name", name);
		inputElem.setAttribute("id", "opt_" + name + "_" + (startIndex + i));
		inputElem.setAttribute("type", "text");
		span.appendChild(inputElem);
		
		var hideElem = document.createElement("small");
		hideElem.innerHTML = "hide";
		hideElem.className = "link";
		hideElem.onclick = function(event) {
			var hide = this.innerHTML == "hide";
			this.innerHTML = hide ? "show" : "hide";
			this.parentNode.children[0].setAttribute("type", hide ? "password" : "text");
		};
		span.appendChild(hideElem);
		
		divElem.appendChild(span);
		
		divElem.appendChild(document.createElement("br"));
	}
}

function getNumBlockers(elem) {
	return elem.children.length / 2;
}

function getBlockerAt(elem, index) {
	return elem.children[index * 2].children[0];
}

// restore the list of blockers to the inputs on the page
function restoreBlockers(name) {
	var val = localStorage[name];
	if(val) {
		val = JSON.parse(val);
	} else {
		val = defaultSettings[name];
	}
	
	var divElem = document.getElementById("opt_" + name);
	
	// make sure we have enough slots
	while(Math.ceil((val.length + 1) / 5) * 5 > getNumBlockers(divElem)) {
		addMoreBlockerFields(name, divElem, getNumBlockers(divElem), 5);
	}
	
	// fill the slots
	for(var i = 0; i < val.length; i++) {
		var blocker = val[i];
		var elem = getBlockerAt(divElem, i);
		elem.setAttribute("type", blocker["hidden"] ? "password" : "text");
		elem.setAttribute("value", blocker["phrase"]);
		elem.parentNode.children[1].innerHTML = blocker["hidden"] ? "show" : "hide";
	}
}

// restore all settings from local storage / default settings to the page
function restoreSettings() {
	restoreBoolSetting("block");
	restoreBoolSetting("whole_words_only");
	restoreBoolSetting("include_title");
	
	restoreBlockers("blockers");
	
	doExport();
}

// put current settings into import/export text area
function doExport() {
	var str = JSON.stringify(localStorage);
	var elem = document.querySelector("#importexport");
	elem.value = str;
	elem.innerHTML = str;
}

// read in settings from inport/export text area
function doImport() {
	var settings = JSON.parse(document.querySelector("#importexport").value);
	console.log(localStorage);
	for(key in settings) {
		localStorage[key] = settings[key];
	}
	console.log(localStorage);
	restoreSettings();
}

// switch navigation tab
function switchTab(event) {
	var item = event.toElement;
	if(!item.id) return;
	
	for(var i = 0; i < this.children.length; i++) {
		this.children[i].setAttribute("class", null);
	}
	
	item.setAttribute("class", "selected");
	
	var contentID = "content_" + item.id.substring(4);
	
	var content = document.querySelector("#content");
	for(var i = 0; i < content.children.length; i++) {
		content.children[i].setAttribute("class", "invisible");
	}
	
	content = document.querySelector("#" + contentID);
	content.setAttribute("class", "visible");
}


// HTML stuff

// when the options page is loaded, restore the settings
document.addEventListener('DOMContentLoaded', restoreSettings);

//connect the add link to addMoreBlockerFieldsToEnd()
document.querySelector('#add_more_blockers').addEventListener('click', addMoreBlockerFieldsToEnd);

// connect the save button to saveSettings()
document.querySelector('#save').addEventListener('click', saveSettings);

// connect navigation tabs
document.querySelector('#nav').addEventListener('click', switchTab);

// connect import button
document.querySelector('#import').addEventListener('click', doImport);
