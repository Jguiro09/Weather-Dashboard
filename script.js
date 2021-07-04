console.log("connected!");
//HTML Recalls
var submitBtn = $('#submitBtn'); // Calls to the submit button on HTML
var dayTemp = $('#dayTemp'); // Calls to the current day's temp on HTML
var dayWind = $('#dayWind'); // Calls to the current day's wind on HTML
var dayUV = $('#dayUV'); // Calls to the current day's UV Index on HTML
var dayHumidity = $('#dayHumidity'); // Calls to the current day's humidity on HTML
var dayCity = $('#dailyCity'); // Calls to the curreny day's city name on HTML
var dayIcon = $('#dayIcon'); // Calls to where our icon will be placed in HTMl
var recentSearch = $('#recentSearch'); // Calls to the list that will display our recent searches
var currentDayWeather = $('#currentDayWeather'); // The div with all of the current weather information inside
var fiveDayWeather = $('#fiveDayWeather'); // The div with all of the 5 day weather information inside

// Javascript Variables
var userInput // A variable that grabs the city once the user inputs it
var saveCity = []; // An array where the cities are saved.

submitBtn.click(function () // An eventlistener that listens for when the user clicks the submit button
{
    userInput = $('#userInfo').val(); // Grabs what the user has typed and puts it inside the userInput variable
    updateDiv(); // Refreshes the parts of our div that might double if the user searches more than once
    getAPI(); // Gets our API information and outputs the information that they have asked for
    save(); // Saves the array into local storage so that way the user can see their history once they refresh
    display(); // Displays the previous cities they have searched.
})

function getAPI() // Calls our API to obtain the weather information that we need.
{
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + userInput + '&units=imperial&appid=8a393f02d01e324fee60ee71877cc93c') // Calls our first API for the information we need 
        .then(function (response) { // After getting into the API this function will now happen (promise)
            return response.json(); // Returns the information as a JSON
        })
        .then(function (data) // We take that data and use it inside this function to start outputting our information
        {
            console.log(data) // Console log the data so you can see everything the API provides
            dayCity.text(data.name + " " +moment().format('MM/DD/YYYY')); // Outputs the city's name and the date next to eachother near the top.

            fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + data.coord.lat + '&lon=' + data.coord.lon + '&exclude=hourly,alerts&units=imperial&appid=8a393f02d01e324fee60ee71877cc93c') // Calls our  second API for the information we need.
                .then(function (response) // After gettubg ubti the API, this function will now happen (promise)
                {
                    return response.json(); // Returns the data we need as a JSON
                })
                .then(function (data2) // We take that data and use it inside this function to start outputting our information.
                    {
                        console.log(data2); // Console log the data so you can see everything the API provides
                        dayUV.text("UV Index: " + data2.current.uvi); // Outputs the current days UV Index
                        dayIcon.prepend('<img src = "http://openweathermap.org/img/wn/' + data2.current.weather[0].icon + '@2x.png" />'); // Outputs the current days weather Icon
                        dayTemp.text("Temp: " + data2.current.temp + "°F"); // Outputs the current days temperature
                        dayWind.text("Wind: " + data2.current.wind_speed + " MPH"); // Outputs the current days wind speed
                        dayHumidity.text("Humidity: " + data2.current.humidity + "%"); // Outputs the current days humidity

                    // These for EACH loops utitlize "i" this is our index and how many times our for each loop has gone through, we use i to incriment inside the array 'daily' so we move from one day to the next
                    $('.myCardTemp').each(function (i) {$(this).text("Temp: " + data2.daily[i].temp.day);}); // Runs a for EACH loop that displays each days temperature (after the first curly bracket you can start a new line to make it easier to read)
                    $('.myCardPhoto').each(function (i) {$(this).prepend('<img src = "http://openweathermap.org/img/wn/' + data2.daily[i].weather[0].icon + '@2x.png" />');}); // Runs a for EACH loop that displays each days weather icon  (after the first curly bracket you can start a new line to make it easier to read)
                    $('.myCardWind').each (function (i) {$(this).text("Wind: " + data2.daily[i].wind_speed + "MPH");}); // runs a for EACH loop that displays each days wind speed (after the first curly bracket you can start a new line to make it easier to read)
                    $('.myCardHumidity').each(function (i) {$(this).text("Humidity: " + data2.daily[i].humidity + '%');}); // runs a for EACH loop that displays each days humidity  (after the first curly bracket you can start a new line to make it easier to read)
                    $('.myCardDate').each(function (i) {$(this).text(moment().add(1 + i, 'days').format("MM/DD/YYYY"));}); // runs a for EACH loop that displays each days date  (after the first curly bracket you can start a new line to make it easier to read)
                })
        })
}

function check() // A function that checks if we have any previous cities inside of our local storage, if we do not we simply return our saveCity array and keep moving
{
    if(localStorage.getItem("cities") != null) // Checks if our local storage has anything inside of it.
        {return JSON.parse(localStorage.getItem("cities"));} // Returns our cities from inside the local storage
    else
    {return saveCity;} // If there is nothing in local storage we simply return our array back
}

function save() // Saves our new city that the user has just inputted and puts it inside of the array with the other cities
{
        saveCity = check(); // Assigns our "saveCity" array to either itself (if theres nothing inside of local storage) OR the array out of local storage
        saveCity.unshift(userInput); // Puts the new city at the start of our array

if(saveCity.length > 5) // Checks if our array is greater than 5, if it is we remove the last city inside of our array
    {
        saveCity.pop(); // removes the last city in our array
        localStorage.setItem("cities", JSON.stringify(saveCity)); // Sets our new array inside of local storage
    }

else
    {localStorage.setItem("cities", JSON.stringify(saveCity));} // Sets our new array inside of local storage
}

function display() // Displays our search history in a list format under our search bar
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