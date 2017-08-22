'use strict';

const Race = require('./race');

class RaceLobby {
    constructor(dimension, raceName, raceType, creator) {
        this.dimension = dimension;
        this.mapFile = require(`./maps/${raceType}.json`);
        this.raceName = raceName;
        this.raceType = raceType;
        this.creator = creator;
        this.lobbyPosition = new Vector3f(this.mapFile.lobby_spawn_location.positionX, this.mapFile.lobby_spawn_location.positionY, this.mapFile.lobby_spawn_location.positionZ);
        this.maxPlayers = this.mapFile.spawn_locations.length;
        this.minPlayers = this.mapFile.min_players;
        this.players = [];
        this.raceStarted = false;

        console.log(this.maxPlayers + "");
        console.log(this.minPlayers + "");

        this.joinPlayer(creator);
    }

    joinPlayer(player) {

        if(this.players.length >= this.maxPlayers) {
            freeroam.chat.send(player, 'This lobby is full! You cannot join now!', freeroam.config.colours.red);
            return;
        }

        player.dimension = this.dimension;
        player.position = this.lobbyPosition;
        this.players.push(player);

        if(this.players.length >= this.minPlayers) {
            var countdown = 10;
            var interval = setInterval(() => {
                if(countdown <= 0 && this.raceStarted === false) {
                    this.players.forEach((playerElm) => {
                        freeroam.chat.send(playerElm, `The race has started!`, freeroam.config.colours.connection);
                    });
                    this.race = new Race(JSON.stringify(this.mapFile), this.players);
                    this.raceStarted = true;
                    clearInterval(interval);
                }

                countdown -= 1;
                this.players.forEach(function(element) {
                    freeroam.chat.send(element, `The race will start in ${countdown} seconds`, freeroam.config.colours.connection);
                }, this);
            }, 1000);
        }
    }

    leavePlayer(player) {
        this.players.splice(this.players.indexOf(player), 1);
        if(this.raceStarted) {
            this.race.leavePlayer(player);
        }
    }

    isPlayerInRace(player) {
        var isPlayerInRaceR = false;
        this.players.forEach(function(element) {
            if(element.networkId === player.networkId) {
                isPlayerInRaceR = true;
            }
        }, this);

        return isPlayerInRaceR;
    }
}

module.exports = RaceLobby;