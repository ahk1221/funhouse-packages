'use strict';

console.log('start');

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

const configFile = require('./config.json');
const config = JSON.stringify(configFile);

function getAllOccupantsInAVehicle(vehicle) {
    var newArray = [];
    jcmp.players.forEach(function(player) {
        if(player.vehicle != undefined) {
            if(player.vehicle.networkId === vehicle.networkId) {
                newArray.push(player);
            }
        }
    }, this);

    return newArray;
}

jcmp.events.AddRemoteCallable('radio_station_set', (player, station) => {
    if(player.vehicle !== undefined) {
        player.vehicle.radioStation = station;

        var occupants = getAllOccupantsInAVehicle(player.vehicle);

        occupants.forEach(function(element) {
            jcmp.events.CallRemote('set_radio_station', element, station);
        }, this);
    }
});

jcmp.events.AddRemoteCallable('send_file_radio', (player) => {
    jcmp.events.CallRemote('recieve_file_radio', player, config);
});

jcmp.events.AddRemoteCallable('send_message_radio', (player, message) => {
    freeroam.chat.broadcast(message, freeroam.config.colours.green);
});

jcmp.events.Add('PlayerVehicleEntered', (player, vehicle, seatIndex) => {
    jcmp.events.CallRemote('set_player_in_vehicle_radio', player, true);
    if(vehicle.radioStation !== undefined) {
        jcmp.events.CallRemote('set_radio_station', player, vehicle.radioStation);
    }
});

jcmp.events.Add('PlayerVehicleExited', (player, vehicle, seatIndex) => {
    jcmp.events.CallRemote('set_player_in_vehicle_radio', player, false);
});

console.log('end');