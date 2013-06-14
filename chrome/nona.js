/*
    developed by tzbutts for all the lovely nonas <3
    it may have to be updated if the dreamwidth html/css changes
*/

var elements, i, src, images, image, newElem;

// get all <a class="ljimgplaceholder"> elements
elements = getElementsByClassName("ljimgplaceholder", "a", document);

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
}
