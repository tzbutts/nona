/*
    developed by tzbutts for all the lovely nonas <3
    it may have to be updated if the dreamwidth html/css changes
*/

var elements, i, j, k, ch, title, content, newElem;

// creates and returns a placeholder element
function createPlaceholder(blockedItems) {
	var newElem = document.createElement("div");
	newElem.style.setProperty("width", "100%");
	newElem.style.setProperty("background-color", "#60A0C0");
	newElem.style.setProperty("color", "#000000");
	newElem.style.setProperty("border", "5px #336699 double");
	newElem.style.setProperty("cursor", "pointer");
	
	newElem.appendChild(document.createTextNode("Comment blocked for: " + blockedItems + "."));
	newElem.appendChild(document.createElement("br"));
	newElem.appendChild(document.createTextNode("To show comment, click this placeholder."));
	
	return newElem;
}

function checkText(settings, blocker, text) {
	// see if the text contains the blocker
	var k = text.toLowerCase().indexOf(blocker.toLowerCase());
	
	// if it's found
	while(k != -1) {
		// check the "whole words only" property
		if(settings["whole_words_only"]) {
			if(k > 0) {
				// check the character before; if alphanumeric, skip
				var ch = text[k - 1];
				if((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') || (ch >= '0' && ch <= '9')) {
					k = text.toLowerCase().indexOf(blocker.toLowerCase(), k + 1);
					continue;
				}
			}
			if(k + blocker.length < text.length) {
				// check the character after; if alphanumeric, skip
				var ch = content.innerHTML[k + blocker.length];
				if((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') || (ch >= '0' && ch <= '9')) {
					k = text.toLowerCase().indexOf(blocker.toLowerCase(), k + 1);
					continue;
				}
			}
		}
		
		return true;
	}
	
	return false;
}

// find whether or not the comment should be blocked, and do placeholder if so
function checkComment(settings, title, content) {
	var blocked = false;
	var blockedItems = null;
	var blockers = settings["blockers"];
	
	var titleInvisible = title.className && title.className.indexOf("invisible") != -1;
	
	// check all blockers
	for(j = 0; j < blockers.length; j++) {
		if(checkText(settings, blockers[j], content.innerHTML) ||
				(settings["include_title"] && !titleInvisible &&
						checkText(settings, blockers[j], title.innerHTML))) {
			// this comment will be blocked
			blocked = true;
			
			// keep track of which items did it
			if(blockedItems == null) {
				blockedItems = blockers[j].toLowerCase();
			} else {
				blockedItems += ", " + blockers[j].toLowerCase();
			}
		}
	}
	
	if(blocked) {
		//title.appendChild(document.createTextNode(" [BLOCKED]"));
		
		// create the placeholder element
		newElem = createPlaceholder(blockedItems);
		
		content.parentNode.appendChild(newElem);
		
		// hide the comment
		content.style.setProperty("display", "none");
		
		// un-hide the comment when the placeholder is clicked
		newElem.onclick = function() {
			content.style.removeProperty("display");
			this.style.setProperty("display", "none");
		}
	}
}

// checks all comments for blockers starting at the given root element
function checkBlockers(settings, rootElement) {
	if(settings["block"]) {
		// get all comments
		elements = getElementsByClassName("comment", "div", rootElement);
		
		for(i = 0; i < elements.length; i++) {
			// get the title element
			title = getElementsByClassName("comment-title", "h4", elements[i]);
			if(title == null || title.length < 1) {
				continue;
			}
			title = title[0];
			if(title.children.length > 0) {
				title = title.children[0];
			}
			
			// get the content element
			content = getElementsByClassName("comment-content", "div", elements[i]);
			if(content == null || content.length < 1) {
				continue;
			}
			content = content[0];
			
			// check it
			checkComment(settings, title, content);
		}
	}
}

// kick everything off by getting the current settings from the background process
// once we've gotten the settings, kick off the work to do blocking appropriately
chrome.runtime.sendMessage({method: "getSettings"}, function(response) {
	var settings = JSON.parse(response.data);
	//console.log(settings);
	
	checkBlockers(settings, document.body);

	if(settings["block"]) {
		// create an observer instance
		observer = new MutationObserver(function(mutations) {
			mutations.forEach(function(mutation) {
		    for(var j = 0; j < mutation.addedNodes.length; j++) {
		    	var node = mutation.addedNodes[j];
		    	if(node.className && node.className.indexOf("poster-anonymous") != -1) {
		    		checkBlockers(settings, node);
		    	}
		    }
			});    
		});
		 
		// pass in the target node, as well as the observer options
		observer.observe(document.body, { childList: true, subtree: true });
		 
		// later, you can stop observing
		//observer.disconnect();
	}
});