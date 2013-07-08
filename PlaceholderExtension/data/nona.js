/*
    developed by tzbutts for all the lovely nonas <3
    it may have to be updated if the dreamwidth html/css changes
*/

// options for text above placeholders
var TEXT = {
	NONE     : { key: "NONE",     display: "None",
		apply : function(parent, image) {
		
		}},
	STD      : { key: "STD",      display: "Nona embedded image:",
		apply : function(parent, image) {
    		var newElem = document.createElement('b');
    		newElem.innerHTML = "Nona embedded image:";
    		parent.insertBefore(newElem, image);
    		parent.insertBefore(document.createElement('br'), image);
		}},
	STD_SIZE : { key: "STD_SIZE", display: "Nona embedded image (WIDTH x HEIGHT):",
		apply : function(parent, image) {
    		var newElem = document.createElement('b');
    		newElem.innerHTML = "Nona embedded image (invalid image size):";
    		parent.insertBefore(newElem, image);
    		parent.insertBefore(document.createElement('br'), image);
    		
			image.onload = function() {
				newElem.innerHTML = "Nona embedded image (" + this.width + " x " + this.height + "):";
			}
		}}
};

// default settings
var defaultSettings = {
	"text": TEXT.STD["key"],
	"ignore_statcounter": true
};

function replacePlaceholder(settings, rootDocument) {
	// get all <a class="ljimgplaceholder"> elements
	var elements = getElementsByClassName("ljimgplaceholder", "a", rootDocument);

	for(var i = 0; i < elements.length; i++) {
		// get the image source it's linking to
		var src = elements[i].getAttribute("href");
		if(src != null) {
			// skip past URLs with "statcounter" in them
			if(settings["ignore_statcounter"]) {
				if(src.toLowerCase().indexOf("statcounter") != -1) {
					continue;
				}
			}
			
			// get the actual placeholder image
			var images = elements[i].getElementsByTagName("img");
			if(images.length >= 1) {
				var image = images[0];

				// unset the width and height, and set the source
				image.removeAttribute('width');
				image.removeAttribute('height');

				// put any text above the image depending on settings
				TEXT[settings["text"]].apply(elements[i], image);

				image.setAttribute('src', src);
			}

			// remove ljimgplaceholder from class so it doesn't get
			// replaced on any subsequent calls?  may not be necessary
			elements[i].className = elements[i].className.replace(/\bljimgplaceholder\b/, '');
		}
	}
}

function addExpandListener(settings) {
	// create an observer instance
	var observer = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {
			for(var j = 0; j < mutation.addedNodes.length; j++) {
				var node = mutation.addedNodes[j];
				if(node.className && node.className.indexOf("poster-anonymous") != -1) {
					replacePlaceholder(settings, node);
				}
			}
		});    
	});

	// pass in the target node, as well as the observer options
	observer.observe(document.body, { childList: true, subtree: true });

	// later, you can stop observing
	//observer.disconnect();
}
