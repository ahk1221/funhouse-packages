function Main() {
    
    this.h = document.getElementById("height");
    this.b = document.getElementById("heightBlock");
    this.c = document.getElementById("centerLine");
    this.d = document.getElementById("digital");
    this.a = document.getElementById("advice");
    this.interval = null;
    this.height = 1024;
    this.hidden = false;
    this.color = false;
    
    this.main = function() {
        this.interval = setInterval(this.getHeight, 100);
        this.hide();
        this.setColor("white");
        window.onkeydown = function(e) {
            if(e.which == 45 /*INSERT*/) {
                var main = window.__MAIN;
                if(main.hidden || main.color == "black") {
                    main.toggle();
                } else if(main.color == "white") {
                    main.setColor("black");
                }
                main.b.style.borderTop =
                main.b.style.borderBottom = 
                main.c.style.borderLeft = 
                main.c.style.borderTop = "3px solid " + main.color;
            }
        }
        
        // Next 2 events works ONLY WITH planes and helicopters. It's ignoring any other vehicles.
        jcmp.AddEvent("HeightIndicator_PlayerVehicleEntered", this.show);
        jcmp.AddEvent("HeightIndicator_PlayerVehicleExited", this.hide);
        jcmp.AddEvent("HeightIndicator_OnReturn", this.updateHeight);
    }
    
    this.setColor = function(color) {
        var main = window.__MAIN;
        main.color = color;
        main.b.style.borderTop =
        main.b.style.borderBottom = 
        main.c.style.borderLeft = 
        main.c.style.borderTop = "3px solid " + main.color;
    }
    
    this.show = function() {
        var main = window.__MAIN;
        main.hidden = false;
        main.b.style.display = main.d.style.display = "";
        document.body.removeChild(main.a);
    }
    
    this.hide = function() {
        var main = window.__MAIN;
        main.hidden = true;
        main.b.style.display = main.d.style.display = "none";
    }
    
    this.toggle = function() {
        var main = window.__MAIN;
        if(main.hidden) {
            main.show();
        } else {
            main.hide();
            main.setColor("white");
        }
    }
    
    this.getHeight = function() {
        jcmp.CallEvent("HeightIndicator_GetHeight");
    }
    
    this.countHeightPercent = function(height) {
        height = parseFloat(height);
        height = Math.floor(height);
        var min = 1024, max = 6000;
        
        if(height <= min) {
            return 0;
        } else if(height >= max) {
            return 100;
        }
        
        var bottom = 0, top = max - min, h = height - min;
        
        //return Math.floor(h / top * 100);
        return parseFloat((h / top * 100).toFixed(2));
    }
    
    this.updateHeight = function(height) {
        var main = window.__MAIN;
        height = parseFloat(height);
        main.height = height;
        
        main.d.innerHTML = Math.floor(height - 1024) + " M";
        main.h.style.top = (100 - main.countHeightPercent(height)).toString() + "%";
    }
}
