var theKeyCombo = "";

for (var key in KeyComboJS.keyConstants) {
    var o = document.createElement("option");
    o.innerText = key.replace(/^NUM([0-9])/g, "$1") + " (" + KeyComboJS.keyConstants[key] + ")";
    o.value = key;
    document.querySelector("#keyCodes").appendChild(o);
}

document.querySelector("#keyCodes").addEventListener("input",  updateKeyCombo);
document.querySelector("#ctrlKey" ).addEventListener("change", updateKeyCombo);
document.querySelector("#altKey"  ).addEventListener("change", updateKeyCombo);
document.querySelector("#shiftKey").addEventListener("change", updateKeyCombo);
document.querySelector("#superKey").addEventListener("change", updateKeyCombo);

attachEventListener();

function updateKeyCombo() {
    theKeyCombo =
    (document.querySelector("#ctrlKey" ).checked ? "CTRL "  : "") + 
    (document.querySelector("#altKey"  ).checked ? "ALT "   : "") + 
    (document.querySelector("#shiftKey").checked ? "SHIFT " : "") + 
    (document.querySelector("#superKey").checked ? "SUPER " : "") + 
     document.querySelector("#keyCodes").value;
    
    document.querySelector("#keycombo").innerText = theKeyCombo;
    if (theKeyCombo.trim().length < 1) {
        document.querySelector("#keycombo").style.display = "none";
    } else {
        document.querySelector("#keycombo").style.display = "";
    }
}

function attachEventListener() {
    window.addEventListener("keydown", function(event) {
        var keyReturnObject = KeyComboJS.parseKeyCode(theKeyCombo);
        if (KeyComboJS.testForKeyCombo(event, keyReturnObject)) {
            if (document.querySelector("#preventDefault").checked)
                event.preventDefault();
                
            document.querySelector("#isKeyDown").className = "keyIsDown";
            document.querySelector("#isKeyDown").innerText = "Pressed";
        } else {
            document.querySelector("#isKeyDown").className = "";
            document.querySelector("#isKeyDown").innerText = "Not pressed";
        }
    });
    window.addEventListener("keyup", function(event) {
        document.querySelector("#isKeyDown").className = "";
        document.querySelector("#isKeyDown").innerText = "Not pressed";
    });
}