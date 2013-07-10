/*
    developed by tzbutts for all the lovely nonas <3
    it may have to be updated if the dreamwidth html/css changes
*/

// default settings
var defaultSettings = {
	"whole_words_only": true,
	"include_title": true,
	"blockers": [{"phrase" : "poop", "hidden": false},
	             {"phrase" : "pee", "hidden" : false}],
	"show_blockers": true,
	"placeholder_background": "#A9D0F5", //"#60A0C0");
	"placeholder_border": "5px double #336699",
	"placeholder_text": "#000000",
	
	"konami": true
};

// creates and returns a placeholder element
function createPlaceholder(settings, blockedItems) {
	var newElem = document.createElement("div");
	//newElem.style.setProperty("width", "100%");
	newElem.style.setProperty("right", "10px");
	newElem.style.setProperty("background-color", settings["placeholder_background"]);
	newElem.style.setProperty("color", settings["placeholder_text"]);
	newElem.style.setProperty("border", settings["placeholder_border"]);
	newElem.style.setProperty("cursor", "pointer");
	newElem.style.setProperty("padding", "3px");
	
	if(settings["show_blockers"]) {
		newElem.appendChild(document.createTextNode("Comment blocked for: " + blockedItems + "."));
	} else {
		newElem.appendChild(document.createTextNode("Comment has been blocked."));
	}
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
				var ch = text[k + blocker.length];
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

function getCommentText(comment) {
	// strip out those annoying <wbr>s
	for(var i = 0; i < comment.children.length; i++) {
		if(comment.children[i].tagName.toLowerCase() == "wbr") {
			comment.removeChild(comment.children[i]);
			i--;
		}
	}
	
	return comment.innerHTML;
}

// find whether or not the comment should be blocked, and do placeholder if so
function checkComment(settings, title, content) {
	var blocked = false;
	var blockedItems = null;
	var blockers = settings["blockers"];
	
	var titleInvisible = title.className && title.className.indexOf("invisible") != -1;
	
	var contentText = getCommentText(content);
	
	// check all blockers
	for(var j = 0; j < blockers.length; j++) {
		var hidden = blockers[j]["hidden"];
		var phrase = blockers[j]["phrase"];
		
		if(checkText(settings, phrase, contentText) ||
				(settings["include_title"] && !titleInvisible &&
						checkText(settings, phrase, title.innerHTML))) {
			// this comment will be blocked
			blocked = true;
			
			// keep track of which items did it
			var notif = phrase.toLowerCase();
			if(hidden) notif = notif[0] + Array(notif.length).join("*");
			if(blockedItems == null) {
				blockedItems = notif;
			} else {
				blockedItems += ", " + notif;
			}
		}
	}
	
	if(blocked) {
		//title.appendChild(document.createTextNode(" [BLOCKED]"));
		
		// create the placeholder element
		var newElem = createPlaceholder(settings, blockedItems);
		
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
	// get all comments
	var elements = getElementsByClassName("comment", "div", rootElement);

	for(var i = 0; i < elements.length; i++) {
		// get the title element
		var title = getElementsByClassName("comment-title", "h4", elements[i]);
		if(title == null || title.length < 1) {
			continue;
		}
		title = title[0];
		if(title.children.length > 0) {
			title = title.children[0];
		}

		// get the content element
		var content = getElementsByClassName("comment-content", "div", elements[i]);
		if(content == null || content.length < 1) {
			continue;
		}
		content = content[0];
		
		// check it
		checkComment(settings, title, content);
	}
}

function addExpandListener(settings) {
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

function shiftyize() {
	var shifty = "http://www.dreamwidth.org/img/talk/sm10_eyes.gif";
	
	// replace all images with shifties!
	var images = document.getElementsByTagName("img");
	for(var i = 0, image; image = images[i]; i++) {
		image.src = shifty;
	}
	
	// add shifties to comment links!
	var links = getElementsByClassName("comment-interaction-links", "ul", document);
	var elem, image;
	for(var i = 0, link; link = links[i]; i++) {
		elem = document.createElement("li");
		image = document.createElement("img");
		image.src = shifty;
		elem.appendChild(image);
		link.insertBefore(elem, link.children[0]);
	}
	
	// woll smoth any usernames
	var users = getElementsByClassName("ljuser", "span", document);
	for(var i = 0, user; user = users[i]; i++) {
		user = user.children[1].children[0];
		var str = "";
		for(var j = 0, char; char = user.innerHTML[j]; j++) {
			if(char == 'a' || char == 'e' || char == 'i' || char == 'u' || char == 'y') {
				str += "o";
			} else {
				str += char;
			}
		}
		user.innerHTML = str;
	}
	
	// nonas gets to be meese now, yay c:
	users = getElementsByClassName("anonymous", "span", document);
	for(var i = 0, user; user = users[i]; i++) {
		user.innerHTML = "(Anonymoose)";
	}
	
	// terezi-ify comment text!
	var comments = getElementsByClassName("comment-content", "div", document);
	for(var i = 0, comment; comment = comments[i]; i++) {
		for(var j = 0, text; text = comment.childNodes[j]; j++) {
			if(text.nodeType === 3) {
				text.textContent = text.textContent
					.toUpperCase()
					.replace(/\.\.\./g, "&hellip;")
					.replace(/[\.']/g, "")
					.replace(/\&hellip;/g, "...")
					.replace(/a/gi, "4")
					.replace(/i/gi, "1")
					.replace(/e/gi, "3");
			}
		}
	}
	
	// finally, some embeds
	var entry = getElementsByClassName("entry-content", "div", document);
	if(entry && entry.length >= 1) {
		entry = entry[0];
		var elem = document.createElement("iframe");
		elem.width = 560;
		elem.height = 315;
		elem.src = "http://www.youtube.com/embed/oHmzOMVBcgU?rel=0&autoplay=1&loop=1";
		elem.frameborder = 0;
		elem.allowfullscreen = true;
		entry.appendChild(elem);
	}
}

function listen(settings) {
	if(settings["konami"]) {
		var easter_egg = new Konami(shiftyize);
	}
}
