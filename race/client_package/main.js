'use strict';

let currentMap;
let checkpoints = [];

var currentCheckpointId = 0;

class CustomCheckpoint {
    constructor(position, rotation) {
        this.visibleCheckpoint = new Checkpoint(1, 0x301477DB, position, rotation);
        this.visibleCheckpoint.visible = true;

        //this.triggerCheckpoint = new Checkpoint(0, 0x301477DB, position, rotation);
    }

    Destroy() {
        this.visibleCheckpoint.Destroy();
        //this.triggerCheckpoint.Destroy();
    }
}

jcmp.events.AddRemoteCallable('create_checkpoint', () => {
    var check = new CustomCheckpoint(new Vector3f(jcmp.localPlayer.position.x + 20, jcmp.localPlayer.position.y, jcmp.localPlayer.position.z), jcmp.localPlayer.rotation);
});

function createCheckpoint() {
    var newIndex = currentCheckpointId + 3;

    while(newIndex > currentMap.checkpoints.length) {
        newIndex -=1;
    }

    if(checkpoints.length === currentMap.checkpoints.length) {
        return;
    }

    if(newIndex > currentCheckpointId) {
        jcmp.events.CallRemote('send_message_radio', 'creating checkpoint at id ' + newIndex);
        
        var element = currentMap.checkpoints[newIndex];
        var checkpointNew = new CustomCheckpoint(new Vector3f(element.positionX, element.positionY, element.positionZ), new Vector3f(element.rotationX, element.rotationY, element.rotationZ));
        checkpointNew.visibleCheckpoint.id = newIndex;
        checkpoints.push(checkpointNew);
    }
}

jcmp.events.Add('CheckpointEnter', checkpoint => {
    jcmp.events.CallRemote('send_message_radio', 'Entered! id = ' + checkpoint.id);
    if(checkpoint.id === currentCheckpointId) {
        createCheckpoint();

        destroyCheckpoint(checkpoint.id);
        currentCheckpointId++;

        if(currentCheckpointId === currentMap.checkpoints.length) {
            jcmp.events.CallRemote('send_message_radio', 'Entered last checkpoint!');
            jcmp.events.CallRemote('race/last-checkpoint-entered');
        }
    }
});

jcmp.events.Add('CheckpointLeave', checkpoint => {
    //This should only get called when you're driving fast.
    jcmp.events.CallRemote('send_message_radio', 'Entered! id = ' + checkpoint.id);
    if(checkpoint.id === currentCheckpointId) {
        createCheckpoint();

        destroyCheckpoint(checkpoint.id);
        currentCheckpointId++;

        if(checkpoint.id === currentMap.checkpoints.length - 1) {
            jcmp.events.CallRemote('send_message_radio', 'Entered last checkpoint!');
            jcmp.events.CallRemote('race/last-checkpoint-entered');
        }
    }
});

function destroyCheckpoint(id) {
    checkpoints.forEach(function(element) {
        if(element.visibleCheckpoint.id === id) {
            element.Destroy();
        }
    }, this);
}

jcmp.events.AddRemoteCallable('handle_checkpoints', data => {
    currentMap = JSON.parse(data);

    jcmp.events.CallRemote('send_message_radio', 'Amount of checkpoints + ' + currentMap.checkpoints.length);

    for (var i = 0; i < 3; i++) {
        var element = currentMap.checkpoints[i];
        var checkpoint = new CustomCheckpoint(new Vector3f(element.positionX, element.positionY, element.positionZ), new Vector3f(element.rotationX, element.rotationY, element.rotationZ));     
        checkpoint.visibleCheckpoint.id = i;
        checkpoints.push(checkpoint);
    }
});

jcmp.events.AddRemoteCallable('race/remove_checkpoints', () => {
    checkpoints.forEach(function(element) {
        element.Destroy();
    }, this);
    currentMap = undefined;
    checkpoints = undefined;
    currentCheckpointId = undefined;
});

jcmp.events.AddRemoteCallable('freeze_player', () => {
    jcmp.localPlayer.frozen = !jcmp.localPlayer.frozen;
});