'use strict';

global.freeroam = {
    commands: jcmp.events.Call('get_command_manager')[0],
    chat: jcmp.events.Call('get_chat')[0],
    config: require('../freeroam/gm/config'),
    utils: require('../freeroam/gm/utility'),
    banUtils: require('./ban_utils'),
    colours: require('../freeroam/vendor/randomColor'),
    workarounds: require('../freeroam/gm/_workarounds'),
    bans: new Set(),
    passiveModeBans: new Set(),
    timeManager: new (require('../freeroam/gm/timeManager'))(13, 0),
    groupManager: new (require('../freeroam/gm/groupManager'))(),
    poiManager: new (require('../freeroam/gm/poiManager'))()
};

var fs = require('fs');
var path = require('path');
let config;
fs.readFile(path.join(__dirname, "banlist.json"), 'utf8', (err, data) => {
    if(err) throw err;
    config = JSON.parse(data);
});

jcmp.events.Add('add_ban', (player, reason, duration) => {
    if(freeroam.banUtils.isPlayerBanned(player)) {
        console.log('dud');
        return;
    }

    freeroam.banUtils.banPlayer(player, reason, duration);

    setTimeout(() => {player.Kick('banned')}, 5000);

    console.log(JSON.stringify(config));
});

jcmp.events.Add('remove_ban_by_id', (steamId) => {
    var isBanned = freeroam.banUtils.isSteamIdBanned(steamId);
    if(!isBanned) {
        console.log('you not banned!');
        return; 
    }

    freeroam.banUtils.unbanPlayer(steamId);
});

jcmp.events.Add('remove_ban', (player) => {
    var isBanned = freeroam.banUtils.isPlayerBanned(player);
    if(!isBanned) return;

    freeroam.banUtils.unbanPlayer(player.client.steamId);  
});

jcmp.events.AddRemoteCallable('chat_ready', player => {
    freeroam.chat.send(player, 'Spawning might take a while. Please wait and enjoy the view.', freeroam.config.colours.purple);

    freeroam.banUtils.whenPlayerJoined(player);
});

freeroam.commands.loadFromDirectory(`${__dirname}/commands`, (f, ...a) => require(f)(...a));