'use strict';

const ui = new WebUIWindow('banscreen-ui', 'package://admin-commands/ui/index.html', new Vector2(jcmp.viewportSize.x, jcmp.viewportSize.y));
ui.autoResize = true;

var shouldShowBanScreen = false;

var banText = '';
var reasonText = '';
var timeTillUnban = undefined;

jcmp.events.Add('hide_ui', () => {
    ui.hidden = true;
});

jcmp.events.AddRemoteCallable('show_ban_screen', (unbanDate, reason) => {
    if(unbanDate === 'perm') {
        banText = 'YOU HAVE BEEN PERMANENTLY BANNED FROM THIS SERVER!';
    } else {
        banText = 'YOU HAVE BEEN BANNED FROM THIS SERVER!';
        timeTillUnban = unbanDate;
    }

    jcmp.localPlayer.camera.attachedToPlayer = !jcmp.localPlayer.camera.attachedToPlayer;

    jcmp.localPlayer.camera.position = new Vector3f(3503, 1236, 1646);
    jcmp.localPlayer.camera.rotation = new Vector3f(0.23, -0.01, 0);
    jcmp.events.Call('hide_ui');

    jcmp.localPlayer.frozen = true;

    reasonText = reason;
    shouldShowBanScreen = true;
});

function drawText(renderer, text, position, fontSize, fontName) {
    var textMetric = renderer.MeasureText(text, fontSize, fontName);

    renderer.DrawText(text, new Vector3f(position.x - (textMetric.x / 2), position.y, 0.5), new Vector2f(renderer.viewportSize.x, renderer.viewportSize.y), new RGBA(215, 221, 220, 255), fontSize, fontName);
}

jcmp.events.Add('Render', renderer => {
    if(shouldShowBanScreen) {
        jcmp.world.SetTime(0, 0, 0);
        renderer.DrawRect(new Vector2f(0, 0), new Vector2f(renderer.viewportSize.x, renderer.viewportSize.y), new RGBA(0, 0, 0, 115));

        var fontSize = Math.round(renderer.viewportSize.x / 28); 
        drawText(renderer, banText, new Vector3f(renderer.viewportSize.x / 2, renderer.viewportSize.y / 9.14, 0), fontSize, "Impact");

        drawText(renderer, "BAN REASON:", new Vector3f(renderer.viewportSize.x / 2, renderer.viewportSize.y / 5.2, 0), fontSize, "Impact");

        drawText(renderer, reasonText.toUpperCase(), new Vector3f(renderer.viewportSize.x / 2, renderer.viewportSize.y / 3.5, 0), fontSize, "Impact");

        if(timeTillUnban !== undefined)
            drawText(renderer, timeTillUnban, new Vector3f(renderer.viewportSize.x / 2, renderer.viewportSize.y / 2, 0), fontSize, "Impact");
    }
});