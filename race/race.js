'use strict';

var fs = require('fs');
var path = require('path');

class Race {
    constructor(mapData, playerList) {
        this.setup(mapData, playerList);
    }

    setup(mapData, playerList) {
        this.mapFile = JSON.parse(mapData);
        this.playerList = playerList;
        this.playersFinished = [];

        for (var i = 0; i < this.playerList.length; i++) {
            var player = this.playerList[i];
            jcmp.events.CallRemote('handle_checkpoints', player, mapData);

            var spawnLoc = this.mapFile.spawn_locations[i];
            var vehicle = new Vehicle(4225384683, new Vector3f(spawnLoc.positionX, spawnLoc.positionY, spawnLoc.positionZ), new Vector3f(spawnLoc.rotationX, spawnLoc.rotationY, spawnLoc.rotationZ));
            vehicle.dimension = player.dimension;
            vehicle.SetOccupant(0, player);
        }

        jcmp.events.AddRemoteCallable('race/last-checkpoint-entered', player => {
            if(this.playerWon === undefined) {
                this.playerWon = player;
            }
            this.playersFinished.push(player);
            player.finishingPosition = this.playersFinished.indexOf(player) + 1; //so the first player's index is 0, but adding one = 1

            if(this.playersFinished.length === this.playerList.length) {
                this.playerList.forEach(function(player) {

                    this.playersFinished.forEach(function(playerFinished) {
                        freeroam.chat.send(player, `${playerFinished.name} at position ${playerFinished.finishingPosition}.`, freeroam.config.colours.connection);
                    }, this);
                
                }, this);

                setInterval(() => {
                    this.playerList.forEach((player) => {this.leavePlayer(player);}, this);
                }, 5000);
            }
        });
    }

    isPlayerInRace(player) {
        var isPlayerInRaceR = false;
        this.playerList.forEach(function(element) {
            if(element.networkId === player.networkId) {
                isPlayerInRaceR = true;
            }
        }, this);

        return isPlayerInRaceR;
    }

    leavePlayer(player) {
        this.playerList.splice(this.playerList.indexOf(player), 1);
        if(player.vehicle !== undefined)
            player.vehicle.Destroy();

        player.dimension = 0;

        jcmp.events.CallRemote('race/remove_checkpoints', player);
    }
}

module.exports = Race;