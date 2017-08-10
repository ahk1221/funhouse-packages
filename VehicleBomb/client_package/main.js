const vbomb = new WebUIWindow("vehiclebomb_ui", "package://VBomb/ui/index.html", new Vector2(jcmp.viewportSize.x, jcmp.viewportSize.y));
vbomb.autoResize = true;

jcmp.events.AddRemoteCallable("VehicleBomb_Timer", () => {
    jcmp.ui.CallEvent("VehicleBomb_Timer");
});

jcmp.events.AddRemoteCallable("VehicleBomb_Detonate", () => {
    jcmp.ui.CallEvent("VehicleBomb_Detonate");
});

jcmp.events.AddRemoteCallable("VehicleBomb_StopTimer", () => {
    jcmp.ui.CallEvent("VehicleBomb_StopTimer");
});

jcmp.events.AddRemoteCallable("VehicleBomb_BombHasBeenFound", () => {
    jcmp.ui.CallEvent("VehicleBomb_BombHasBeenFound");
    jcmp.localPlayer.controlsEnabled = false;
});

jcmp.events.AddRemoteCallable("VehicleBomb_BombHasNotBeenFound", () => {
    jcmp.ui.CallEvent("VehicleBomb_BombHasNotBeenFound");
});

jcmp.events.AddRemoteCallable("VehicleBomb_DetonateBombOk", () => {
    jcmp.ui.CallEvent("VehicleBomb_DetonateBombOk");
});

jcmp.events.AddRemoteCallable("VehicleBomb_OpenNotInVehicle", () => {
    jcmp.ui.CallEvent("VehicleBomb_OpenNotInVehicle");
});

jcmp.events.AddRemoteCallable("VehicleBomb_OpenSomeVehicleAlreadyArmedByYou", () => {
    jcmp.ui.CallEvent("VehicleBomb_OpenSomeVehicleAlreadyArmedByYou");
});

jcmp.events.AddRemoteCallable("VehicleBomb_OpenThisVehicleAlreadyArmedBySomeone", () => {
    jcmp.ui.CallEvent("VehicleBomb_OpenThisVehicleAlreadyArmedBySomeone");
});

jcmp.events.AddRemoteCallable("VehicleBomb_OpenOk", () => {
    jcmp.ui.CallEvent("VehicleBomb_OpenOk");
    jcmp.localPlayer.controlsEnabled = false;
});

jcmp.events.AddRemoteCallable("VehicleBomb_SetBombNotInVehicle", () => {
    jcmp.ui.CallEvent("VehicleBomb_SetBombNotInVehicle");
});

jcmp.events.AddRemoteCallable("VehicleBomb_SetBombSomeVehicleAlreadyArmedByYou", () => {
    jcmp.ui.CallEvent("VehicleBomb_SetBombSomeVehicleAlreadyArmedByYou");
});

jcmp.events.AddRemoteCallable("VehicleBomb_SetBombThisVehicleAlreadyArmedBySomeone", () => {
    jcmp.ui.CallEvent("VehicleBomb_SetBombThisVehicleAlreadyArmedBySomeone");
});

jcmp.events.AddRemoteCallable("VehicleBomb_SetBombSomethingWrong", () => {
    jcmp.ui.CallEvent("VehicleBomb_SetBombSomethingWrong");
});

jcmp.events.AddRemoteCallable("VehicleBomb_SetBombOk", () => {
    jcmp.ui.CallEvent("VehicleBomb_SetBombOk");
    jcmp.localPlayer.controlsEnabled = true;
});

jcmp.events.AddRemoteCallable("VehicleBomb_NoArmedVehicle", () => {
    jcmp.ui.CallEvent("VehicleBomb_NoArmedVehicle");
});

jcmp.events.AddRemoteCallable("VehicleBomb_PlayerVehicleEntered", () => {
    jcmp.ui.CallEvent("VehicleBomb_PlayerVehicleEntered");
});

jcmp.events.AddRemoteCallable("VehicleBomb_PlayerVehicleExited", () => {
    jcmp.ui.CallEvent("VehicleBomb_PlayerVehicleExited");
});

jcmp.events.AddRemoteCallable("VehicleBomb_ReturnUsername", (name) => {
    jcmp.ui.CallEvent("VehicleBomb_Username", name);
});



jcmp.ui.AddEvent("VehicleBomb_SetBomb", (data) => {
    jcmp.events.CallRemote("VehicleBomb_SetBomb", data);
});

jcmp.ui.AddEvent("VehicleBomb_DetonateBomb", () => {
    jcmp.events.CallRemote("VehicleBomb_DetonateBomb");
});

jcmp.ui.AddEvent("VehicleBomb_Open", () => {
    jcmp.events.CallRemote("VehicleBomb_Open");
});

jcmp.ui.AddEvent("VehicleBomb_GetMyUsername", () => {
    jcmp.events.CallRemote("VehicleBomb_GetUsername");
});

jcmp.ui.AddEvent("VehicleBomb_TryToFindBomb", () => {
    jcmp.events.CallRemote("VehicleBomb_TryToFindBomb");
});

jcmp.ui.AddEvent("VehicleBomb_DefuseHasBeenFailed", () => {
    jcmp.events.CallRemote("VehicleBomb_DefuseHasBeenFailed");
});

jcmp.ui.AddEvent("VehicleBomb_BombHasBeenDefused", () => {
    jcmp.events.CallRemote("VehicleBomb_BombHasBeenDefused");
});

jcmp.ui.AddEvent("VehicleBomb_Close", () => {
    jcmp.localPlayer.controlsEnabled = true;
});

jcmp.ui.AddEvent("VehicleBomb_CloseDefuser", () => {
    jcmp.localPlayer.controlsEnabled = true;
});
