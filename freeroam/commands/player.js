'use strict';

function randomSpawn(baseVec, radius) {
  const half = radius / 2;
  return new Vector3f(baseVec.x + freeroam.utils.random(-half, half),
    baseVec.y,
    baseVec.z + freeroam.utils.random(-half, half));
}

module.exports = ({ Command, manager }) => {
  manager.category('player', 'commands that directly affect you')
    .add(new Command('suicide')
      .description('kills you')
      .handler(player => {
        player.health = 0;
        freeroam.chat.send(player, 'sleep well.', freeroam.config.colours.green);
    }))

    .add(new Command('passive')
      .description('enables or disables the passive mode (no weapons allowed here!)')
      .handler(player => {
        if (typeof player.freeroam.passiveMode === 'undefined') {
          player.freeroam.passiveMode = false;
          player.freeroam.passiveModeKills = 0;
        }

        if (freeroam.passiveModeBans.has(player.client.steamId)) {
          freeroam.chat.send(player, 'You are banned from going to the passive mode. Try again later.', freeroam.config.colours.red);
          return;
        }

        player.freeroam.passiveMode = !player.freeroam.passiveMode;

        if (player.freeroam.passiveMode) {
          var playerName = player.escapedNametagName;
          if(player.isNicked === true) {
            playerName = player.nick;
          }
          freeroam.chat.broadcast(`${playerName} went to passive mode (/passive)`, freeroam.config.colours.orange);
          player.invulnerable = true;

          player.weapons.forEach(w => {
            w.magazineAmmo = -1;
            w.reserveAmmo = -1;
          });
        } else {
          freeroam.chat.broadcast(`${player.escapedNametagName} left passive mode (/passive)`, freeroam.config.colours.orange);
          player.invulnerable = false;
        }
      }))
	
    .add(new Command('respawn')
      .description('respawns you at a random position')
      .handler(player => {
        player.respawnPosition = randomSpawn(new Vector3f(3604.17, 1343.61, 1178.84), 900);
        player.Respawn();
        freeroam.chat.send(player, 'Respawning you at a random position.', freeroam.config.colours.purple);
    }));
};
