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

jcmp.events.AddRemoteCallable('chat_ready', player => {
    freeroam.chat.send(player, 'Spawning might take a while. Please wait and enjoy the view.', freeroam.config.colours.purple);

    if (freeroam.bans.has(player.client.steamId)) {
        freeroam.chat.send(player, 'You are banned from the server until the next server restart. You will get kicked shortly.', freeroam.config.colours.red);
        const done = freeroam.workarounds.watchPlayer(player, setTimeout(() => {
            done();
            player.Kick('banned')
        }, 15000));
    }
});