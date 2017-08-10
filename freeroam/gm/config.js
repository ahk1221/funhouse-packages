'use strict';

module.exports = {
    colours: {
        connection: new RGB(255, 140, 0),
        command_success: new RGB(0, 255, 0),
        command_fail: new RGB(255, 0, 0),
        group_message: new RGB(255, 204, 195),
        red: new RGB(255, 0, 0),
        green: new RGB(0, 255, 0),
        orange: new RGB(255, 140, 0),
        purple: new RGB(220, 198, 224),
    },
    world: {
        time: {
            hour: 13,
            minute: 0
        },
        weather: 0
    },
    death_reasons: [
        'rekt',
        'owned',
        'killed',
        'neutralized',
        'executed',
        'assassinated',
        'slaughtered',
        'obliterated'
    ],
    groupRestrictedNames: [
        'admin',
        'nanos'
    ],
    admins: [
        '76561198297562034',
        '76561198082266108',
        '76561198129739590',
		'76561198134749699'
    ]
};
