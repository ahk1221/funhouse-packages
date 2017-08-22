'use strict';

var racemaps = ['boomisland'];

module.exports = ({ Command, manager }) => {
    manager.category('race', 'race-related commands')
      .add(new Command('createrace')
       .parameter('race-name', 'string', 'The name of the race. Needs to be different from all the other races!')
       .parameter('race-map', 'string', 'The map/track where you want the race to be. Do /getracemaps to get all the valid names')
       .handler((player, name, map) => {
            jcmp.events.Call('create_race', name, map, player);
        }))
    
      .add(new Command('joinrace')
       .parameter('name', 'string', 'The name of the race you want to join.')
       .handler((player, name) => {
            jcmp.events.Call('join_race', name, player);
       }))

      .add(new Command('leaverace')
       .handler((player) => {
            jcmp.events.Call('leave_race', player);
       }))

      .add(new Command('getracemaps')
       .handler(player => {
            racemaps.forEach(function(element) {
                freeroam.chat.send(player, element, freeroam.config.colours.green);
            }, this);
       }))

      .add(new Command('getposition')
       .handler(player => {
            freeroam.chat.send(player, `X: ${player.vehicle !== undefined ? player.vehicle.position.x : player.position.x} Y: ${player.vehicle !== undefined ? player.vehicle.position.y : player.position.y} Z: ${player.vehicle !== undefined ? player.vehicle.position.z : player.position.z}`, freeroam.config.colours.green);
       }))

      .add(new Command('getrotation')
       .handler(player => {
            freeroam.chat.send(player, `X: ${player.vehicle !== undefined ? player.vehicle.rotation.x : player.rotation.x} Y: ${player.vehicle !== undefined ? player.vehicle.rotation.y : player.rotation.y} Z: ${player.vehicle !== undefined ? player.vehicle.rotation.z : player.rotation.z}`, freeroam.config.colours.green);
       }));
};