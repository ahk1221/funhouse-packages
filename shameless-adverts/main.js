'use strict';

const configFile = require('./config.json'); 
const chat = jcmp.events.Call('get_chat')[0];
const configColors = require('../freeroam/gm/config');
var interval = 45000; // in milliseconds, so no. of seconds * 1000

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

setInterval(() => {
    var randomMessage = getRandomInt(0, configFile.length - 1);
    var chosenMessage = configFile[randomMessage].message;
    var chosenColor = configFile[randomMessage].color;

    var color;
    switch(chosenColor) {
        case "green":
        color = configColors.colours.green;
        break;

        case "red":
        color = configColors.colours.red;
        break;

        case "purple":
        color = configColors.colours.purple;
        break;

        case "orange":
        color = configColors.colours.orange;
        break;
    }

    chat.broadcast(chosenMessage, color);
}, interval)