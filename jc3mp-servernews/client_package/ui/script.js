var config;
	
function getconfig() {
	//request config from main..
	jcmp.CallEvent("requestservernewsconfig");

	//receive config from main..
	jcmp.AddEvent("receiveservernewsconfig", (strconfig) => {
		config = JSON.parse(strconfig);
		applyconfig();
	});
}
	
function applyconfig(){
//builds up the html

	//build the topper..
		document.getElementById('topper').innerHTML = config.topper;	
	//build the headlines (right side column titles)
		var headlineshtml = '';
		for(var i=0;i<config.newsitems.length;i++){
			headlineshtml += `<li data-target='#newsSlider' data-slide-to='${i}' class='list-group-item' id='headline${i}'><h4>${config.newsitems[i].title}</h4></li>`
		}
		//and don't forget the button..
		headlineshtml += `<button type='button' id='continue' class='btn btn-primary'>Continue to Server</button>`;
		//then write the html into the div
		document.getElementById('headlines').innerHTML = headlineshtml;
		//and make the first one active
		document.getElementById('headline0').className = 'list-group-item active';
	//
	
	//building each news item...
		var newsfeatureshtml = '';
		for(var i=0;i<config.newsitems.length;i++){
			newsfeatureshtml += `<div class='item' id='newsitem${i}'>`;
			if (config.newsitems[i].mediatype == 'video'){
				newsfeatureshtml += `<video name='newsvideo' width="100%" controls style='display:block'><source src='${config.newsitems[i].mediauri}'></video>`;
			}
			else{
				newsfeatureshtml += `<img src='${config.newsitems[i].mediauri}'>`;
			}
			newsfeatureshtml += `<div class='carousel-caption'><h4><a href='#'>${config.newsitems[i].title}</a></h4><p>${config.newsitems[i].text}</p></div></div><!-- End Item -->`;
		}
		//then write the html into the div
		document.getElementById('newsfeatures').innerHTML = newsfeatureshtml;
		//and make the first one active
		document.getElementById('newsitem0').className = 'item active';
	//
	
	//mute all videos by default, because we don't want edgy kids spamming our beloved players with Rick
	videos = document.getElementsByName('newsvideo');
	for(var i=0;i<videos.length;i++){
		videos[i].volume = 0;
	}
	
	afterhtml();
}
function afterhtml(){	
//does the click events and deals with toggling news visibility and cursor.
	var thepage = document.getElementById('page');
	jcmp.ShowCursor();
	
	document.getElementById('continue').addEventListener('click', function() {
		togglepage(thepage);
	});
	  
	jcmp.AddEvent("openservernews", () => {
		togglepage(thepage);
	});
	  
	function togglepage(thepage){
		if (thepage.style.display !== 'none') {
			jcmp.HideCursor();
			thepage.style.display = 'none';
			videos = document.getElementsByName('newsvideo');
			for(var i=0;i<videos.length;i++){
				videos[i].pause();
			}

		}
			
		else {
			jcmp.ShowCursor();
			thepage.style.display = 'block';
		}

	}
		
      $(document).ready(function() {

        var clickEvent = false;

        $('#newsSlider').carousel({
          interval: 4000
        }).on('click', '.list-group li', function() {
            clickEvent = true;
            $('.list-group li').removeClass('active');
            $(this).addClass('active');
        }).on('slid.bs.carousel', function(e) {
          if(!clickEvent) {
            var count = $('.list-group').children().length - 2;
            var current = $('.list-group li.active');
            current.removeClass('active').next().addClass('active');
            var id = parseInt(current.data('slide-to'));
            if(count == id) {
              $('.list-group li').first().addClass('active');
            }
            $('.btn-primary').removeClass('active');
          }

          clickEvent = false;
		  
        });
      });	  
}
