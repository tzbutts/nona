PlaceholderExtension README
===========================

This folder contains combined source for both the Firefox and the Chrome
extension.

Files and sources contained are:
* data/background.js: Chrome script to run in background (necessary to send options)
* data/driver.js: script to read options and kick off content script
* data/getElementsByClassName-1.0.1.js: a third-party javascript library
* data/main.js: Firefox's entry point
* data/nona.js: the primary part of extension to replace placeholders
* data/options-html.js: Chrome script to run on options page
* data/options.html: Chrome options page
* img/*.png: a bunch of icons in different sizes
* manifest.json: to tell Chrome how to load the extension
* package.json: to tell Firefox how to load the extension
* README.md: this file


Chrome Instructions
-------------------

To install the extension from source:
1. Open chrome://extensions and turn on the developer mode checkbox in the
   upper right corner.
2. Click the "Load unpacked extension" button and give it the base directory.
3. ouallah
   
To build the .crx from source:
1. Open chrome://extensions and turn on the developer mode checkbox in the
   upper right corner.
2. Click the "Pack extension" button.
   a. Give the base directory for the extension root directory.
   b. If generating package for the first time, it will generate a key.  If
      regenerating after changes, give it the key file that was generated
      before.
3. It will save the .crx and .pem file one directory above the base directory.
4. ouallah

To install the .crx from a file:
1.  Open chrome://extensions.
2.  Drag-and-drop the .crx file onto that tab.
3.  ouallah


Firefox Instructions
--------------------

To test out the extension from source:
1. Download the add-on sdk:
   https://addons.mozilla.org/en-Us/developers/builder
   Follow their instructions to get the environment up and running.
2. Activate the sdk and do "cfx run".
3. ouallah

To build the .xpi from source:
1. Download the add-on sdk:
   https://addons.mozilla.org/en-Us/developers/builder
   Follow their instructions to get the environment up and running.
2. Activate the sdk and do "cfx xpi".
3. ouallah

To install the .xpi from a file:
1.  Open Firefox.
2.  Drag-and-drop the .xpi file onto Firefox.
3.  ouallah
