$(document).ready(function(){
    $('html').css('height',$(window).height());
	$('main').css("height",$('body').height()-$('footer').innerHeight()); //innerheight() is height including padding but not border
	$( window ).resize(function() {
		$('html').css('height',$(window).height());
		$('main').css("height",$('body').height()-$('footer').innerHeight());
	});
    
    $("button").click(getWeather);
        
    function getWeather(){
        var userLocation = $('#locationInput').val();
        console.log(userLocation);
        var userUrl = "http://api.openweathermap.org/data/2.5/weather?q="+userLocation+"&APPID=9ff0ea3fc4229de7fc7df29f32c9427b";
        $.getJSON(userUrl, function(result){
            $("#location").text(result.name+', '+result.sys.country);
            $("#coord").text("Lon: "+result.coord.lon+" | Lat: "+result.coord.lat);
            $("#dateTime").append(result.dt);
        });
    };
})