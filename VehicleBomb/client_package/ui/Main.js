function Main() {
    this.main = function() {
        this.data = {};
        this.countedTime = 0;
        this.timeUntil = 0;
        this.isInVehicle = false;
        this.isLookingForBomb = false;
        this.detonatedByFailedDefuse = false;
        this.left = 0;
        this.detonatorSelectedKey = null;
        this.detonatorSelectedKeyString = "UNKNOWN";
        this.username = "JC3:MP Player";
        this.timer = document.getElementById("timer");
        this.set = document.getElementById("set");
        this.defuser = document.getElementById("defuser");
        this.message = document.getElementById("message");
        
        this.detonator = document.getElementById("detonator");
        this.tick = document.getElementById("tick");
        this.onblowup = document.getElementById("onblowup");
        this.defused = document.getElementById("defused");
        
        this.typeSensor = document.getElementById("typeSensor");
        this.typeTimer = document.getElementById("typeTimer");
        this.typeDetonator = document.getElementById("typeDetonator");
        
        this.def1 = document.getElementById("def1");
        this.def2 = document.getElementById("def2");
        this.def3 = document.getElementById("def3");
        this.def4 = document.getElementById("def4");
        
        this.def1interval = this.def2interval = this.def3interval = this.def4interval = null;
        
        this.button = document.getElementById("button");
        
        this.button.onclick = function() {
            var main = window.__MAIN;
            main.setBomb();
        }
        
        this.typeSensor.onclick = this.typeDetonator.onclick = function() {
            var main = window.__MAIN;
            main.typeSensorSettings.style.display = "";
            main.typeTimerSettings.style.display = "none";
            main.typeDetonatorSettings.style.display = "none";
        }
        
        this.typeTimer.onclick = function() {
            var main = window.__MAIN;
            main.typeSensorSettings.style.display = "none";
            main.typeTimerSettings.style.display = "";
            main.typeDetonatorSettings.style.display = "none";
        }
        
        this.typeDetonator.onclick = function() {
            var main = window.__MAIN;
            main.typeSensorSettings.style.display = "none";
            main.typeTimerSettings.style.display = "none";
            main.typeDetonatorSettings.style.display = "";
        }
        
        this.minutes = document.getElementById("minutes");
        this.seconds = document.getElementById("seconds");
        
        this.minutes.onclick = this.seconds.onclick = function() {
            var main = window.__MAIN;
            main.countTime();
        }
        
        this.def1.onkeydown = function(e) {
            var main = window.__MAIN;
            if(! ((e.which >= 48 && e.which <= 57) || (e.which >= 96 && e.which <= 105))) {
                return;
            }
            var key = main.getKeyByCode(e.which);
            var defval = main.def1.innerHTML;
            clearInterval(main.def1interval);
            if(key == defval || key == "numpad "+defval) {
                main.setReady(main.def1, true);
                if(main.def1.isReady && main.def2.isReady && main.def3.isReady && main.def4.isReady) {
                    main.bombHasBeenDefused();
                }
            } else {
                main.def1.removeAttribute("tabIndex");
                main.defuseHasBeenFailed();
                main.def1.style.backgroundColor = "red";
            }
        }
        
        this.def2.onkeydown = function(e) {
            var main = window.__MAIN;
            if(! ((e.which >= 48 && e.which <= 57) || (e.which >= 96 && e.which <= 105))) {
                return;
            }
            var key = main.getKeyByCode(e.which);
            var defval = main.def2.innerHTML;
            clearInterval(main.def2interval);
            if(key == defval || key == "numpad "+defval) {
                main.setReady(main.def2, true);
                if(main.def1.isReady && main.def2.isReady && main.def3.isReady && main.def4.isReady) {
                    main.bombHasBeenDefused();
                }
            } else {
                main.def2.removeAttribute("tabIndex");
                main.defuseHasBeenFailed();
                main.def2.style.backgroundColor = "red";
            }
        }
        
        this.def3.onkeydown = function(e) {
            var main = window.__MAIN;
            if(! ((e.which >= 48 && e.which <= 57) || (e.which >= 96 && e.which <= 105))) {
                return;
            }
            var key = main.getKeyByCode(e.which);
            var defval = main.def3.innerHTML;
            clearInterval(main.def3interval);
            if(key == defval || key == "numpad "+defval) {
                main.setReady(main.def3, true);
                if(main.def1.isReady && main.def2.isReady && main.def3.isReady && main.def4.isReady) {
                    main.bombHasBeenDefused();
                }
            } else {
                main.def3.removeAttribute("tabIndex");
                main.defuseHasBeenFailed();
                main.def3.style.backgroundColor = "red";
            }
        }
        
        this.def4.onkeydown = function(e) {
            var main = window.__MAIN;
            if(! ((e.which >= 48 && e.which <= 57) || (e.which >= 96 && e.which <= 105))) {
                return;
            }
            var key = main.getKeyByCode(e.which);
            var defval = main.def4.innerHTML;
            clearInterval(main.def4interval);
            if(key == defval || key == "numpad "+defval) {
                main.setReady(main.def4, true);
                if(main.def1.isReady && main.def2.isReady && main.def3.isReady && main.def4.isReady) {
                    main.bombHasBeenDefused();
                }
            } else {
                main.def4.removeAttribute("tabIndex");
                main.defuseHasBeenFailed();
                main.def4.style.backgroundColor = "red";
            }
        }
        
        this.typeSensorSettings = document.getElementById("typeSensorSettings");
        this.typeSensorSettings.style.display = "";
        
        this.typeTimerSettings = document.getElementById("typeTimerSettings");
        this.typeTimerSettings.style.display = "none";
        
        this.typeDetonatorSettings = document.getElementById("typeDetonatorSettings");
        this.typeDetonatorSettings.style.display = "none";
        
        this.typeDetonatorSettings.onkeydown = function(e) {
            var main = window.__MAIN;
            var str = main.getKeyByCode(e.which).toUpperCase();
            main.typeDetonatorSettings.innerHTML = str;
            main.detonatorSelectedKey = e.which;
            main.detonatorSelectedKeyString = str;
        }
        
        this.timer.style.display = "none";
        this.set.style.display = "none";
        this.defuser.style.display = "none";
        this.message.style.display = "none";
        this.message.timeout = null;
        
        this.timer.interval = null;
        
        document.onkeyup = function(e) {
            var main = window.__MAIN;
            if(e.which == main.detonatorSelectedKey) {
                main.blowup();
            }
        }
        
        document.onkeydown = function(e) {
            var main = window.__MAIN;
            if(e.which == 46) { // DELETE
                if(main.set.style.display == "none") {
                    if(! main.isInVehicle) {
                        main.showMessage("You must be in any vehicle to begin installation of a bomb.");
                        return;
                    }
                    main.ce("VehicleBomb_Open");
                } else {
                    main.set.style.display = "none";
                    main.ce("VehicleBomb_Close");
                    jcmp.HideCursor();
                }
            }
            
            if(e.which == 35) { // END
                if(! main.isInVehicle || main.isLookingForBomb) {
                    return;
                }
                if(main.defuser.style.display == "") {
                    main.closeDefuser();
                    main.stopDefuseCodeChangement();
                    return;
                }
                main.ce("VehicleBomb_TryToFindBomb");
                var message = "";
                switch(main.rand(1, 3)) {
                    case 1:
                        message =  main.username+": I look for a bomb..";
                        break;
                    
                    case 2:
                        message =  main.username+": I try to find a bomb, but I need time!";
                        break;
                    
                    case 3:
                        message =  main.username+": OK.. I search for a bomb. It will take a while.";
                        break;
                }
                main.isLookingForBomb = true;
                main.showMessage(message);
            }
        }
        
        this.countTime();
        
        jcmp.AddEvent("VehicleBomb_Username", function(name) {
            var main = window.__MAIN;
            //main.showMessage("Player's username: "+name);
            main.username = name;
        });
        this.ce("VehicleBomb_GetMyUsername");
        jcmp.AddEvent("VehicleBomb_PlayerVehicleEntered", function() {
            window.__MAIN.isInVehicle = true;
        });
        jcmp.AddEvent("VehicleBomb_PlayerVehicleExited", function() {
            window.__MAIN.isInVehicle = false;
        });
        
        jcmp.AddEvent("VehicleBomb_OpenOk", function() {
            window.__MAIN.set.style.display = "";
            jcmp.ShowCursor();
        });
        
        jcmp.AddEvent("VehicleBomb_BombHasBeenFound", function() {
            var main = window.__MAIN;
            var message = "";
            switch(main.rand(1, 3)) {
                case 1:
                    message = main.username+": Gotcha!";
                    break;
                    
                case 2:
                    message = main.username+": I found it.";
                    break;
                    
                case 3:
                    message = main.username+": OK. She here.";
                    break;
            }
            main.isLookingForBomb = false;
            main.openDefuser();
            main.showMessage(message);
        });
        
        jcmp.AddEvent("VehicleBomb_BombHasNotBeenFound", function() {
            var main = window.__MAIN;
            var message = "";
            switch(main.rand(1, 3)) {
                case 1:
                    message = main.username+": There is nothing. I think..";
                    break;
                    
                case 2:
                    message = main.username+": It seems that she isn't here.";
                    break;
                    
                case 3:
                    message = main.username+": I've found nothing.";
                    break;
            }
            main.isLookingForBomb = false;
            main.showMessage(message);
        });
        
        jcmp.AddEvent("VehicleBomb_BombHasBeenDefused", function() {
            var main = window.__MAIN;
            var message = "";
            switch(main.rand(1, 3)) {
                case 1:
                    message = main.username+": Nice!";
                    break;
                    
                case 2:
                    message = main.username+": Counter-Terrorists win! Haha!";
                    break;
                    
                case 3:
                    message = main.username+": Defused!";
                    break;
            }
            main.isLookingForBomb = false;
            main.defused.currentTime = 0;
            main.defused.play();
            main.showMessage(message);
        });
        
        jcmp.AddEvent("VehicleBomb_DefuseHasBeenFailed", function() {
            var main = window.__MAIN;
            var message = "";
            switch(main.rand(1, 3)) {
                case 1:
                    message = main.username+": FUCK!!!";
                    break;
                    
                case 2:
                    message = main.username+": Well, shit..";
                    break;
                    
                case 3:
                    message = main.username+": Get outta here! It's gonna blow!";
                    break;
            }
            main.detonatedByFailedDefuse = true;
            main.isLookingForBomb = false;
            main.showMessage(message);
        });
        
        jcmp.AddEvent("VehicleBomb_StopTimer", function() {
            var main = window.__MAIN;
            clearInterval(main.timer.interval);
            main.timer.interval = null;
            main.timer.style.display = "none";
            main.timer.style.color = "white";
            main.timer.innerHTML = "00:00.00";
            
            clearInterval(main.tick.interval);
            main.tick.interval = null;
        });
        
        jcmp.AddEvent("VehicleBomb_Timer", function() {
            window.__MAIN.playTick();
        });
        jcmp.AddEvent("VehicleBomb_Detonate", function() {
            window.__MAIN.detonate();
        });
        jcmp.AddEvent("VehicleBomb_DetonateBombOk", function() {
            window.__MAIN.blowup1();
        });
        
        jcmp.AddEvent("VehicleBomb_OpenNotInVehicle", function() {
            var main = window.__MAIN;
            main.showMessage("You must be in any vehicle to begin installation of a bomb.");
            main.isInVehicle = false;
        });
        
        jcmp.AddEvent("VehicleBomb_OpenSomeVehicleAlreadyArmedByYou", function() {
            var main = window.__MAIN;
            main.showMessage("You don't have bombs anymore. Detonate already installed bomb and get new.");
        });
        
        jcmp.AddEvent("VehicleBomb_OpenThisVehicleAlreadyArmedBySomeone", function() {
            var main = window.__MAIN;
            main.showMessage("There is no place to set the bomb. It is strange, isn't it?");
        });
        
        jcmp.AddEvent("VehicleBomb_SetBombNotInVehicle", function() {
            var main = window.__MAIN;
            main.showMessage("<b style='color: red;'>Error:</b> You must be in any vehicle to set the bomb.");
            main.isInVehicle = false;
        });
        
        jcmp.AddEvent("VehicleBomb_SetBombSomeVehicleAlreadyArmedByYou", function() {
            var main = window.__MAIN;
            main.showMessage("What do you try to do? You can't install more than one bomb.");
        });
        
        jcmp.AddEvent("VehicleBomb_SetBombThisVehicleAlreadyArmedBySomeone", function() {
            var main = window.__MAIN;
            main.showMessage("It can strange sound, but there is no place for installation of a bomb.");
        });
        
        jcmp.AddEvent("VehicleBomb_SetBombSomethingWrong", function() {
            var main = window.__MAIN;
            main.showMessage("Oops.. Something went wrong.");
        });
        
        jcmp.AddEvent("VehicleBomb_SetBombOk", function() {
            var main = window.__MAIN;
            var message = "Okay. Your car is armed.";
            switch(main.data["type"]) {
                case "sensor":
                    message = "If someone will enter in this vehicle, it will BOOM."
                    break;
                
                case "timer":
                    main.startTimer();
                    message = "Alright. It's armed. Don't forget about timer!";
                    break;
                
                case "detonator":
                    message = "Nice! Exit from vehicle and press <b>"+main.detonatorSelectedKeyString+"</b> to blow up it.";
                    break;
            }
            main.showMessage(message);
            main.set.style.display = "none";
            jcmp.HideCursor();
        });
    }
    
    this.ce = function(event, data) {
        var main = window.__MAIN;
        /*var output;
        if(data == undefined) {
            output = "Event \""+event+"\"";
        } else {
            output = "Event \""+event+"\" ||| "+data;
        }
        main.showMessage(output);*/
        if(data == undefined) {
            jcmp.CallEvent(event);
        } else {
            jcmp.CallEvent(event, data);
        }
    }
    
    this.setReady = function(el, ir, changeColor, customColor) {
        el.isReady = ir;
        if(ir == false) {
            if(changeColor || typeof changeColor == "undefined") {
                el.style.backgroundColor = (typeof customColor == "string" ? customColor : "grey");
            }
            el.tabIndex = true;
        } else if(ir == true) {
            if(changeColor || typeof changeColor == "undefined") {
                el.style.backgroundColor = (typeof customColor == "string" ? customColor : "green");
            }
            el.removeAttribute("tabIndex");
        }
    }
    
    this.setBomb = function() {
        var main = window.__MAIN;
        if(! main.isInVehicle) {
            main.showMessage("<b style='color: red;'>Error:</b> You must be in any vehicle to set the bomb.");
            return;
        }
        
        main.data = {};
        
        type = "sensor";
        
        if(main.typeTimer.checked) {
            type = "timer";
        } else if(main.typeDetonator.checked) {
            type = "detonator";
        }
        
        if(type == "detonator" && main.detonatorSelectedKey == null) {
            main.showMessage("Please, select any key for detonation.");
            return;
        }
        
        main.data["type"] = type;
        main.data["timer"] = main.countedTime;
        console.log.apply(console, ["setBomb", main.data]);
        main.ce("VehicleBomb_SetBomb", JSON.stringify(main.data));
    }
    
    this.startTimer = function() {
        this.timer.style.display = "";
        this.timeUntil = this.countedTime * 1000 + (new Date).getTime();
        this.playTick();
        this.timer.detonateCalled = false;
        this.timer.interval = setInterval(function() {
            var main = window.__MAIN;
            var now = (new Date).getTime();
            main.left = (main.timeUntil - now) / 1000;
            if(main.left - 1 <= 0 && ! main.timer.detonateCalled) {
                main.timer.detonateCalled = true;
                main.detonate();
            }
            if(main.left <= 0) {
                clearInterval(main.timer.interval);
                main.timer.interval = null;
                main.timer.style.display = "none";
                main.timer.style.color = "white";
                main.timer.innerHTML = "00:00.00";
                return;
            }
            var days = Math.floor(main.left / 86400);
            var hours = Math.floor(main.left / 60 / 60 - days * 24);
            var minutes = Math.floor(main.left / 60 - Math.floor(main.left / 60 / 60) * 60);
            var seconds = ((main.left - hours * 3600 - days * 86400 - minutes * 60));
            minutes = minutes+"";
            if(minutes.length == 1) {
                minutes = "0"+minutes;
            }
            var s = Math.floor(seconds)+"";
            seconds = seconds.toFixed(2);
            seconds = seconds+"";
            if(s.length == 1) {
                seconds = "0"+seconds;
            }
            main.timer.innerHTML = minutes+":"+seconds;
        }, 10);
    }
    
    this.countTime = function() {
        this.countedTime = parseInt(this.minutes.value) * 60 + parseInt(this.seconds.value);
    }
    
    this.blowup = function() {
        window.__MAIN.ce("VehicleBomb_DetonateBomb");
    }
    
    this.bombHasBeenDefused = function() {
        // Counter-Terrorists win
        var main = window.__MAIN;
        setTimeout(function() {
            main.closeDefuser();
            main.stopDefuseCodeChangement();
        }, 500, main);
        main.ce("VehicleBomb_BombHasBeenDefused");
    }
    
    this.defuseHasBeenFailed = function() {
        // Terrorists win
        var main = window.__MAIN;
        setTimeout(function() {
            main.closeDefuser();
        }, 500, main);
        main.stopDefuseCodeChangement();
        main.lockAllNumbersAndSaveColors();
        main.ce("VehicleBomb_DefuseHasBeenFailed");
    }
    
    this.openDefuser = function() {
        var main = window.__MAIN;
        main.defuser.style.display = "";
        main.startDefuseCodeChangement();
        jcmp.ShowCursor();
    }
    
    this.closeDefuser = function() {
        var main = window.__MAIN;
        main.defuser.style.display = "none";
        //main.stopDefuseCodeChangement();
        jcmp.HideCursor();
        main.ce("VehicleBomb_CloseDefuser");
    }
    
    this.blowup1 = function() {
        var main = window.__MAIN;
        main.detonator.currentTime = 0;
        main.detonator.play();
    }
    
    this.playTick = function() {
        var main = window.__MAIN;
        main.tick.currentTime = 0;
        main.tick.volume = 0.5;
        main.tick.play();
        main.tick.interval = setInterval(function() {
            main.timer.style.color = "red";
            main.tick.onended = function() {
                var main = window.__MAIN;
                if(main.left < 1) {
                    main.timer.style.color = "red";
                    return;
                }
                window.__MAIN.timer.style.color = "white";
            }
            main.tick.currentTime = 0;
            main.tick.play();
        }, 1000, main);
    }
    
    this.detonate = function() {
        var main = window.__MAIN;
        if(main.tick.interval != null) {
            clearInterval(main.tick.interval);
            main.tick.interval = null;
        }
        if(main.defuser.style.display == "" && main.detonatedByFailedDefuse == false) {
            main.stopDefuseCodeChangement();
            main.lockAllNumbersAndChangeColorsTo("red");
            setTimeout(function() {
                main.closeDefuser();
            }, 500, main);
        }
        main.onblowup.currentTime = 0;
        main.onblowup.play();
        main.detonatedByFailedDefuse = false;
    }
    
    this.lockAllNumbersAndChangeColorsTo = function(color) {
        var main = window.__MAIN;
        main.setReady(main.def1, true, true, color);
        main.setReady(main.def2, true, true, color);
        main.setReady(main.def3, true, true, color);
        main.setReady(main.def4, true, true, color);
    }
    
    this.lockAllNumbersAndSaveColors = function() {
        var main = window.__MAIN;
        main.setReady(main.def1, true, false);
        main.setReady(main.def2, true, false);
        main.setReady(main.def3, true, false);
        main.setReady(main.def4, true, false);
    }
    
    this.showMessage = function(text) {
        if(this.message.timeout != null) {
            clearTimeout(this.message.timeout);
        }
        this.message.innerHTML = text;
        this.message.style.display = "";
        this.message.oc = 1;
        this.message.style.opacity = this.message.oc;
        this.message.timeout = setTimeout(function() {
            var main = window.__MAIN;
            main.message.oc = 1;
            main.message.style.opacity = main.message.oc;
            main.message.interval = setInterval(function() {
                if(main.message.oc <= 0) {
                    main.message.style.display = "none";
                    clearInterval(main.message.interval);
                    return;
                }
                main.message.oc -= 0.03;
                main.message.style.opacity = main.message.oc;
            }, 10, main);
        }, 5000);
    }
    
    this.rand = function(min, max) {
        if(min == undefined || max == undefined) {
            return null;
        }
        min = parseInt(min, 10)
        max = parseInt(max, 10)
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    this.startDefuseCodeChangement = function() {
        var main = window.__MAIN;
        
        var _interval = 200;
        main.def1.innerHTML = main.rand(0, 9);
        main.def2.innerHTML = main.rand(0, 9);
        main.def3.innerHTML = main.rand(0, 9);
        main.def4.innerHTML = main.rand(0, 9);
        
        main.setReady(main.def1, false);
        main.setReady(main.def2, false);
        main.setReady(main.def3, false);
        main.setReady(main.def4, false);
        
        main.def1interval = setInterval(function() {
            if(parseInt(main.def1.innerHTML) == 9) {
                main.def1.innerHTML = 0;
            } else {
                main.def1.innerHTML = parseInt(main.def1.innerHTML) + 1;
            }
        }, _interval, main);
        
        main.def2interval = setInterval(function() {
            if(parseInt(main.def2.innerHTML) == 9) {
                main.def2.innerHTML = 0;
            } else {
                main.def2.innerHTML = parseInt(main.def2.innerHTML) + 1;
            }
        }, _interval, main);
        
        main.def3interval = setInterval(function() {
            if(parseInt(main.def3.innerHTML) == 9) {
                main.def3.innerHTML = 0;
            } else {
                main.def3.innerHTML = parseInt(main.def3.innerHTML) + 1;
            }
        }, _interval, main);
        
        main.def4interval = setInterval(function() {
            if(parseInt(main.def4.innerHTML) == 9) {
                main.def4.innerHTML = 0;
            } else {
                main.def4.innerHTML = parseInt(main.def4.innerHTML) + 1;
            }
        }, _interval, main);
    }
    
    this.stopDefuseCodeChangement = function() {
        var main = window.__MAIN;
        
        if(main.def1interval != null) {
            clearInterval(main.def1interval);
            main.def1interval = null;
        }
        
        if(main.def2interval != null) {
            clearInterval(main.def2interval);
            main.def2interval = null;
        }
        
        if(main.def3interval != null) {
            clearInterval(main.def3interval);
            main.def3interval = null;
        }
        
        if(main.def4interval != null) {
            clearInterval(main.def4interval);
            main.def4interval = null;
        }
    }
    
    this.getKeyByCode = function(code) {
        var result = "";
        switch(code) {
            case 8:
                result = "backspace"; 
                break;
            
            case 9:
                result = "tab"; 
                break;
            
            case 13:
                result = "enter"; 
                break;
            
            case 16:
                result = "shift"; 
                break;
            
            case 17:
                result = "ctrl"; 
                break;
            
            case 18:
                result = "alt"; 
                break;
            
            case 19:
                result = "pause/break"; 
                break;
            
            case 20:
                result = "caps lock"; 
                break;
            
            case 27:
                result = "escape"; 
                break;
            
            case 33:
                result = "page up"; 
                break;
            
            case 34:
                result = "page down"; 
                break;
            
            case 35:
                result = "end"; 
                break;
            
            case 36:
                result = "home"; 
                break;
            
            case 37:
                result = "left arrow"; 
                break;
            
            case 38:
                result = "up arrow"; 
                break;
            
            case 39:
                result = "right arrow"; 
                break;
            
            case 40:
                result = "down arrow"; 
                break;
            
            case 45:
                result = "insert"; 
                break;
            
            case 46:
                result = "delete"; 
                break;
            
            case 91:
                result = "left window"; 
                break;
            
            case 92:
                result = "right window"; 
                break;
            
            case 93:
                result = "select key"; 
                break;
            
            case 96:
                result = "numpad 0"; 
                break;
            
            case 97:
                result = "numpad 1"; 
                break;
            
            case 98:
                result = "numpad 2"; 
                break;
            
            case 99:
                result = "numpad 3"; 
                break;
            
            case 100:
                result = "numpad 4"; 
                break;
            
            case 101:
                result = "numpad 5"; 
                break;
            
            case 102:
                result = "numpad 6"; 
                break;
            
            case 103:
                result = "numpad 7"; 
                break;
            
            case 104:
                result = "numpad 8"; 
                break;
            
            case 105:
                result = "numpad 9"; 
                break;
            
            case 106:
                result = "multiply"; 
                break;
            
            case 107:
                result = "add"; 
                break;
            
            case 109:
                result = "subtract"; 
                break;
            
            case 110:
                result = "decimal point"; 
                break;
            
            case 111:
                result = "divide"; 
                break;
            
            case 112:
                result = "F1"; 
                break;
            
            case 113:
                result = "F2"; 
                break;
            
            case 114:
                result = "F3"; 
                break;
            
            case 115:
                result = "F4"; 
                break;
            
            case 116:
                result = "F5"; 
                break;
            
            case 117:
                result = "F6"; 
                break;
            
            case 118:
                result = "F7"; 
                break;
            
            case 119:
                result = "F8"; 
                break;
            
            case 120:
                result = "F9"; 
                break;
            
            case 121:
                result = "F10"; 
                break;
            
            case 122:
                result = "F11"; 
                break;
            
            case 123:
                result = "F12"; 
                break;
            
            case 144:
                result = "num lock"; 
                break;
            
            case 145:
                result = "scroll lock"; 
                break;
            
            case 186:
                result = ";"; 
                break;
            
            case 187:
                result = "="; 
                break;
            
            case 188:
                result = ","; 
                break;
            
            case 189:
                result = "-"; 
                break;
            
            case 190:
                result = "."; 
                break;
            
            case 191:
                result = "/"; 
                break;
            
            case 192:
                result = "`"; 
                break;
            
            case 219:
                result = "["; 
                break;
            
            case 220:
                result = "\\"; 
                break;
            
            case 221:
                result = "]"; 
                break;
            
            case 222:
                result = "'"; 
                break;
            
            case 49:
                result = "1";
                break;
            
            case 50:
                result = "2";
                break;
            
            case 51:
                result = "3";
                break;
            
            case 52:
                result = "4";
                break;
            
            case 53:
                result = "5";
                break;
            
            case 54:
                result = "6";
                break;
            
            case 55:
                result = "7";
                break;
            
            case 56:
                result = "8";
                break;
            
            case 57:
                result = "9";
                break;
            
            case 48:
                result = "0";
                break;
            
            case 81:
                result = "q";
                break;
            
            case 87:
                result = "w";
                break;
            
            case 69:
                result = "e";
                break;
            
            case 82:
                result = "r";
                break;
            
            case 84:
                result = "t";
                break;
            
            case 89:
                result = "y";
                break;
            
            case 85:
                result = "u";
                break;
            
            case 73:
                result = "i";
                break;
            
            case 79:
                result = "o";
                break;
            
            case 80:
                result = "p";
                break;
            
            case 65:
                result = "a";
                break;
            
            case 83:
                result = "s";
                break;
            
            case 68:
                result = "d";
                break;
            
            case 70:
                result = "f";
                break;
            
            case 71:
                result = "g";
                break;
            
            case 72:
                result = "h";
                break;
            
            case 74:
                result = "j";
                break;
            
            case 75:
                result = "k";
                break;
            
            case 76:
                result = "l";
                break;
            
            case 90:
                result = "z";
                break;
            
            case 88:
                result = "x";
                break;
            
            case 67:
                result = "c";
                break;
            
            case 86:
                result = "v";
                break;
            
            case 66:
                result = "b";
                break;
            
            case 78:
                result = "n";
                break;
            
            case 77:
                result = "m";
                break;
                
            case 32:
                result = "space";
                break;
            
            default: 
                result = "unknown";
                break;
        }
        return result;
    }
}
