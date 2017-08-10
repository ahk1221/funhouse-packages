const heightindicator_ui = new WebUIWindow("heightindicator_ui", "package://HeightIndicatorUI/ui/index.html", new Vector2(jcmp.viewportSize.x, jcmp.viewportSize.y));
heightindicator_ui.autoResize = true;

jcmp.ui.AddEvent("HeightIndicator_GetHeight", () => {
    jcmp.ui.CallEvent("HeightIndicator_OnReturn", jcmp.localPlayer.position.y);
});

jcmp.events.AddRemoteCallable("HeightIndicator_PlayerVehicleEntered", () => {
    jcmp.ui.CallEvent('HeightIndicator_PlayerVehicleEntered');
});

jcmp.events.AddRemoteCallable("HeightIndicator_PlayerVehicleExited", () => {
    jcmp.ui.CallEvent('HeightIndicator_PlayerVehicleExited');
});
