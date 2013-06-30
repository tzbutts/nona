/*
    developed by tzbutts for all the lovely nonas <3
    it may have to be updated if the dreamwidth html/css changes
*/

var opt_replacePlaceholders = true;
var opt_showLabel = true;

function replacePlaceholder(settings, rootDocument) {
	if(opt_replacePlaceholders) {
		// get all <a class="ljimgplaceholder"> elements
		var elements = getElementsByClassName("ljimgplaceholder", "a", rootDocument);

		for(var i = 0; i < elements.length; i++) {
			// get the image source it's linking to
		    var src = elements[i].getAttribute("href");
		    if(src != null) {
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
}

function addExpandListener(settings) {
	if(opt_replacePlaceholders) {
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
}
