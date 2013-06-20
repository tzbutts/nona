/*
 * developed by tzbutts
 */

// when the options page is loaded, restore the settings
document.addEventListener('DOMContentLoaded', restoreSettings);

// connect the save button to saveSettings()
document.querySelector('#save').addEventListener('click', saveSettings);

// connect the add link to addMoreBlockerFieldsToEnd()
document.querySelector('#add_more_blockers').addEventListener('click', addMoreBlockerFieldsToEnd);
