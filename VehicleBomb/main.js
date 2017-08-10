'use strict';

var settings = require("./SETTINGS.js");

jcmp.events.Add("PlayerVehicleEntered", (player, v, seat) => {
    jcmp.events.CallRemote("VehicleBomb_PlayerVehicleEntered", player);
    setTimeout(function() {
        if(player.vehicle.networkId != v.networkId) {
            console.log("[VehicleBomb] WHAT THE FUCK?!");
            return;
        }
        if(v.vehicleArmed) {
            if(v.toDetonateAfterAnEntrance) {
                detonate(v);
            } else if(v.useTimer) {
                jcmp.events.CallRemote("VehicleBomb_Timer", player);
            }
        }
    }, 500, player, v, seat);
});

jcmp.events.Add("PlayerVehicleExited", (player, v, seat) => {
    jcmp.events.CallRemote("VehicleBomb_PlayerVehicleExited", player);
});

jcmp.events.AddRemoteCallable("VehicleBomb_DetonateBomb", (player) => {
    if(! player.armedVehicle) {
        jcmp.events.CallRemote("VehicleBomb_NoArmedVehicle", player);
        return;
    }
    
    if(player.armedVehicle.vehicleArmed && player.armedVehicle.useDetonator) {
        jcmp.events.CallRemote("VehicleBomb_DetonateBombOk", player);
        detonate(player.armedVehicle);
    }
});

jcmp.events.AddRemoteCallable("VehicleBomb_GetUsername", (player) => {
    jcmp.events.CallRemote("VehicleBomb_ReturnUsername", player, player.name);
});

jcmp.events.AddRemoteCallable("VehicleBomb_TryToFindBomb", (player) => {
    setTimeout(function() {
        if(rand(0, 100) > 25 && player.vehicle && player.vehicle.vehicleArmed) {
            if(player.vehicle) {
                jcmp.events.CallRemote("VehicleBomb_BombHasBeenFound", player);
            }
        } else {
            jcmp.events.CallRemote("VehicleBomb_BombHasNotBeenFound", player);
        }
    }, rand(1000, 10000), player);
});

jcmp.events.AddRemoteCallable("VehicleBomb_Open", (player) => {
    if(! player.vehicle) {
        jcmp.events.CallRemote("VehicleBomb_OpenNotInVehicle", player);
        return;
    }
    
    if(player.armedVehicle && ! player.armedVehicle.destroyed && player.armedVehicle.health > 0) {
        jcmp.events.CallRemote("VehicleBomb_OpenSomeVehicleAlreadyArmedByYou", player);
        return;
    }
    
    if(player.vehicle.vehicleArmed) {
        jcmp.events.CallRemote("VehicleBomb_OpenThisVehicleAlreadyArmedBySomeone", player);
        return;
    }
    
    jcmp.events.CallRemote("VehicleBomb_OpenOk", player);
});

jcmp.events.AddRemoteCallable("VehicleBomb_DefuseHasBeenFailed", (player) => {
    if(! player.vehicle) {
        return;
    }
    
    if(! player.vehicle.vehicleArmed) {
        return;
    }
    
    detonate(player.vehicle);
    
    jcmp.events.CallRemote("VehicleBomb_StopTimer", player.vehicle.playerDetonator);
});

jcmp.events.AddRemoteCallable("VehicleBomb_BombHasBeenDefused", (player) => {
    if(! player.vehicle || ! player.vehicle.vehicleArmed) {
        return;
    }
    
    defuse(player.vehicle);
    
    jcmp.events.CallRemote("VehicleBomb_StopTimer", player.vehicle.playerDetonator);
});

