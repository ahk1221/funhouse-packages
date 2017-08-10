'use strict';

jcmp.events.AddRemoteCallable('chat_ready', player => {
    freeroam.chat.send(player, 'Spawning might take a while. Please wait and enjoy the view.', freeroam.config.colours.purple);

    freeroam.banUtils.whenPlayerJoined(player);
});

jcmp.events.Add('chat_message', (player, message) => {
    if (typeof player.freeroam === 'undefined')
        return `${player.escapedNametagName}: ${message}`;

    var nametag; 
    if(player.isNicked === true) {
        nametag = player.nick;
    } else {
        nametag = player.escapedNametagName;
    }
    var returnMessage = `${player.adminStar ? '<div class="admin-logo"></div>' : ''}[${player.freeroam.colour}] ${nametag}[#FFFFFF]: ${message}`;
    if(freeroam.muteUtils.isPlayerMuted(player)) {
        var unmuteDate = freeroam.muteUtils.getUnmuteDate(player.client.steamId);
        if(unmuteDate === 'perm') {
            returnMessage = '';
            freeroam.chat.send(player, 'you are muted from this chat!', freeroam.config.colours.red);
        } else {
            var today = new Date();
            if(today > unmuteDate) {
                jcmp.events.Call('remove_mute_by_id', player.client.steamId);
            } else {
                returnMessage = '';
                freeroam.chat.send(player, 'you are muted from this chat!', freeroam.config.colours.red); 
            }
        }
    }

    if(returnMessage !== '')
        console.log(`${nametag}: ${message}`);

    return returnMessage;
});