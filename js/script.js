$(document).ready(function(){

    /*Initialise variables*/
    var userLocation, userURL, d, updateTime, unit, symWind, symTemp, temp, wind, deg, tempMetric, tempFarenheit, windMetric, windFarenheit, sunset, sunrise, icon;
    
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
        userUrl = "http://api.openweathermap.org/data/2.5/weather?q="+location+"&APPID=9ff0ea3fc4229de7fc7df29f32c9427b";
        $.getJSON(userUrl, function(result){
            $("#location").text(result.name+', '+result.sys.country);
            $("#coord").text("Lon: "+result.coord.lon+" | Lat: "+result.coord.lat);
            $("#desc").html(result.weather[0].description);
            
            tempMetric = result.main.temp - 273.15;
            tempFarenheit = result.main.temp * 9/5 - 459.67;
            windMetric = result.wind.speed;
            windFarenheit = windMetric*2.24;
            deg = result.wind.deg;
            liveSwitch();
            
            updateTime = result.dt;
            d = new Date(updateTime*1000); //multiply by 1000 because result.dt is in seconds, while Date() works with milliseconds
            $("#dateTime").text("Weather data last acquired: "+d.toTimeString());
            sunrise = result.sys.sunrise;
            sunset = result.sys.sunset;
            /* adjusting sunrise/sunset days to take into account timezones: sunrise/sunset data given by openweathermap are related
            to the current day in UTC timezone, so need adjusting by +/- 1 day i.e. 84600 seconds
            if a timezone has not yet reached / has already passed that day */
            //console.log(result.weather[0].icon, result.weather[0].id, updateTime, sunrise, sunset);
            if (updateTime<sunrise && updateTime<sunset-84600){
                sunrise=sunrise-84600;
                sunset=sunset-84600;
            } else if (updateTime>sunset && updateTime>sunrise+84600){
                sunrise=sunrise+84600;
                sunset=sunset+84600;
            }
            //console.log(sunrise, sunset);
            /*normally compare time to sunrise / sunset to define day or night weather icon */
            if (updateTime<sunrise || updateTime>sunset){
                icon='night';
            } else {
                icon='day';
            }
            $('#weatherIcon i').removeClass().addClass('wi wi-owm-'+icon+'-'+result.weather[0].id);
        });
    }

    function liveSwitch(){
        unit = $('input[type="checkbox"]').prop('checked')? 'imperial' : 'metric';
        symTemp = (unit=='metric')? '°C' : '°F';
        symWind = (unit=='metric')? 'm/s' : 'mph';
        temp = unit=='metric'? tempMetric : tempFarenheit;
        wind = unit=='metric'? windMetric : windFarenheit;
        $("#mainTemp").html(Math.round(temp)+"<span class='greyText'>"+symTemp+"</span>");
        $("#windSpeed").html('<i class="wi wi-wind towards-'+Math.round(deg)+'-deg"></i>'+Math.round(wind)+"<span class='greyText'>"+symWind+"</span>");
    }
})