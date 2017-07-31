function displayKeyCode(code) {
    var result = "";
    switch(code) {
        case 8:
            result = "backspace"; 
            break;
            
        case 9:
            result = "tab"; 
            break;
            
        case 13:
            result = "enter"; 
            break;
            
        case 16:
            result = "shift"; 
            break;
            
        case 17:
            result = "ctrl"; 
            break;
            
        case 18:
            result = "alt"; 
            break;
            
        case 19:
            result = "pause/break"; 
            break;
            
        case 20:
            result = "caps lock"; 
            break;
            
        case 27:
            result = "escape"; 
            break;
            
        case 33:
            result = "page up"; 
            break;
            
        case 34:
            result = "page down"; 
            break;
            
        case 35:
            result = "end"; 
            break;
            
        case 36:
            result = "home"; 
            break;
            
        case 37:
            result = "left arrow"; 
            break;
            
        case 38:
            result = "up arrow"; 
            break;
            
        case 39:
            result = "right arrow"; 
            break;
            
        case 40:
            result = "down arrow"; 
            break;
            
        case 45:
            result = "insert"; 
            break;
            
        case 46:
            result = "delete"; 
            break;
            
        case 91:
            result = "left window"; 
            break;
            
        case 92:
            result = "right window"; 
            break;
            
        case 93:
            result = "select key"; 
            break;
            
        case 96:
            result = "numpad 0"; 
            break;
            
        case 97:
            result = "numpad 1"; 
            break;
            
        case 98:
            result = "numpad 2"; 
            break;
            
        case 99:
            result = "numpad 3"; 
            break;
            
        case 100:
            result = "numpad 4"; 
            break;
            
        case 101:
            result = "numpad 5"; 
            break;
            
        case 102:
            result = "numpad 6"; 
            break;
            
        case 103:
            result = "numpad 7"; 
            break;
            
        case 104:
            result = "numpad 8"; 
            break;
            
        case 105:
            result = "numpad 9"; 
            break;
            
        case 106:
            result = "multiply"; 
            break;
            
        case 107:
            result = "add"; 
            break;
            
        case 109:
            result = "subtract"; 
            break;
            
        case 110:
            result = "decimal point"; 
            break;
            
        case 111:
            result = "divide"; 
            break;
            
        case 112:
            result = "F1"; 
            break;
            
        case 113:
            result = "F2"; 
            break;
            
        case 114:
            result = "F3"; 
            break;
            
        case 115:
            result = "F4"; 
            break;
            
        case 116:
            result = "F5"; 
            break;
            
        case 117:
            result = "F6"; 
            break;
            
        case 118:
            result = "F7"; 
            break;
            
        case 119:
            result = "F8"; 
            break;
            
        case 120:
            result = "F9"; 
            break;
            
        case 121:
            result = "F10"; 
            break;
            
        case 122:
            result = "F11"; 
            break;
            
        case 123:
            result = "F12"; 
            break;
            
        case 144:
            result = "num lock"; 
            break;
            
        case 145:
            result = "scroll lock"; 
            break;
            
        case 186:
            result = ";"; 
            break;
            
        case 187:
            result = "="; 
            break;
            
        case 188:
            result = ","; 
            break;
            
        case 189:
            result = "-"; 
            break;
            
        case 190:
            result = "."; 
            break;
            
        case 191:
            result = "/"; 
            break;
            
        case 192:
            result = "`"; 
            break;
            
        case 219:
            result = "["; 
            break;
            
        case 220:
            result = "\\"; 
            break;
            
        case 221:
            result = "]"; 
            break;
            
        case 222:
            result = "'"; 
            break;
            
        case 49:
            result = "1";
            break;
            
        case 50:
            result = "2";
            break;
            
        case 51:
            result = "3";
            break;
            
        case 52:
            result = "4";
            break;
            
        case 53:
            result = "5";
            break;
            
        case 54:
            result = "6";
            break;
            
        case 55:
            result = "7";
            break;
            
        case 56:
            result = "8";
            break;
            
        case 57:
            result = "9";
            break;
            
        case 48:
            result = "0";
            break;
            
        case 81:
            result = "q";
            break;
            
        case 87:
            result = "w";
            break;
            
        case 69:
            result = "e";
            break;
            
        case 82:
            result = "r";
            break;
            
        case 84:
            result = "t";
            break;
            
        case 89:
            result = "y";
            break;
            
        case 85:
            result = "u";
            break;
            
        case 73:
            result = "i";
            break;
            
        case 79:
            result = "o";
            break;
            
        case 80:
            result = "p";
            break;
            
        case 65:
            result = "a";
            break;
            
        case 83:
            result = "s";
            break;
            
        case 68:
            result = "d";
            break;
            
        case 70:
            result = "f";
            break;
            
        case 71:
            result = "g";
            break;
            
        case 72:
            result = "h";
            break;
            
        case 74:
            result = "j";
            break;
            
        case 75:
            result = "k";
            break;
            
        case 76:
            result = "l";
            break;
            
        case 90:
            result = "z";
            break;
            
        case 88:
            result = "x";
            break;
            
        case 67:
            result = "c";
            break;
            
        case 86:
            result = "v";
            break;
            
        case 66:
            result = "b";
            break;
            
        case 78:
            result = "n";
            break;
            
        case 77:
            result = "m";
            break;
            
        default: 
            result = "unknown";
            break;
    }
    return result;
}