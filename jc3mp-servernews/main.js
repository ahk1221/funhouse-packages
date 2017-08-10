/**
 * @overview package-servernews Main
 * @author Lukas 'derbl4ck' Berwanger , Myami
 * @copyright (c) derbl4ck , Myami
 * @license
 */

'use strict';

var config = require("./config.json");
var strconfig = JSON.stringify(config);

jcmp.events.AddRemoteCallable("requestservernewsconfig", (player) => {
    jcmp.events.CallRemote("receiveservernewsconfig", player, strconfig);
});

console.log('[ServerNews] initialized!');
