var keypressDetector = document.getElementById("keypress-detector");
var audio = document.createElement('audio');
var radioImg = document.getElementById("radio");
var radioText = document.getElementById("radio-display");
radioImg.style.opacity = 0;
audio.volume = 0;

var hide = false;
var isFadingOut = false;
var currentRadioStation = 0;

function setRadioStation(station, file) {
    let configFile = JSON.parse(file);
    currentRadioStation = station;

    var src = configFile[currentRadioStation].src;
    var name = configFile[currentRadioStation].name;

    jcmp.CallEvent('radio_station_set_ui', configFile[currentRadioStation].src);

    audio.src = src;
    audio.play();
    radioText.innerHTML = name;

    if(src !== "RadioOff") {
        audio.volume = 1;
    } else {
        audio.volume = 0;
    }
}

function setRadioStationByName(station, file) {
    let configFile = JSON.parse(file);
    
    for (var i = 0; i < configFile.length; i++) {
        var element = configFile[i];
        if(element.src === station) {
            currentRadioStation = i;
        }
    }

    var name = configFile[currentRadioStation].name;

    audio.src = station;
    audio.play();
    radioText.innerHTML = name;

    if(station !== "RadioOff") {
        audio.volume = 1;
    } else {
        audio.volume = 0;
    }
}

jcmp.AddEvent('set_radio_station_by_name', (stationObj, file) => {
    setRadioStationByName(stationObj, file);
});

jcmp.AddEvent('set_radio_station_ui', (station, file) => {
    setRadioStation(station, file);
});

jcmp.AddEvent('scroll_forward_ui', (file) => {
    let configFile = JSON.parse(file);
    if((configFile.length - 1) >= (currentRadioStation + 1)) {
        currentRadioStation += 1;
    } else {
        currentRadioStation = 0;
    }

    setRadioStation(currentRadioStation, file);
});

jcmp.AddEvent('scroll_backward_ui', (file) => {
    let configFile = JSON.parse(file);
    if(currentRadioStation === 0) {
        currentRadioStation = configFile.length - 1;
    } else {
        currentRadioStation -= 1;
    }

    setRadioStation(currentRadioStation, file);
});

jcmp.AddEvent('toggle_radio_img', (toggle) => {
    radioImg.classList.toggle('hidden', toggle);
});

jcmp.AddEvent('do_fade_out', () => {
    if(isFadingOut === false) {
        isFadingOut = true;
        setTimeout(() => {if(isFadingOut !== false) { radioImg.classList.toggle('hidden');isFadingOut = false; } }, 5000);
    }
});

jcmp.AddEvent('dont_do_fade_out', () => {
    isFadingOut = false;
});

keypressDetector.onkeypress = function(e) {
    jcmp.CallEvent('get_key_press_radio', '' + e.keyCode);
    jcmp.CallEvent('get_duration_radio', audio.duration);
};