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
	for(var i = 0; i < divElem.children.length; i += 2) {
		var val = divElem.children[i].value;
		// if something's been entered in, add it to the list
		if(val && 0 !== val.length) {
			values[count] = val;
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
	addMoreBlockerFields(name, divElem, divElem.children.length / 2, 5);
}

// adds more blocker fields to the given div element
function addMoreBlockerFields(name, divElem, startIndex, numToAdd) {
	for(var i = 0; i < numToAdd; i++) {
		var elem = document.createElement("input");
		elem.setAttribute("name", name);
		elem.setAttribute("id", "opt_" + name + "_" + (startIndex + i));
		divElem.appendChild(elem);
		divElem.appendChild(document.createElement("br"));
	}
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
	while(Math.ceil((val.length + 1) / 5) * 5 > divElem.children.length / 2) {
		addMoreBlockerFields(name, divElem, divElem.children.length / 2, 5);
	}
	
	// fill the slots
	for(var i = 0; i < val.length; i++) {
		divElem.children[i * 2].setAttribute("value", val[i]);
	}
}

// restore all settings from local storage / default settings to the page
function restoreSettings() {
	restoreBoolSetting("block");
	restoreBoolSetting("whole_words_only");
	restoreBoolSetting("include_title");
	
	restoreBlockers("blockers");
}


// HTML stuff

// when the options page is loaded, restore the settings
document.addEventListener('DOMContentLoaded', restoreSettings);

//connect the add link to addMoreBlockerFieldsToEnd()
document.querySelector('#add_more_blockers').addEventListener('click', addMoreBlockerFieldsToEnd);

// connect the save button to saveSettings()
document.querySelector('#save').addEventListener('click', saveSettings);
