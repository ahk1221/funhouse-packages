'use strict';

var fs = require('fs');
var path = require('path');
let config = [];
fs.readFile(path.join(__dirname, 'mutelist.json'), 'utf8', (err, data) => {
    if(err) throw err;
    config = JSON.parse(data);
    console.log('mutelist.json was loaded successfully!');
});

module.exports = class MuteUtils {
    static isSteamIdMuted(steamId) {
        fs.readFile(path.join(__dirname, "mutelist.json"), 'utf8', (err, data) => {
            if(err) throw err;
            config = JSON.parse(data);
        });

        var muted = false;
        config.forEach((element) => {
            console.log(element.steamId + " " + element.playerName)
            if(element.steamId === steamId) {
                muted = true;
            }
        }, this);
        return muted;
    }

    static isPlayerMuted(player) {
        fs.readFile(path.join(__dirname, "mutelist.json"), 'utf8', (err, data) => {
            if(err) throw err;
            config = JSON.parse(data);
        });

        var muted = false;
        config.forEach((element) => {
            console.log(element.steamId + " " + element.playerName);
            if(element.steamId === player.client.steamId) {
                muted = true;
            }
        }, this);
        return muted;
    }

    static getMutedPlayer(idOrName) {
        fs.readFile(path.join(__dirname, "mutelist.json"), 'utf8', (err, data) => {
            if(err) throw err;
            config = JSON.parse(data);
        });

        let id = parseInt(idOrName);
        let steamId;

        if(isNaN(id)) {
            config.forEach(function(element) {
                var name = element.playerName.toLowerCase();
                if(name === idOrName.toLowerCase())
                    steamId = element.steamId;
                else {
                    var isNameContained = element.playerName.indexOf(idOrName) !== -1;
                    if(isNameContained) {
                        steamId = element.steamId;
                    }
                }
            }, this);
        } else {
            config.forEach(function(element) {
                if(element.steamId === id)
                    steamId = element.steamId;
            }, this);
        }

        return steamId;
    }

    static mutePlayer(player, reason, duration, adminWhoIsMuting) {
        fs.readFile(path.join(__dirname, "mutelist.json"), 'utf8', (err, data) => {
            if(err) throw err;
            config = JSON.parse(data);
        });

        var UnmuteDate = new Date();
        if(duration === "") {
            UnmuteDate = "perm";
        } else {
            var typeOfDuration = duration.slice(-1);
            switch(typeOfDuration) {
                case "m":  
                var banDuration = duration.substring(0, duration.length-1);
                UnmuteDate.setMinutes(UnmuteDate.getMinutes() + parseInt(banDuration));
                break;

                case "h":
                var banDuration = duration.substring(0, duration.length-1);
                UnmuteDate.setHours(UnmuteDate.getHours() + parseInt(banDuration));
                break;

                case "d":
                var banDuration = duration.substring(0, duration.length-1);
                UnmuteDate.setDate(UnmuteDate.getDate() + parseInt(banDuration));
                break;

                default:
                freeroam.chat.send(adminWhoIsMuting, "Please enter a correct duration!", freeroam.config.colours.connection);
                return;
                break;        
            }
        }

        config.push({
            "playerName": player.name,
            "steamId": player.client.steamId,
            "reason": reason,
            "unmuteDate": UnmuteDate
        });

        fs.writeFile(path.join(__dirname, "mutelist.json"), JSON.stringify(config), (err) => {
            if(err) throw err;
            console.log('Mute added successfully! Muted: ' + player.name + ". Reason: " + reason);
        });
    }

    static unmutePlayer(steamId) {
        fs.readFile(path.join(__dirname, "mutelist.json"), 'utf8', (err, data) => {
            if(err) throw err;
            config = JSON.parse(data);
        });

        config.forEach(function(element) {
            if(element.steamId === steamId) {
                config.splice(config.indexOf(element), 1);
            }
        }, this);

        fs.writeFile(path.join(__dirname, "mutelist.json"), JSON.stringify(config), (err) => {
            if(err) throw err;
            console.log('Unmuted player successfully!');
        });
    }

    static getMutedPlayerName(steamId) {
        fs.readFile(path.join(__dirname, "mutelist.json"), 'utf8', (err, data) => {
            if(err) throw err;
            config = JSON.parse(data);
        });

        let valueToReturn = undefined;
        config.forEach(function(element) {
            if(element.steamId === steamId)
                valueToReturn = element.playerName;
        }, this);

        return valueToReturn;
    }
};