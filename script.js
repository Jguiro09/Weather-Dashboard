// GIVEN a weather dashboard with form inputs


// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// Weather one API? List Element, list.length remove child

// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// Implemented in weather API? If not, array of the info, object grab and implement it into.

// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// If (number) then (change background color)

// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// Look inside API if they provide 5 day forcast, if not call for multiple days. Array object input for both. If statements for weather conditions. Array object input for temp wind and humidity.

// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
// Fetch when clicked. LI contains info
// Capped at 5
// Saves even when refreshed

// Function PREDICTIONS------------------------------------------------------------------
// Eventlistener function for taking in search
// Create API Link
// Fetch City Data Function
// Add city to history
// Output for top information for current day ()
// Output for the 5 day forcast (Bootstrap card)
// Localstorage get / set

// API INFO ----------------------------------------------------------------------------
// 5 Day / 3 Hour Forecast
// Current weather data

//- -------------------------------------------
console.log("connected!");
//HTML Recalls
var submitBtn = $('#submitBtn');
var dayTemp = $('#dayTemp');
var dayWind = $('#dayWind');
var dayUV = $('#dayUV');
var dayHumidity = $('#dayHumidity');
var dayCity = $('#dailyCity');

submitBtn.click(function ()
{
    var userInput = $('#userInfo').val();
    console.log(userInput);
    getAPI();
})

function getAPI()
{
    fetch('https://api.openweathermap.org/data/2.5/weather?q=houston&units=imperial&appid=8a393f02d01e324fee60ee71877cc93c')
        .then(function (response) {
            return response.json();
        })
        .then(function (data)
        {
            console.log(data)
            dayCity.text(data.name);
            dayTemp.text("Temp: " + data.main.temp + "°F");
            dayWind.text("Wind: " + data.wind.speed + " MPH");
            dayHumidity.text("Humidity: " + data.main.humidity + "%");

            fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + data.coord.lat + '&lon=' + data.coord.lon + '&exclude=hourly,daily,alerts&appid=8a393f02d01e324fee60ee71877cc93c')
                .then(function (response)
                {
                    return response.json();
                })
                .then(function (data2)
                    {
                        console.log(data2);
                        dayUV.text("UV Index:" + data2.current.uvi)
                    }
                )
        })
}
