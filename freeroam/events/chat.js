'use strict';

jcmp.events.Add('chat_message', (player, message) => {
    if (typeof player.freeroam === 'undefined')
        return `${player.escapedNametagName}: ${message}`;

    console.log(`${player.escapedNametagName}: ${message}`);
    var nametag; 
    if(player.isNicked === true) {
        nametag = player.nick;
    } else {
        nametag = player.escapedNametagName;
    }
    return `${player.adminStar ? '<div class="admin-logo"></div>' : ''}[${player.freeroam.colour}] ${nametag}[#FFFFFF]: ${message}`;
});