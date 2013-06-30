This source contains:
* data/driver.js: main code to get options and do the work
* data/getElementsByClassName-1.0.1.js: a third-party javascript library
* data/nona.js: the primary part of the extension
* lib/main.js: Firefox's entry point
* icon.png: package icon
* package.json: to tell Firefox how to load the extension
* README.md: this file

To install the extension from source:
1. Download the add-on sdk:
   https://addons.mozilla.org/en-Us/developers/builder
2. Follow their instructions to get the environment up and running (it's sort
   of a pain).
3. Activate the sdk and do "cfx xpi".
4. Drag-and-drop the .xpi file onto Firefox.
5. ouallah
