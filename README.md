# keycombo.js

## What is keycombo.js

Keycombo.js is a easy to use JavaScript library, which makes handling key combinations really easy.

## Using keycombo.js

First, include KeyCombo.js in your HTML page like this:

```HTML
<script type="application/javascript" src="path/to/KeyCombo.js"></script>
```
    
Add a keydown event listener on an element (eg. the window or an input). Make sure to pass the event argument to the callback function. Then, in the callback function, you can check for a key combo like this:
```JavaScript
var yourComboString = "CTRL ALT F", // The key combination to check for, not case sensitive
    keyReturnObject = KeyComboJS.parseKeyCode(yourComboString); // Parse the string into an object
if (KeyComboJS.testForKeyCombo(event, keyReturnObject)) { // Check if the key combination is pressed, where "event" is your event variable. Returns either true or false
    // The key combination was pressed
}
```
