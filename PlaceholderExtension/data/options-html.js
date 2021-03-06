/*
 * developed by tzbutts
 */

function saveEnumSetting(name, enumVar) {
	var elem = document.getElementById("opt_" + name);
	for(var i = 0; i < elem.children.length; i++) {
		var child = elem.children[i];
		if(child.tagName && child.tagName.toLowerCase() == "input") {
			if(child.checked) {
				for(var key in enumVar) {
					if(key == child.value) {
						localStorage[name] = JSON.stringify(key);
						break;
					}
				}
			}
		}
	}
}

function saveBoolSetting(name) {
	var elem = document.getElementById("opt_" + name);
	localStorage[name] = JSON.stringify(elem.checked);
}

// function to save all settings currently on the page
function saveSettings() {
	saveEnumSetting("text", TEXT);
	
	saveBoolSetting("ignore_statcounter");
	
	var elem = document.getElementById("message");
	elem.innerHTML = "Options saved!";
	setTimeout(function() {
	    elem.innerHTML = "";
	}, 1500);
}

function restoreEnumSetting(name, enumVar) {
	var val = defaultSettings[name];
	if(name in localStorage) {
		val = JSON.parse(localStorage[name]);
	}
	
	var elem = document.getElementById("opt_" + name);
	
	for(key in enumVar) {
		var input = document.createElement("input");
		input.setAttribute("value", key);
		input.setAttribute("name", name);
		input.setAttribute("type", "radio");
		input.setAttribute("id", "opt_" + name + "_" + key);
		
		if(val == key) {
			input.checked = true;
		}
		
		elem.appendChild(input);
		
		var label = document.createElement("label");
		label.setAttribute("for", input.id);
		label.innerHTML = enumVar[key]["display"];
		elem.appendChild(label);
		
		elem.appendChild(document.createElement("br"));
	}
}

//function to restore a bool setting to a checkbox
function restoreBoolSetting(name) {
	var val = defaultSettings[name];
	if(name in localStorage) {
		val = JSON.parse(localStorage[name]);
	}
	
	var elem = document.getElementById("opt_" + name);
	elem.checked = val;
}

// restore all settings from local storage / default settings to the page
function restoreSettings() {
	restoreEnumSetting("text", TEXT);
	restoreBoolSetting("ignore_statcounter");
}


// HTML stuff

// when the options page is loaded, restore the settings
document.addEventListener('DOMContentLoaded', restoreSettings);

// connect the save button to saveSettings()
document.querySelector('#save').addEventListener('click', saveSettings);

