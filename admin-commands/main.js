'use strict';

global.freeroam = {
    commands: jcmp.events.Call('get_command_manager')[0],
    chat: jcmp.events.Call('get_chat')[0],
    config: require('../freeroam/gm/config'),
    utils: require('../freeroam/gm/utility'),
    colours: require('../freeroam/vendor/randomColor'),
    workarounds: require('../freeroam/gm/_workarounds'),
    bans: new Set(),
    passiveModeBans: new Set(),
    timeManager: new (require('../freeroam/gm/timeManager'))(13, 0),
    groupManager: new (require('../freeroam/gm/groupManager'))(),
    poiManager: new (require('../freeroam/gm/poiManager'))()
};

setTimeout(() => {freeroam.commands.loadFromDirectory(`${__dirname}/commands`, (f, ...a) => require(f)(...a))}, 1000);