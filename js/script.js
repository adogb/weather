$(document).ready(function(){
    $('html').css('height',$(window).height());
	$('main').css("height",$('body').height()-$('footer').innerHeight()); //innerheight() is height including padding but not border
	$( window ).resize(function() {
		$('html').css('height',$(window).height());
		$('main').css("height",$('body').height()-$('footer').innerHeight());
	});

    $("#searchBar button").click(getWeather);
    /*and to handle Enter key press - some browsers use 'keyCode', some use 'which' - 13 is keyCode for Enter */
    $("#locationInput").keydown(function(event){
        if ((event.keyCode || event.which)==13){
            getWeather();
        }
    });
     $('#unitSwitch').click(function(){
         liveSwitch();
     });
    
    var userLocation, userURL, d, unit, sym;
    function getWeather(){
        unit = $('input[type="checkbox"]').prop('checked')? 'imperial' : 'metric';
        sym = (unit=='metric')? '°C' : '°F';
        userLocation = $('#locationInput').val();
        userUrl = "http://api.openweathermap.org/data/2.5/weather?q="+userLocation+"&units="+unit+"&APPID=9ff0ea3fc4229de7fc7df29f32c9427b";
        $.getJSON(userUrl, function(result){
            $("#location").text(result.name+', '+result.sys.country);
            $("#coord").text("Lon: "+result.coord.lon+" | Lat: "+result.coord.lat);
            $("#mainTemp").html(Math.round(result.main.temp)+"<span class='greyText'>"+sym+"</span>");
            $("#windSpeed").html(Math.round(result.wind.speed)+"<span class='greyText' style='font-size:2.5rem'>m/s</span>");
            d = new Date();
            $("#dateTime").text("Last updated: "+d.toLocaleTimeString());
        })
    }

    function liveSwitch(){
        unit = $('input[type="checkbox"]').prop('checked')? 'imperial' : 'metric';
        sym = (unit=='metric')? '°C' : '°F';
        userUrl = "http://api.openweathermap.org/data/2.5/weather?q="+userLocation+"&units="+unit+"&APPID=9ff0ea3fc4229de7fc7df29f32c9427b";
        $.getJSON(userUrl, function(result){
            $("#mainTemp").html(Math.round(result.main.temp)+"<span class='greyText'>"+sym+"</span>");
        })
    }
})