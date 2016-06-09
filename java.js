/**
 * Created by NinaYoda on 2016-03-29.
 */
var countAddresses =0;
function updateMap(lat, lng){
    console.log('clicked li');

    map.setCenter(new google.maps.LatLng(lat,lng));

    $.ajax({
        url: "https://api.forecast.io/forecast/48d7cee12051e7e0ceff91fb9a1affb2/" + lat + "," + lng +"",
        data: {
            "units": "si",
        },
        dataType: "jsonp",
        crossDomain: true,
        success: function (result) {
            var temperature =document.createElement("i");
            var cloudcover =document.createElement("i");
            var windspeed =document.createElement("i");
            var humidity =document.createElement("i");

            temperature.setAttribute("class", "wi wi-celsius icon");
            cloudcover.setAttribute("class", "wi wi-cloudy icon");
            windspeed.setAttribute("class", "wi wi-strong-wind icon");
            humidity.setAttribute("class", "wi wi-humidity icon");

            $("#temperature").text("Temperature: " + result.currently.temperature);
            document.getElementById("temperature").appendChild(temperature);
            console.log("Temperature: "+result.currently.temperature);

            $("#cloudCover").text("Cloud cover: " + result.currently.cloudCover);
            document.getElementById("cloudCover").appendChild(cloudcover);
            console.log("Cloudcover: "+result.currently.cloudcover);

            $("#windSpeed").text("Wind speed: " + result.currently.windSpeed);
            document.getElementById("windSpeed").appendChild(windspeed);
            console.log("Windspeed: "+result.currently.windspeed);

            $("#humidity").text("Humidity: " + result.currently.humidity);
            document.getElementById("humidity").appendChild(humidity);
            console.log(result.currently.humidity);

            console.log(result);
            console.dir(result);
        }
    });

}

$(document).ready(function() {


    $("#search").keypress(function (e) {
        if (e.which == 13) {

            var googleKey = "AIzaSyCK77gFQjayNkeUhTA2YNJdw--r7iGGNQE";
            var searchText = document.getElementById("search").value;
            document.getElementById("search").value ="";

            $.ajax({
                url: "https://maps.googleapis.com/maps/api/geocode/json",
                data: {
                    "key": googleKey,
                    "address": searchText
                },
                dataType: "json",
                crossDomain: true,
                success: function (result) {
                    console.log(result);
                    console.dir(result);
                    if (countAddresses >= 10) {
                        $("ul").html("");
                    }

                    if (result.results.length > 0) {
                        for (x in result.results) {
                            var li = document.createElement("li");
                            var a = document.createElement("a");

                            li.innerHTML = result.results[x].formatted_address;

                            li.setAttribute("value", "{'lat':" + result.results[x].geometry.location.lat + ",'lng':" + result.results[x].geometry.location.lng + "}");
                            li.setAttribute("onClick", "updateMap(" + result.results[x].geometry.location.lat + "," + result.results[x].geometry.location.lng + ")");
                            $('ul').prepend(li);
                            countAddresses++;
                        }
                    }

                }
            });

        return false;
        }
    });
})