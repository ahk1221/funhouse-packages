'use strict';

const ui = new WebUIWindow('test-ui', 'package://radio/ui/index.html', new Vector2(jcmp.viewportSize.x, jcmp.viewportSize.y));
ui.autoResize = true;

var isPlayerInVehicle = false;
var config;

jcmp.events.Add('hide_ui', () => {
    ui.hidden = true;
});

jcmp.events.CallRemote('send_file_radio');

jcmp.events.AddRemoteCallable('recieve_file_radio', (file) => {
    config = file;
}); 

jcmp.events.AddRemoteCallable('set_player_in_vehicle_radio', (toggle) => {
    isPlayerInVehicle = toggle;
    jcmp.ui.CallEvent('toggle_radio_img', toggle);
    
    if(toggle == true) {
        jcmp.ui.CallEvent('do_fade_out');
    }
    
    if(toggle == false) {
        jcmp.ui.CallEvent('dont_do_fade_out');
        jcmp.ui.CallEvent('set_radio_station_ui', 0, config);
    }
});

jcmp.ui.AddEvent('radio_station_set_ui', station => {
    jcmp.events.CallRemote('radio_station_set', station);
});

jcmp.ui.AddEvent('send_message_ui_radio', message => {
    jcmp.events.CallRemote('send_message_radio', message);
});

jcmp.events.AddRemoteCallable('set_radio_station', station => { 
    jcmp.ui.CallEvent('set_radio_station_by_name', station, config);
    jcmp.ui.CallEvent('toggle_radio_img', true);
    jcmp.ui.CallEvent('do_fade_out');
});

jcmp.ui.AddEvent('get_key_press_radio', (keyCode) => {
    if(isPlayerInVehicle === true)
    {
        if(keyCode === "46")
        {
            jcmp.ui.CallEvent('scroll_forward_ui', config);
            jcmp.ui.CallEvent('toggle_radio_img', true);
            jcmp.ui.CallEvent('do_fade_out');
        } else if(keyCode === "44") {
            jcmp.ui.CallEvent('scroll_backward_ui', config);
            jcmp.ui.CallEvent('toggle_radio_img', true);
            jcmp.ui.CallEvent('do_fade_out');
        }
    }
});