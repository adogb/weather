$(document).ready(function(){

    /*Initialise variables*/
    var userLocation, userURL, d, unit, sym, temp, tempMetric, tempFarenheit, sunset, sunrise;
    
    /* Initialise with a city to avoid blank page */
    getWeather('Saint Tropez');

    /* Event handler when the search button is clicked*/
    $("#searchBar button").click(function(){
        userLocation = $('#locationInput').val();
        getWeather(userLocation);
    });

    /* Event handler for Enter key press - some browsers use 'keyCode', some use 'which' - 13 is keyCode for Enter */
    $("#locationInput").keydown(function(event){
        if ((event.keyCode || event.which)==13){
            userLocation = $('#locationInput').val();
            getWeather(userLocation);
        }
    });

    /* Switch unit metric/imperial */
    $('#unitSwitch').click(function(){
        liveSwitch();
    });

    /*Functions declarations*/
    function getWeather(location){
        d = new Date();
        $("#dateTime").text("Last updated: "+d.toLocaleTimeString());
        unit = $('input[type="checkbox"]').prop('checked')? 'imperial' : 'metric';
        sym = (unit=='metric')? '°C' : '°F';
        userUrl = "http://api.openweathermap.org/data/2.5/weather?q="+location+"&APPID=9ff0ea3fc4229de7fc7df29f32c9427b";
        $.getJSON(userUrl, function(result){
            $("#location").text(result.name+', '+result.sys.country);
            $("#coord").text("Lon: "+result.coord.lon+" | Lat: "+result.coord.lat);
            tempMetric = result.main.temp - 273.15;
            tempFarenheit = result.main.temp * 9/5 - 459.67;
            temp = unit=='metric'? tempMetric : tempFarenheit;
            $("#mainTemp").html(Math.round(temp)+"<span class='greyText'>"+sym+"</span>");
            $("#windSpeed").html('<i class="wi wi-wind towards-'+Math.round(result.wind.deg)+'-deg"></i>'+Math.round(result.wind.speed)+"<span class='greyText'>m/s</span>");
            /*sunrise = result.sys.sunrise;
            sunset = result.sys.sunset;
            console.log(result.dt, sunrise, sunset);*/
            console.log(result.weather[0].id+" "+result.weather[0].icon);
            $('#weatherIcon i').removeClass().addClass('wi wi-owm-'+result.weather[0].id);
            $("#desc").html(result.weather[0].description);
        });
    }

    function liveSwitch(){
        unit = $('input[type="checkbox"]').prop('checked')? 'imperial' : 'metric';
        sym = (unit=='metric')? '°C' : '°F';
        temp = unit=='metric'? tempMetric : tempFarenheit;
        $("#mainTemp").html(Math.round(temp)+"<span class='greyText'>"+sym+"</span>");
    }
})