jcmp.events.AddRemoteCallable("VehicleBomb_SetBomb", (player, data) => {
    if(! player.vehicle) {
        jcmp.events.CallRemote("VehicleBomb_SetBombNotInVehicle", player);
        return;
    }
    if(player.armedVehicle && ! player.armedVehicle.destroyed && player.armedVehicle.health > 0) {
        jcmp.events.CallRemote("VehicleBomb_SetBombSomeVehicleAlreadyArmedByYou", player);
        return;
    }
    
    if(player.vehicle.vehicleArmed) {
        jcmp.events.CallRemote("VehicleBomb_SetBombThisVehicleAlreadyArmedBySomeone", player);
        return;
    }
    data = JSON.parse(data);
    /*
     * types:
     * 0 - vehicle will blow up after sit down in it
     * 1 - timer
     * 2 - remote detonator
     */
    player.vehicle.vehicleArmed = true;
    var v = player.vehicle;
    player.vehicle.playerDetonator = player;
    player.armedVehicle = v;
    switch(data.type) {
        case "sensor":
            player.vehicle.toDetonateAfterAnEntrance = true;
            player.vehicle.useTimer = false;
            player.vehicle.explosionTime = 0;
            player.vehicle.bombTimerInterval = null;
            player.vehicle.useDetonator = false;
            break;
        
        case "timer":
            player.vehicle.toDetonateAfterAnEntrance = false;
            player.vehicle.useTimer = true;
            player.vehicle.explosionTime = (new Date).getTime() + data.timer * 1000;
            player.vehicle.bombTimerInterval = setInterval(function() {
                if((new Date).getTime() + 1000 >= v.explosionTime) {
                    detonate(v);
                    clearInterval(v.bombTimerInterval);
                }
            }, 10, player, v);
            player.vehicle.useDetonator = false;
            break;
        
        case "detonator":
            player.vehicle.toDetonateAfterAnEntrance = false;
            player.vehicle.useTimer = false;
            player.vehicle.explosionTime = 0;
            player.vehicle.bombTimerInterval = null;
            player.vehicle.useDetonator = true;
            break;
        
        default:
            jcmp.events.CallRemote("VehicleBomb_SetBombSomethingWrong", player);
            return;
    }
    
    jcmp.events.CallRemote("VehicleBomb_SetBombOk", player);
});

function detonate(v) {
    if(! v.vehicleArmed) {
        return;
    }
    var oc0 = v.GetOccupant(0),
        oc1 = v.GetOccupant(1);
    
    if(oc0) {
        jcmp.events.CallRemote("VehicleBomb_Detonate", oc0);
    }
    if(oc1) {
        jcmp.events.CallRemote("VehicleBomb_Detonate", oc1);
    }
    //forceKillPlayerIfHasBlownUp
    setTimeout(function() {
        if(settings.forceKillPlayerIfHasBlownUp) {
            // Yes. In one second passengers of transport could escape somewhere. We obtain information about sitting again.
            var oc0 = v.GetOccupant(0),
                oc1 = v.GetOccupant(1);
            
            if(oc0) {
                oc0.health = 0;
            }
            
            if(oc1) {
                oc1.health = 0;
            }
        }
        if(settings.jumpVehicleOnOneMeter) {
            /*setTimeout(function() {
                v.position.y = v.position.y + 10;
            }, 30, v);*/
            v.position = new Vector3f(v.position.x, v.position.y + 1, v.position.z);
        }
        v.health = 0;
        v.vehicleArmed = false;
        v.playerDetonator.armedVehicle = null;
    }, 1000, v);
}

function defuse(v) {
    if(! v.vehicleArmed) {
        return;
    }
    v.vehicleArmed = false;
    v.playerDetonator.armedVehicle = undefined;
    v.playerDetonator = undefined;
    
    v.toDetonateAfterAnEntrance = undefined;
    v.useTimer = false;
    v.explosionTime = undefined;
    if(v.bombTimerInterval != null) {
        clearInterval(v.bombTimerInterval);
        v.bombTimerInterval = null;
    }
    v.useDetonator = false;
}

function rand(min, max) {
    if(min == undefined || max == undefined) {
        return null;
    }
    min = parseInt(min, 10)
    max = parseInt(max, 10)
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
