'use strict';

const utility = require('../gm/utility');
const locations = require('../gm/defaultTeleports');

module.exports = ({ Command, manager }) => {
  locations.forEach(loc => {
    freeroam.poiManager.create(loc.command, 20, `${loc.label} (/tp ${loc.command})`, loc.position);
  });

  manager.category('teleport', 'teleportation commands')
    .add(new Command('marker')
      .description('creates a map marker on your position for 60s that allows other people to teleport there.')
      .parameter('name', 'string', 'marker name', { isTextParameter: true })
      .timeout(60000, true)
      .handler((player, name) => {
        if (freeroam.poiManager.has(name)) {
          freeroam.chat.send(player, 'A marker with that name already exists.', freeroam.config.colours.red);
          return;
        }

        freeroam.chat.send(player, `Marker '${name}' created and will be active for 60 seconds.`, freeroam.config.colours.green);
        freeroam.chat.broadcast(`${player.escapedNametagName} created map marker '${name}'. Use /teleport ${name} to get there!`, freeroam.config.colours.orange);
        freeroam.poiManager.create(name, 20, `${player.escapedNametagName}'s  Marker (/teleport ${name})`, player.position);

        setTimeout(() => {
          freeroam.chat.send(player, `Your marker '${name}' has been removed.`, freeroam.config.colours.orange);
          freeroam.poiManager.destroy(name);
        }, 60000);
      }))

    .add(new Command(['teleport', 'tp'])
      .parameter('name', 'string', 'teleports to a marker')
      .description('teleports you to a map marker', { isTextParameter: true })
      .handler((player, name) => {
        if (!freeroam.poiManager.has(name)) {
          freeroam.chat.send(player, 'This marker does not exist.', freeroam.config.colours.red);
          return;
        }

        freeroam.chat.send(player, `Teleporting you to marker '${name}'`, freeroam.config.colours.green);
        player.position = freeroam.poiManager.get(name).position;
      }))

    .add(new Command('goto')
      .parameter('target', 'string', 'target player (name or part of name)', { isTextParameter: true })
      .description('teleports you to another player using a part of his name')
      .handler((player, target) => {
        const res = freeroam.utils.getPlayerFromNick(target);
        if (res.length === 0 || res.length > 1) {
          freeroam.chat.send(player, 'no / too many matching players!', freeroam.config.colours.red);
          return;
        }

        if (res[0].blockGoto) {
          freeroam.chat.send(player, 'this player disabled teleportation to his position.', freeroam.config.colours.red);
          return;
        }

        freeroam.chat.send(player, `teleporting you to '${res[0].escapedNametagName}'.`, freeroam.config.colours.green);
        player.position = res[0].position;
      }))

    .add(new Command('togglegoto')
      .description('toggles the ability of other players to teleport to your position')
      .handler(player => {
        if (typeof player.blockGoto === 'undefined' || !player.blockGoto) {
          player.blockGoto = true;
          freeroam.chat.send(player, `other players will not be able to teleport to your position.`, freeroam.config.colours.green);
          return;
        }
        player.blockGoto = !player.blockGoto;
        freeroam.chat.send(player, `other players will now be able to teleport to your position again.`, freeroam.config.colours.green);
      }));
};
