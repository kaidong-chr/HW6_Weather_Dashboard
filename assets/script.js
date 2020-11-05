// Variables
let myUrl = "https://api.openweathermap.org/data/2.5/"
let apiKey = "0c2de5fc4c08fa9a0a103d78dbde557c"

// Local Storage for search history
for (let i = 0; i < localStorage.length; i++) {
    let city = localStorage.getItem(i);
    // Add class for the list
    let cityName = $(".list-group").addClass("list-group-item");
    // Append city name as a list
    cityName.append("<li>" + city + "</li>");
}
// Search functionality
    // 
// Current Weather
    // Detailed weather output to html
// Five Day Weather
    // 