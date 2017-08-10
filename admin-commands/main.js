'use strict';

global.freeroam = {
    commands: jcmp.events.Call('get_command_manager')[0],
    chat: jcmp.events.Call('get_chat')[0],
    config: require('../freeroam/gm/config'),
    utils: require('../freeroam/gm/utility'),
    banUtils: require('./ban_utils'),
    muteUtils: require('./mute_utils'),
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

jcmp.events.Add('add_mute', (player, reason, duration, adminWhoIsMuting) => {
    if(freeroam.muteUtils.isPlayerMuted(player)) {
        freeroam.chat.send(adminWhoIsMuting, 'this player is already muted!', freeroam.config.colours.red);
        return;
    }

    freeroam.muteUtils.mutePlayer(player, reason, duration, adminWhoIsMuting);
});

jcmp.events.Add('add_ban', (player, reason, duration, adminWhoIsBanning) => {
    if(freeroam.banUtils.isPlayerBanned(player)) {
        freeroam.chat.send(adminWhoIsBanning, 'this player is already banned!', freeroam.config.colours.red);
        return;
    }

    freeroam.banUtils.banPlayer(player, reason, duration, adminWhoIsBanning);

    setTimeout(() => {player.Kick('banned')}, 5000);
});

jcmp.events.Add('remove_mute_by_id', (steamId) => {
    var isMuted = freeroam.muteUtils.isSteamIdMuted(steamId);
    if(!isMuted) {
        return;
    }

    freeroam.muteUtils.unmutePlayer(steamId);
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

freeroam.utils.loadFilesFromDirectory(`${__dirname}/events`);
freeroam.commands.loadFromDirectory(`${__dirname}/commands`, (f, ...a) => require(f)(...a));