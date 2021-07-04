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

//- -------------------------------------------
console.log("connected!");
//HTML Recalls
var submitBtn = $('#submitBtn');
var dayTemp = $('#dayTemp');
var dayWind = $('#dayWind');
var dayUV = $('#dayUV');
var dayHumidity = $('#dayHumidity');
var dayCity = $('#dailyCity');
var dayIcon = $('#dayIcon');
var recentSearch = $('#recentSearch');
var currentDayWeather = $('#currentDayWeather');
var fiveDayWeather = $('#fiveDayWeather');

// Javascript Variables
var userInput
var saveCity = [];

submitBtn.click(function ()
{
    userInput = $('#userInfo').val();
    updateDiv();
    getAPI();
    save();
    display();
})

function getAPI()
{
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + userInput + '&units=imperial&appid=8a393f02d01e324fee60ee71877cc93c')
        .then(function (response) {
            return response.json();
        })
        .then(function (data)
        {
            console.log(data)
            dayCity.text(data.name + " " +moment().format('MM/DD/YYYY'));

            fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + data.coord.lat + '&lon=' + data.coord.lon + '&exclude=hourly,alerts&units=imperial&appid=8a393f02d01e324fee60ee71877cc93c')
                .then(function (response)
                {
                    return response.json();
                })
                .then(function (data2)
                    {
                        console.log(data2);
                        dayUV.text("UV Index: " + data2.current.uvi);
                        dayIcon.prepend('<img src = "http://openweathermap.org/img/wn/' + data2.current.weather[0].icon + '@2x.png" />');
                        dayTemp.text("Temp: " + data2.current.temp + "°F");
                        dayWind.text("Wind: " + data2.current.wind_speed + " MPH");
                        dayHumidity.text("Humidity: " + data2.current.humidity + "%");

                    $('.myCardTemp').each(function (i) {$(this).text("Temp: " + data2.daily[i].temp.day);});
                    $('.myCardPhoto').each(function (i) {$(this).prepend('<img src = "http://openweathermap.org/img/wn/' + data2.daily[i].weather[0].icon + '@2x.png" />');});
                    $('.myCardWind').each (function (i) {$(this).text("Wind: " + data2.daily[i].wind_speed + "MPH");});
                    $('.myCardHumidity').each(function (i) {$(this).text("Humidity: " + data2.daily[i].humidity + '%');});
                    $('.myCardDate').each(function (i) {$(this).text(moment().add(1 + i, 'days').format("MM/DD/YYYY"));});
                })
        })
}

function check()
{
    if(localStorage.getItem("cities") != null)
        {
            return JSON.parse(localStorage.getItem("cities"));
        }

        else
        {
            return saveCity;
        }
}

function save()
{
        saveCity = check();
        saveCity.unshift(userInput);

if(saveCity.length > 5)
    {
        saveCity.pop();
        localStorage.setItem("cities", JSON.stringify(saveCity));
    }

else
    {
        localStorage.setItem("cities", JSON.stringify(saveCity));
    }
}

function display()
{
    saveCity = check();



    $.each(saveCity, function (i)
    {
    var button = $('<button class = "btn btn-dark">/>');
    button.text(saveCity[i]);
    var list = $('<li/>');
    list.append(button);
    recentSearch.append(list);
    })
}

function clear()
{
    recentSearch.html(" ");
    currentDayWeather.html(" ");
    fiveDayWeather.html(" ");
}

function updateDiv()
{ 
    recentSearch.html('');
    $('.myCardPhoto').html('');
    dayIcon.html('');
}

recentSearch.click(function (event)
{
    var tar = $(event.target);
    userInput = tar.text();
    updateDiv();
    getAPI();
    save();
    check();
    display();
})

display();