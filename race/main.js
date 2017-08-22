'use strict';

const RaceLobby = require('./lobby.js');

let activeRaces = [];

global.freeroam = {
    commands: jcmp.events.Call('get_command_manager')[0],
    chat: jcmp.events.Call('get_chat')[0],
    config: require('../freeroam/gm/config'),
    utils: require('../freeroam/gm/utility'),
    colours: require('../freeroam/vendor/randomColor'),
    workarounds: require('../freeroam/gm/_workarounds'),
    bans: new Set(),
    passiveModeBans: new Set(),
    timeManager: new (require('../freeroam/gm/timeManager'))(13, 0),
    groupManager: new (require('../freeroam/gm/groupManager'))(),
    poiManager: new (require('../freeroam/gm/poiManager'))()
};

jcmp.events.Add('create_race', (raceName, raceType, playerCreator) => {
    activeRaces.forEach(function(element) {
        if(element.isPlayerInRace(playerCreator)) {
            freeroam.chat.send(playerCreator, 'You are already in a race!', freeroam.config.colours.red);
            return;
        }
    }, this);

    var race = new RaceLobby(1, raceName, raceType, playerCreator);
    freeroam.chat.broadcast(`${playerCreator.escapedNametagName} has created a race named ${raceName}. Use /joinrace ${raceName} to join that race!`, freeroam.config.colours.connection);
    activeRaces.push(race);
});

jcmp.events.Add('join_race', (raceName, player) => {
    activeRaces.forEach(function(element) {
        if(element.isPlayerInRace(player)) {
            freeroam.chat.send(player, 'You are already in a race!', freeroam.config.colours.red);
            return;
        }
    }, this);

    activeRaces.forEach(function(element) {
        if(element.raceName === raceName) {
            element.joinPlayer(player);
        }
    }, this);
});

jcmp.events.Add('leave_race', player => {
    activeRaces.forEach(function(element) {
        if(element.isPlayerInRace) {
            element.leavePlayer(player);
        }
    }, this);
});

freeroam.commands.loadFromDirectory(`${__dirname}/commands`, (f, ...a) => require(f)(...a));