$(document).ready(function(){
    $('html').css('height',$(window).height());
	$('main').css("height",$('body').height()-$('footer').innerHeight()); //innerheight() is height including padding but not border
	$( window ).resize(function() {
		$('html').css('height',$(window).height());
		$('main').css("height",$('body').height()-$('footer').innerHeight());
	});
    
    $("#searchBar button").click(getWeather);
        
    function getWeather(){
        var userLocation = $('#locationInput').val();
        var userUrl = "http://api.openweathermap.org/data/2.5/weather?q="+userLocation+"&units=metric&APPID=9ff0ea3fc4229de7fc7df29f32c9427b";
        $.getJSON(userUrl, function(result){
            $("#location").text(result.name+', '+result.sys.country);
            $("#coord").text("Lon: "+result.coord.lon+" | Lat: "+result.coord.lat);
            $("#mainTemp").text(Math.round(result.main.temp)+"°C");
            $("#windSpeed").text(result.wind.speed+"m/s");
            $("#dateTime").text("Last updated: "+result.dt);
        });
    };
})