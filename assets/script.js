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
    let currentDay = myUrl + "weather?q=" + searchInput + "&units=imperial" + "&appid=" + apiKey;

    // Call for current day
    $.ajax({
        url: currentDay,
        method: "GET",
    }).then(function(response) {
        // Icon URL variable
        let icon = iconURL + response.weather[0].icon + ".png";
        // Lat and long variable
        let lat = response.coord.lat;
        let lon = response.coord.lon;

    // Daily details
    $(".currentWeather").append(
      "<div class='col'>"
      +  "<h3 class='daily'>" + response.name + " (" + startDate + ")" + "&nbsp" + "<img src='" + icon + "'>" + "</h3>"
      +  "<ul class='daily'>" + "Temperature: " +  response.main.temp + " °F" + "</ul>"
      +  "<ul class='daily'>" + "Humidity: " + response.main.humidity + "%" + "</ul>"
      +  "<ul class='daily'>" + "Wind Speed: " +  response.wind.speed + " MPH" + "</ul>"
      + "</div>"
      );

    // FiveDay day query URL
    let fiveDay = myUrl + "onecall?" + "lat=" + lat + "&lon=" + lon + "&units=imperial" + "&appid=" + apiKey;

    $.ajax({
        url: fiveDay,
        method: "GET",
        }).then(function(response) {
          
          //Icon URL
          let icon1 = iconURL + response.daily[0].weather[0].icon + ".png";
          let icon2 = iconURL + response.daily[1].weather[0].icon + ".png";
          let icon3 = iconURL + response.daily[2].weather[0].icon + ".png";
          let icon4 = iconURL + response.daily[3].weather[0].icon + ".png";
          let icon5 = iconURL + response.daily[4].weather[0].icon + ".png";
       
          // Adding in UV Index to daily weather 
          $(".currentWeather").append(
            "<div class='col-md-2'>"
           + "<ul class='daily uvIndex'>" + "UV Index: " + response.current.uvi + "</ul>"
           + "</div>"
           );
    
          // UV Index colors
          if (response.current.uvi <= 2) {
            $(".uvIndex").css("background-color", "green");
           } else if (response.current.uvi <= 5) {
             $(".uvIndex").css("background-color", "yellow");
           } else if (response.current.uvi <= 7) {
               $(".uvIndex").css("background-color", "orange");
           } else if (response.current.uvi <= 10) {
               $(".uvIndex").css("background-color", "red");
           } else if (response.current.uvi <= 40) {
               $(".uvIndex").css("background-color", "violet");
           };
    
          // Five day forecast header
          $(".5day").append(
            "<div class='col-md-12'>"
           + "<h4 id='fiveDay'>" + "5 Day Forecast:" + "</h4>" 
          );
    
           // Day 1
          $(".day1").append(
           "<div class='fiveDayCard card text-white bg-primary mb-3 col' style='width: 12rem;'>"
           +  "<div class='card-body'>"
           +  "<div class='card-title'>" + day1 +"</div>"
           +  "<div class='card-text'>" + "<img src='" + icon1 + "'>" +"</div>"
           +  "<div class='card-text'>" + "Temp: " + response.daily[0].temp.day + " °F" + "</div>"
           +  "<div class='card-text'>" + "Humidity: " + response.daily[0].humidity + "%" + "</div>" 
           + "</div>" 
          );
    
          // Day 2
          $(".day2").append(
            "<div class='fiveDayCard card text-white bg-primary mb-3 col' style='width: 12rem;'>"
            +  "<div class='card-body'>"
            +  "<div class='card-title'>" + day2 +"</div>"
            +  "<div class='card-text'>" + "<img src='" + icon2 + "'>" +"</div>"
            +  "<div class='card-text'>" + "Temp: " + response.daily[1].temp.day + " °F" + "</div>"
            +  "<div class='card-text'>" + "Humidity: " + response.daily[1].humidity + "%" + "</div>" 
            + "</div>" 
          );
    
          // Day 3
          $(".day3").append(
            "<div class='fiveDayCard card text-white bg-primary mb-3 col' style='width: 12rem;'>"
            +  "<div class='card-body'>"
            +  "<div class='card-title'>" + day3 +"</div>"
            +  "<div class='card-text'>" + "<img src='" + icon3 + "'>" +"</div>"
            +  "<div class='card-text'>" + "Temp: " + response.daily[2].temp.day + " °F" + "</div>"
            +  "<div class='card-text'>" + "Humidity: " + response.daily[2].humidity + "%" + "</div>" 
            + "</div>" 
          );
    
          // Day 4
          $(".day4").append(
            "<div class='fiveDayCard card text-white bg-primary mb-3 col' style='width: 12rem;'>"
            +  "<div class='card-body'>"
            +  "<div class='card-title'>" + day4 +"</div>"
            +  "<div class='card-text'>" + "<img src='" + icon4 + "'>" +"</div>"
            +  "<div class='card-text'>" + "Temp: " + response.daily[3].temp.day + " °F" + "</div>"
            +  "<div class='card-text'>" + "Humidity: " + response.daily[3].humidity + "%" + "</div>" 
            + "</div>" 
          );
    
          // Day 5
          $(".day5").append(
            "<div class='fiveDayCard card text-white bg-primary mb-3 col' style='width: 12rem;'>"
            +  "<div class='card-body'>"
            +  "<div class='card-title'>" + day5 +"</div>"
            +  "<div class='card-text'>" + "<img src='" + icon5 + "'>" +"</div>"
            +  "<div class='card-text'>" + "Temp: " + response.daily[4].temp.day + " °F" + "</div>"
            +  "<div class='card-text'>" + "Humidity: " + response.daily[4].humidity + "%" + "</div>" 
            + "</div>" 
          );
          

          })  

    })

  }

    // Retrieve stored cities
    // Make them clickable

});