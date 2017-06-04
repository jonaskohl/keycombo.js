function KeyComboJSObject() {
    this.keyConstants = {
        "CANCEL": 3,
        "HELP": 6,
        "BACKSPACE": 8,
        "TAB": 9,
        "CLEAR": 12,
        "RETURN": 13,
        "ENTER": 14,
        "SHIFT": 16,
        "CONTROL": 17,
        "ALT": 18,
        "PAUSE": 19,
        "CAPSLOCK": 20,
        "ESCAPE": 27,
        "SPACE": 32,
        "PAGEUP": 33,
        "PAGEDOWN": 34,
        "END": 35,
        "HOME": 36,
        "ARROWLEFT": 37,
        "ARROWUP": 38,
        "ARROWRIGHT": 39,
        "ARROWDOWN": 40,
        "PRINTSCREEN": 44,
        "INSERT": 45,
        "DELETE": 46,
        "NUM0": 48,
        "NUM1": 49,
        "NUM2": 50,
        "NUM3": 51,
        "NUM4": 52,
        "NUM5": 53,
        "NUM6": 54,
        "NUM7": 55,
        "NUM8": 56,
        "NUM9": 57,
        "SEMICOLON": 59,
        "EQUALS": 61,
        "A": 65,
        "B": 66,
        "C": 67,
        "D": 68,
        "E": 69,
        "F": 70,
        "G": 71,
        "H": 72,
        "I": 73,
        "J": 74,
        "K": 75,
        "L": 76,
        "M": 77,
        "N": 78,
        "O": 79,
        "P": 80,
        "Q": 81,
        "R": 82,
        "S": 83,
        "T": 84,
        "U": 85,
        "V": 86,
        "W": 87,
        "X": 88,
        "Y": 89,
        "Z": 90,
        "CONTEXTMENU": 93,
        "NUMPAD0": 96,
        "NUMPAD1": 97,
        "NUMPAD2": 98,
        "NUMPAD3": 99,
        "NUMPAD4": 100,
        "NUMPAD5": 101,
        "NUMPAD6": 102,
        "NUMPAD7": 103,
        "NUMPAD8": 104,
        "NUMPAD9": 105,
        "MULTIPLY": 106,
        "ADD": 107,
        "SEPARATOR": 108,
        "SUBTRACT": 109,
        "DECIMAL": 110,
        "DIVIDE": 111,
        "F1": 112,
        "F2": 113,
        "F3": 114,
        "F4": 115,
        "F5": 116,
        "F6": 117,
        "F7": 118,
        "F8": 119,
        "F9": 120,
        "F10": 121,
        "F11": 122,
        "F12": 123,
        "F13": 124,
        "F14": 125,
        "F15": 126,
        "F16": 127,
        "F17": 128,
        "F18": 129,
        "F19": 130,
        "F20": 131,
        "F21": 132,
        "F22": 133,
        "F23": 134,
        "F24": 135,
        "NUMLOCK": 144,
        "SCROLLLOCK": 145,
        "COMMA": 188,
        "PERIOD": 190,
        "SLASH": 191,
        "BACKQUOTE": 192,
        "OPENBRACKET": 219,
        "BACKSLASH": 220,
        "CLOSEBRACKET": 221,
        "QUOTE": 222,
        "META": 224
    };
    
    this.getKeyCodeByName = function(name) {
        return keyConstants[name] || null;
    };
    
    this.parseKeyCode = function(comboString) {
        // Modifier keys
        var ctrlRegex = /ctrl/gi,
            altRegex = /alt/gi,
            shiftRegex = /shift/gi,
            superKeyRegex = /(super|win|windows|command|meta)/gi,
        
            ctrl     =     ctrlRegex.exec(comboString) !== null,
            alt      =      altRegex.exec(comboString) !== null,
            shift    =    shiftRegex.exec(comboString) !== null,
            superKey = superKeyRegex.exec(comboString) !== null;
        
        // Key code
        var keyCode = -1,
            newComboString = comboString.replace(/(ctrl|alt|shift|super|win|windows|command|meta)/gi, "")
                                        .replace(/(\s*)/g, "");
        
        for (var key in this.keyConstants) {
            var reg = new RegExp("^(\s*)" + key + "(\s)*$", "gi");
            
            if ( reg.exec(newComboString) !== null )
                keyCode = this.keyConstants[key];
        }
        
        return {
            "ctrl"     : ctrl,
            "alt"      : alt,
            "shift"    : shift,
            "superKey" : superKey,
            "keyCode"  : keyCode
        };
    };
    
    this.testForKeyCombo = function(event, keyReturnObject) {
        return (
            event.ctrlKey   === keyReturnObject.ctrl     &&
            event.altKey    === keyReturnObject.alt      &&
            event.shiftKey  === keyReturnObject.shift    &&
            event.metaKey   === keyReturnObject.superKey &&
            event.which     === keyReturnObject.keyCode
        );
    };
    
    function testCombo(event, combo) {
        var kro = this.parseKeyCode(combo);
        return this.testForKeyCombo(event, kro);
    }
    
    this.attachListener = function(comboString, callback, eventObject) {
        if (typeof eventObject === "undefined") eventObject = window;
        
        eventObject.addEventListener("keydown", function(event) {
            if (testCombo(event, comboString)) {
                callback(event);
            }
        });
    };
}
var KeyComboJS = new KeyComboJSObject();