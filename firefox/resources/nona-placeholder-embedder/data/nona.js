/*
    developed by tzbutts for all the lovely nonas <3
    it may have to be updated if the dreamwidth html/css changes
*/

var elements, i, src, images, image, newElem, observer;

var replacePlaceholder = function(rootDocument) {

  // get all <a class="ljimgplaceholder"> elements
  elements = getElementsByClassName("ljimgplaceholder", "a", rootDocument);

  for(i = 0; i < elements.length; i++) {
    // get the image source it's linking to
    src = elements[i].getAttribute("href");
    if(src != null) {
      // get the actual placeholder image
      images = elements[i].getElementsByTagName("img");
      if(images.length >= 1) {
        image = images[0];

        // unset the width and height, and set the source
        image.setAttribute('width', null);
        image.setAttribute('height', null);
        image.setAttribute('src', src);
            
        // add some text beforehand so we know it was replaced
        newElem = document.createElement('b');
        newElem.innerHTML = "Nona embedded image:";
        elements[i].insertBefore(newElem, image);
        elements[i].insertBefore(document.createElement('br'), image);
      }
    }
    
    // remove ljimgplaceholder from class
  }
  
}

replacePlaceholder(document.body);

// create an observer instance
observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    for(var j = 0; j < mutation.addedNodes.length; j++) {
      var node = mutation.addedNodes[j];
      if(node.className && node.className.indexOf("poster-anonymous") != -1) {
        replacePlaceholder(node);
      }
    }
  });    
});
 
// pass in the target node, as well as the observer options
observer.observe(document.body, { childList: true, subtree: true });
 
// later, you can stop observing
//observer.disconnect();
