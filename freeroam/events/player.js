'use strict';

const util = require('../gm/utility');
const teleportLocations = require('../gm/defaultTeleports');
const spawnLocations = teleportLocations.map(loc => {
    return new Vector3f(loc.position.x, loc.position.y + 400, loc.position.z);
});

jcmp.events.Add("PlayerCreated", player => {
    player.escapedNametagName = player.name.replace(/</g, '&lt;').replace(/>/g, '&gt;').substring(0, 40);
    console.log(`${player.escapedNametagName} has joined.`);
    freeroam.chat.broadcast(`** ${player.escapedNametagName} has joined.`, freeroam.config.colours.connection);

    const colour = freeroam.colours.randomColor();
    player.freeroam = {
        colour: colour,
        colour_rgb: freeroam.utils.hexToRGB(colour),
        kills: 0,
        deaths: 0,
        custom_time_set: false,
        vehicle_nitro_toggled: false,
        vehicle_turbojump_toggled: false
    };

    player.group = null;
    player.groupInvite = null;
    player.adminStar = freeroam.utils.isAdmin(player);

    const data = {
        id: player.networkId,
        name: player.escapedNametagName,
        colour: player.freeroam.colour,
        isAdmin: freeroam.utils.isAdmin(player),
    };

    if(player.isNicked === true) {
        data.name = player.nick;
    }

    jcmp.events.CallRemote("freeroam_player_created", null, JSON.stringify(data));
});

jcmp.events.Add("PlayerDestroyed", player => {
    console.log(`${player.escapedNametagName} has left.`);
    freeroam.chat.broadcast(`** ${player.escapedNametagName} has left.`, freeroam.config.colours.connection);

    if (typeof player.spawnedVehicle !== 'undefined') {
        player.spawnedVehicle.Destroy();
    }

    freeroam.groupManager.handlePlayerLeave(player);

    jcmp.events.CallRemote("freeroam_player_destroyed", null, player.networkId);
});

function randomSpawn(baseVec, radius) {
    const half = radius / 2;
    return new Vector3f(baseVec.x + freeroam.utils.random(-half, half), baseVec.y, baseVec.z + freeroam.utils.random(-half, half));
}

jcmp.events.Add("PlayerReady", (player) => {
    player.escapedNametagName = player.name.replace(/</g, '&lt;').replace(/>/g, '&gt;').substring(0, 40);
    player.respawnPosition = randomSpawn(util.randomArray(spawnLocations), 900);
    jcmp.events.CallRemote('freeroam_set_weather', player, freeroam.config.world.weather);
    freeroam.timeManager.updatePlayer(player);
    player.Respawn();
});

jcmp.events.Add("PlayerDeath", (player, killer, reason) => {
  let killer_data;
  let death_message = '';
  if (typeof killer !== 'undefined' && killer !== null) {
    if (killer.networkId === player.networkId) {
      death_message = 'killed themselves';
      jcmp.events.CallRemote("freeroam_deathui_show", player);
    } else {
      if (typeof killer.freeroam !== 'undefined') {
        if (killer.freeroam.passiveMode && !freeroam.passiveModeBans.has(killer.client.steamId)) {
          if (killer.freeroam.passiveModeKills >= 3) {
            const steamId = killer.client.steamId;
            freeroam.passiveModeBans.add(steamId);
            killer.freeroam.passiveModeKills = 0;
            killer.freeroam.passiveMode = false;
            killer.invulnerable = false;

            // reset him from the vehicle
            if (player.vehicle) {
              player.vehicle.driver = null;
            }

            var name = killer.escapedNametagName;
            if(killer.isNicked === true) {
                name = killer.nick;
            }

            freeroam.chat.broadcast(`${name} has been kicked out of passive Mode for killing other players.`, freeroam.config.colours.red);
            setTimeout(() => {
              freeroam.passiveModeBans.delete(steamId);
              freeroam.chat.send(killer, 'You can now go back to passive mode.', freeroam.config.colours.green);
            }, 600000);
          }
          freeroam.chat.send(killer, `<h2>Do not kill players in passive mode. Warning ${++killer.freeroam.passiveModeKills}/3</h2>`, freeroam.config.colours.red);
        }
      }
      if (typeof killer.escapedNametagName !== 'undefined') {
        killer.freeroam.kills++;

        death_message = freeroam.utils.randomArray(freeroam.config.death_reasons);
        if(killer.isNicked === true) {
            jcmp.events.CallRemote("freeroam_deathui_show", player, killer.nick, death_message);
        } else {
            jcmp.events.CallRemote("freeroam_deathui_show", player, killer.escapedNametagName, death_message);
        }

        killer_data = {
          networkId: killer.networkId,
          kills: killer.freeroam.kills,
          deaths: killer.freeroam.deaths
        };
      } else {
        death_message = 'was squashed';
        jcmp.events.CallRemote("freeroam_deathui_show", player);
      }
    }
  } else {
    death_message = 'died';
    jcmp.events.CallRemote("freeroam_deathui_show", player);
  }

  player.freeroam.deaths++;
  const data = {
    player: {
      networkId: player.networkId,
      kills: player.freeroam.kills,
      deaths: player.freeroam.deaths
    },
    killer: killer_data,
    death_reason: death_message
  };
  jcmp.events.CallRemote("freeroam_player_death", null, JSON.stringify(data));

  freeroam.chat.send(player, 'You will be respawned where you died. If you get stuck, use /respawn to spawn at a random position again.', freeroam.config.colours.purple);
  const pos = player.position;
  const done = freeroam.workarounds.watchPlayer(player, setTimeout(() => {
    done();
    player.respawnPosition = pos;
    player.Respawn();
    jcmp.events.CallRemote("freeroam_deathui_hide", player);
  }, 4000));
});

jcmp.events.Add("PlayerVehicleEntered", (player, vehicle, seat) => {
    if (seat === 0) {
        vehicle.nitroEnabled = player.freeroam.vehicle_nitro_toggled;
        vehicle.turboJumpEnabled = player.freeroam.vehicle_turbojump_toggled;
    }
});

jcmp.events.Add("PlayerVehicleSeatChange", (player, vehicle, seat, oldseat) => {
    if (seat === 0) {
        vehicle.nitroEnabled = player.freeroam.vehicle_nitro_toggled;
        vehicle.turboJumpEnabled = player.freeroam.vehicle_turbojump_toggled;
    }
});

jcmp.events.AddRemoteCallable("freeroam_player_spawning", player => {
    // enable invulnerability
    player.invulnerable = true;
});

jcmp.events.AddRemoteCallable("freeroam_player_spawned", player => {
    // if the player isn't in passive mode or is a pineapple, let them know spawn protection ends..
    if (!player.freeroam.passiveMode)
        freeroam.chat.send(player, 'Your spawn protection will end in 5 seconds.', freeroam.config.colours.purple);

    const done = freeroam.workarounds.watchPlayer(player, setTimeout(() => {
        done();
        jcmp.events.CallRemote('freeroam_spawn_protect_done', player);
        player.invulnerable = player.freeroam.passiveMode;
    }, 5000));
})
