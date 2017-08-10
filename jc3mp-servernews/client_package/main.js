/**
 * @overview package-servernews Main
 * @author Lukas 'derbl4ck' Berwanger , Myami
 * @copyright (c) derbl4ck, Myami
 * @license
 */

'use strict';

const ui = new WebUIWindow('jc3mp-servernews', 'package://jc3mp-servernews/ui/index.html', new Vector2(jcmp.viewportSize.x, jcmp.viewportSize.y));
ui.autoResize = true;

//request config from the server
jcmp.ui.AddEvent("requestservernewsconfig", () => {
	jcmp.events.CallRemote("requestservernewsconfig");
});
//get config back from server and send to ui
jcmp.events.AddRemoteCallable("receiveservernewsconfig", (strconfig) => {
	jcmp.ui.CallEvent("receiveservernewsconfig", strconfig);
});

jcmp.ui.AddEvent('toggle_cursor', (toggle) => {
    //jcmp.localPlayer.controlsEnabled = toggle;
});

jcmp.events.Add('openservernews', ()  => {
jcmp.ui.CallEvent('openservernews');
});