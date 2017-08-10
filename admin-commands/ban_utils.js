'use strict';

var fs = require('fs');
var path = require('path');
let config;
fs.readFile(path.join(__dirname, "banlist.json"), 'utf8', (err, data) => {
    if(err) throw err;
    config = JSON.parse(data);
});

module.exports = class BanUtility {
    static isSteamIdBanned(steamId) {
        var boolToReturn = false;
        config.forEach(function(element) {
            if(element.steamId === steamId){
                boolToReturn = true;
            }
        }, this);

        return boolToReturn;
    }

    static isPlayerBanned(player) {
        config.forEach(function(element) {
            if(element.steamId === player.client.steamId){
                return true;
            }
        }, this);

        return false;
    }

    static getBannedPlayerName(steamId) {
        let valueToReturn;
        config.forEach(function(element) {
            if(element.steamId === steamId)
                valueToReturn = element.playerName;
        }, this);

        return valueToReturn;
    }

    static banPlayer(player, reason, duration, adminWhoIsBanning) {
        var UnbanDate = new Date();
        if(duration === "") {
            UnbanDate = "perm";
        } else {
            var typeOfDuration = duration.slice(-1);
            switch(typeOfDuration) {
                case "m":  
                var banDuration = duration.substring(0, duration.length-1);
                UnbanDate.setMinutes(UnbanDate.getMinutes() + parseInt(banDuration));
                break;

                case "h":
                var banDuration = duration.substring(0, duration.length-1);
                UnbanDate.setHours(UnbanDate.getHours() + parseInt(banDuration));
                break;

                case "d":
                var banDuration = duration.substring(0, duration.length-1);
                UnbanDate.setDate(UnbanDate.getDate() + parseInt(banDuration));
                break;

                default:
                freeroam.chat.send(adminWhoIsBanning, "Please enter a correct duration!", freeroam.config.colours.connection);
                return;
                break;
            }
        }

        config.push(
            {
                "playerName": player.name,
                "steamId": player.client.steamId,
                "reason": reason,
                "unbanDate": UnbanDate
            }
        );

        fs.writeFile(path.join(__dirname, "banlist.json"), JSON.stringify(config), (err) => {
            if(err) throw err;
            console.log('The file has been saved!');
        });

        var timeTillUnban;

        var today = new Date();
        if(UnbanDate === 'perm') {
            timeTillUnban = 'perm';
        } else {
            var minutes = UnbanDate.getMinutes() - today.getMinutes();
            timeTillUnban = "YOU WILL BE UNBANNED IN " + minutes + " MINUTES.";
            if(minutes > 60) {
                var hours = UnbanDate.getHours() - today.getHours();
                timeTillUnban = "YOU WILL BE UNBANNED IN " + hours + " HOURS.";
                if(hours > 24) {
                    var days = UnbanDate.getDate() - today.getDate();
                    timeTillUnban = "YOU WILL BE UNBANNED IN " + days + " DAYS.";
                }
            }
        }

        jcmp.events.CallRemote('show_ban_screen', player, timeTillUnban, reason);
    }

    static unbanPlayer(steamId) {
        config.forEach(function(element) {
            if(element.steamId === steamId) {
                config.splice(config.indexOf(element), 1);
            }
        }, this);

        fs.writeFile(path.join(__dirname, "banlist.json"), JSON.stringify(config), (err) => {
            if(err) throw err;
            console.log('The file has been saved!');
        });
    }

    static getBannedPlayer(idOrName) {
        let id = parseInt(idOrName);
        let steamIdToReturn;

        if(isNaN(id)) {
            config.forEach(function(element) {
                var name = element.playerName.toLowerCase();
                if(name === idOrName.toLowerCase())
                    steamIdToReturn = element.steamId;
                else {
                    var lowerCaseIdOrName = idOrName.toLowerCase();
                    var isNameContained = element.playerName.toLowerCase().indexOf(lowerCaseIdOrName) !== -1;
                    if(isNameContained) {
                        steamIdToReturn = element.steamId;
                    }
                }
            }, this);
        } else {
            config.forEach(function(element) {
                if(element.steamId === id)
                    steamIdToReturn = element.steamId;
            }, this);
        }

        return steamIdToReturn;
    }

    static whenPlayerJoined(player) {
        config.forEach(function(element) {
            if(element.steamId === player.client.steamId) {
                if(element.unbanDate === 'perm') {     
                    jcmp.events.CallRemote('show_ban_screen', player, 'perm', element.reason);  
                    setTimeout(() => {player.Kick('ban')}, 10000);        
                } else {
                    var today = new Date();
                    var unbanDate = new Date(element.unbanDate);

                    if(today > unbanDate) {
                        jcmp.events.Call('remove_ban', player);
                    } else {
                        var timeTillUnban;
                        var minutes = unbanDate.getMinutes() - today.getMinutes();
                        timeTillUnban = "YOU WILL BE UNBANNED IN " + minutes + " MINUTES.";
                        if(minutes == 0) {
                            var hours = unbanDate.getHours() - today.getHours();
                            timeTillUnban = "YOU WILL BE UNBANNED IN " + hours + " HOURS.";
                            if(hours == 0) {
                                var days = unbanDate.getDate() - today.getDate();
                                timeTillUnban = "YOU WILL BE UNBANNED IN " + days + " DAYS.";
                            }
                        }            

                        jcmp.events.CallRemote('show_ban_screen', player, timeTillUnban, element.reason);   
                        setTimeout(() => {player.Kick('ban')}, 10000);                             
                    }
                }
            }
        }, this);
    }
};