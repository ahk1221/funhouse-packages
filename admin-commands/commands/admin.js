'use strict';
module.exports = ({ Command, manager }) => {
    manager.category('admin', 'only usable by admins')
      .add(new Command('kill')
       .parameter('target', 'string', 'The player you want to kill.')
       .handler((player, target) => {
            if(!freeroam.utils.isAdmin(player)) {
                freeroam.chat.send(player, 'you are not allowed to use this command', freeroam.config.colours.red)
                return;
            }

            const res = freeroam.utils.getPlayer(target);
            if (res.length === 0) {
                freeroam.chat.send(player, 'no matching players!', freeroam.config.colours.red);
                return;
            }

            res.forEach(p => {
                if(freeroam.utils.isAdmin(p)) {
                    freeroam.chat.send(player, 'you cannot kill an admin!', freeroam.config.colours.red);
                    return;
                }
                p.health = 0;
            });
       }))

      .add(new Command('pineapple')
        .description('Pineapples are good for you!')
        .handler((player) => {
            if(!freeroam.utils.isAdmin(player)) {
                freeroam.chat.send(player, 'you are not allowed to use this command', freeroam.config.colours.red)
                return;
            }

            if(player.pineapple === true) {
                player.invulnerable = false;
                player.pineapple = false;
                freeroam.chat.send(player, "You are not invulnerable!");
            } else {
                player.invulnerable = true;
                player.pineapple = true;
                freeroam.chat.send(player, "You are now invulnerable!");
            }
        }))

      .add(new Command('tphere')
       .parameter('target', 'string', 'networkId or (part of) their name')
       .description('TPs a player(s) to you.')
       .handler((player, target) => {
            if (!freeroam.utils.isAdmin(player)) {
                freeroam.chat.send(player, 'you are not allowed to use this command', freeroam.config.colours.red)
                return;
            }
        
            const res = freeroam.utils.getPlayer(target);
            if (res.length === 0) {
                freeroam.chat.send(player, 'no matching players!', freeroam.config.colours.red);
                return;
            }

            res.forEach(p => {
                p.position = player.position;
            });
       }))
      
     .add(new Command('nick')
      .parameter('nick', 'string', 'The name you want your current name to change to.')
      .optional('target', 'string', 'Person you want to nick.', {isTextParameter: true})
      .handler((player, nick, target) => {
        if (!freeroam.utils.isAdmin(player)) {
            freeroam.chat.send(player, 'you are not allowed to use this command', freeroam.config.colours.red)
            return;
        }

        if(target === "") {
            player.isNicked = true;
            player.nick = nick;

            jcmp.players.forEach(function(playerElement) {
                jcmp.events.CallRemote('nick_player_remote', playerElement, player.networkId, player.nick);
            }, this);
        } else {
            const res = freeroam.utils.getPlayer(target);
            if (res.length === 0) {
                freeroam.chat.send(player, 'no matching players!', freeroam.config.colours.red);
                return;
            }

            res.forEach(p => {
                p.isNicked = true;
                p.nick = nick;

                jcmp.players.forEach(function(playerElement) {
                    jcmp.events.CallRemote('nick_player_remote', playerElement, p.networkId, p.nick);
                }, this);
            });
        }
      }))
     
      .add(new Command('rnick')
       .optional('target', 'string', 'Person you want to un-nick', {isTextParameter: true})
       .handler((player, target) => {
         if (!freeroam.utils.isAdmin(player)) {
             freeroam.chat.send(player, 'you are not allowed to use this command', freeroam.config.colours.red)
             return;
         }
 
         if(target === "") {
             player.isNicked = false;
             player.nick = "";
 
             jcmp.players.forEach(function(playerElement) {
                 jcmp.events.CallRemote('unnick_player', playerElement, player.networkId, player.escapedNametagName);
             }, this);      
         } else {
             const res = freeroam.utils.getPlayer(target);
             if (res.length === 0) {
                 freeroam.chat.send(player, 'no matching players!', freeroam.config.colours.red);
                 return;
             }

             res.forEach(p => {
                 p.isNicked = false;
                 p.nick = "";
 
                 jcmp.players.forEach(function(playerElement) {
                     jcmp.events.CallRemote('unnick_player', playerElement, p.networkId, p.escapedNametagName);
                 }, this); 
            });
         }
       }))
     
     .add(new Command('toggleadminstar')
      .optional('target', 'string', 'the target you want to toggle the star for.', {isTextParameter: true})
      .handler((player, target) => {
        if(!freeroam.utils.isAdmin(player)) {
            freeroam.chat.send(player, 'you are not allowed to use this command!', freeroam.config.colours.red);
            return;
        }

        if(target === "") {
            player.adminStar = !player.adminStar;
            jcmp.players.forEach(function(playerElm) {
                jcmp.events.CallRemote('toggle_admin_star', playerElm, player.adminStar, player.networkId);
            }, this);
        } else {
            const res = freeroam.utils.getPlayer(target);
            if (res.length === 0) {
                freeroam.chat.send(player, 'no matching players!', freeroam.config.colours.red);
                return;
            }

            res.forEach(p => {
                p.adminStar = !p.adminStar;
                jcmp.players.forEach(function(playerElm) {
                    jcmp.events.CallRemote('toggle_admin_star', playerElm, p.adminStar, p.networkId);
                }, this);
            });
        }
      }))
     
     .add(new Command('fakejoin')
      .parameter('name', 'string', 'the name of the fake player joining.')
      .handler((player, name) => {
        if(!freeroam.utils.isAdmin(player)) {
            freeroam.chat.send(player, 'you are not allowed to use this command!', freeroam.config.colours.red);
            return;
        }

        freeroam.chat.broadcast(`** ${name} has joined.`, freeroam.config.colours.connection);
      }))

     .add(new Command('fakeleave')
      .parameter('name', 'string', 'the name of the fake player leaving.')
      .handler((player, name) => {
        if(!freeroam.utils.isAdmin(player)) {
            freeroam.chat.send(player, 'you are not allowed to use this command!', freeroam.config.colours.red);
            return;
        }

        freeroam.chat.broadcast(`** ${name} has left.`, freeroam.config.colours.connection);
      }))  

     .add(new Command('broadcast')
      .parameter('message', 'string', 'the message you want to broadcast.')
      .optional('color', 'string', 'the color you want the broacast to be.', {isTextParameter: true})
      .handler((player, message, color) => {
        if(!freeroam.utils.isAdmin(player)) {
            freeroam.chat.send(player, 'you are not allowed to use this command!', freeroam.config.colours.red);
            return;
        }

        var colorValue = freeroam.config.colours.red;
        switch(color) {
            case "yellow":
            colorValue = new RGB(255, 255, 0);
            break;

            case "green":
            colorValue = new RGB(0, 255, 0);
            break;

            case "blue":
            colorValue = new RGB(0, 0, 255);
            break;

            case "red":
            colorValue = new RGB(255, 0, 0);
            break;

            case "black":
            colorValue = new RGB(0,0,0);
            break;

            case "white":
            colorValue = new RGB(255, 255, 255);
            break;

            default:
            if(color.indexOf(',') > -1) {
                var splitString = color.split(',');
                colorValue = new RGB(parseInt(splitString[0]), parseInt(splitString[1]), parseInt(splitString[2]));
            }
            break;
        }

        freeroam.chat.broadcast(message, colorValue);
      }))
    
     .add(new Command('sendMessage')
      .parameter('target', 'string', 'The target you want to send the message to.')
      .parameter('message', 'string', 'The message you want to send.')
      .handler((player, target, message) => {
            if(!freeroam.utils.isAdmin(player)) {
                freeroam.chat.send(player, 'you are not allowed to use this command!', freeroam.config.colours.red);
                return;
            }

            const res = freeroam.utils.getPlayer(target);
            if (res.length === 0) {
                freeroam.chat.send(player, 'no matching players!', freeroam.config.colours.red);
                return;
            }

            res.forEach(p => {
                freeroam.chat.send(p, message, freeroam.config.colours.green);
                setTimeout(() => {player.Kick('You are banned.')}, 7000);
            });
      }))

      .add(new Command('ban')
       .description('Bans a player for the duration')
       .parameter('target', 'string', 'The player you want to ban.')
       .parameter('duration', 'string', 'The duration of the ban. Input perm for permanent ban.')
       .optional('reason', 'string', 'The reason why you are banning the player.', {isTextParameter: true})
       .handler((player, target, duration, reason) => {
            if(!freeroam.utils.isAdmin(player)) {
                freeroam.chat.send(player, 'you are not allowed to use this command!', freeroam.config.colours.red);
                return;
            }

            const res = freeroam.utils.getPlayer(target);
            if (res.length === 0) {
                freeroam.chat.send(player, 'no matching players!', freeroam.config.colours.red);
                return;
            }

            res.forEach(p => {
                if(freeroam.utils.isAdmin(p) && p.networkId !== player.networkId){
                    freeroam.chat.send(player, 'you are not allowed to ban another admin!', freeroam.config.colours.red);
                    return;
                }
                jcmp.events.Call('add_ban', p, reason, duration, player);
                freeroam.chat.send(player, 'banned player ' + p.name, freeroam.config.colours.connection);
            });           
       }))

      .add(new Command('unban')
       .parameter('target', 'string', 'Name or steamId of player to unban.')
       .handler((player, target) => {
            if(!freeroam.utils.isAdmin(player)) {
                freeroam.chat.send(player, 'you are not allowed to use this command!', freeroam.config.colours.red);
                return;
            }

            const playerToUnban = freeroam.banUtils.getBannedPlayer(target);
            if(playerToUnban !== undefined) {
                jcmp.events.Call('remove_ban_by_id', playerToUnban);
                freeroam.chat.send(player, 'unbanned player ' + freeroam.banUtils.getBannedPlayerName(playerToUnban), freeroam.config.colours.connection);
            }
       }))
    
      .add(new Command('mute')
       .parameter('target', 'string', 'Name or steamId of player to mute.')
       .parameter('duration', 'string', 'The duration of the mute. For permenant mute input perm')
       .optional('reason', 'string', 'Reason why you are muting this player.', {isTextParameter: true})
       .handler((player, target, duration, reason) => {
            if(!freeroam.utils.isAdmin(player)) {
                freeroam.chat.send(player, 'you are not allowed to use this command!', freeroam.config.colours.red);
                return;
            }

            const res = freeroam.utils.getPlayer(target);
            if(res.length === 0){
                freeroam.chat.send(player, 'no matching players!', freeroam.config.colours.red);
                return;
            }

            res.forEach(p => {
                if(freeroam.utils.isAdmin(p) && p.networkId !== player.networkId) {
                    freeroam.chat.send(player, 'you are not allowed to mute another admin!', freeroam.config.colours.red);
                    return;
                }

                jcmp.events.Call('add_mute', p, reason, duration, player);
            });
       }))

      .add(new Command('unmute')
       .parameter('target', 'string', 'Name or steamId of player to unmute.')
       .handler((player, target) => {
            if(!freeroam.utils.isAdmin(player)) {
                freeroam.chat.send(player, 'you are not allowed to use this command!', freeroam.config.colours.red);
                return;
            }
            
            const playerToUnmute = freeroam.muteUtils.getMutedPlayer(target);
            if(playerToUnmute !== undefined) {
                jcmp.events.Call('remove_mute_by_id', playerToUnmute);
                freeroam.chat.send(player, 'unmuted player ' + freeroam.muteUtils.getMutedPlayerName(playerToUnmute), freeroam.config.colours.connection);
            }
       }));
};