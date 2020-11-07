// Variables
let searchButton = $(".searchButton");
let myUrl = "https://api.openweathermap.org/data/2.5/"
let iconURL = "http://openweathermap.org/img/w/"
let apiKey = "0c2de5fc4c08fa9a0a103d78dbde557c"
// Date time variables
let startDate = moment().format('M/DD/YYYY');
let day1 = moment().add(1, 'days').format('M/DD/YYYY');
let day2 = moment().add(2, 'days').format('M/DD/YYYY');
let day3 = moment().add(3, 'days').format('M/DD/YYYY');
let day4 = moment().add(4, 'days').format('M/DD/YYYY');
let day5 = moment().add(5, 'days').format('M/DD/YYYY');

$(document).ready(function() {

// Function to save user input into local storage
searchButton.on("click", function(event) {
    event.preventDefault();
    // Search input
    let searchInput = $(".searchInput").val();
    // Cities array
    let storeCities = [];
    // Getting the searched cities
    storeCities = JSON.parse(localStorage.getItem("storeCities")) || [];
    // Push input cities to array
    storeCities.push(searchInput); 
    // Saves input into local storage
    localStorage.setItem("storeCities", JSON.stringify(storeCities));
  
    showWeather(searchInput); 
  });

  function showWeather(searchInput) {
    // Current day query URL
    let currentDay = myUrl + searchInput + "&units=imperial" + "&appid=" + apiKey;

    // Call for current day
    $.ajax({
        url: currentDay,
        method: "GET",
    }).then(function(response) {
        // Icon URL variable
        let icon = iconURL + response.weather[0].icon + ".png";

    // Daily details
    $(".currentWeather").append(
      "<div class='col s12 m6'>"
      +  "<h2 class='daily'>" + response.name + " (" + startDate + ")" + "&nbsp" + "<img src='" + icon + "'>" + "</h2>"
      +  "<ul class='daily'>" + "Temperature: " +  response.main.temp + " °F" + "</ul>"
      +  "<ul class='daily'>" + "Humidity: " + response.main.humidity + "%" + "</ul>"
      +  "<ul class='daily'>" + "Wind Speed: " +  response.wind.speed + " MPH" + "</ul>"
      + "</div>"
      ); 

    });
    
  }

    // Five day call
    // Lat and lon
    // UV Index
    // Append it's details
    // Retrieve stored cities
    // Make them clickable

// // Local Storage for search history
// for (let i = 0; i < localStorage.length; i++) {
//     let city = localStorage.getItem(i);
//     // Add class for the list
//     let cityName = $(".list-group").addClass("list-group-item");
//     // Append city name as a list
//     cityName.append("<li>" + city + "</li>");
// }

// // Search functionality
// searchButton.click(function() {
//     // Search input for city name variable
//     let searchInput = $(".searchInput").val();
//     // Current weather variable
//     let currentUrl = myUrl + "weather?q=" searchInput + "&appid=" + apiKey + "&units=imperial";
//     // Five day weather variable
//     let fiveDayUrl = myUrl + "forecast?q=" searchInput + "&appid=" + apiKey + "&units=imperial";

//     // 
// if (searchInput == "") {
//     // Log a search input here
//     console.log(searchInput);
//     } else {
//     // Current Weather
//         // Detailed weather output to html
//     // Five Day Weather
//         // 
        
//     }
    
// });
});