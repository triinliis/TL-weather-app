//Shows current time
let now = new Date();

let currentime = document.querySelector(".currentime");
let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let weekDay = weekDays[now.getDay()];
let day = now.getDate();

let month = now.getMonth();
let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
month = months[now.getMonth()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
currentime.innerHTML = `${weekDay}, ${month} ${day} | ${hours}:${minutes}`;

//Shows searched city
function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let searchInput = document.querySelector("#city-input");
  cityElement.innerHTML = searchInput.value;
}
let form = document.querySelector("form");
form.addEventListener("submit", search);

// Temperature in Written City

function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#currenttemperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
}

function searchCity(event) {
  event.preventDefault();
  let apiKey = "737316554cb62c5b011f4119bc968d2d";
  let cityInput = document.querySelector("#city-input");
  let city = cityInput.value;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayWeather);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

// Temperature in Current Location Button

function getActualPosition(position) {
  let apiKey = "737316554cb62c5b011f4119bc968d2d";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function getMyPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getActualPosition);
}

let currentLocationButton = document.querySelector("#current-location-but");
currentLocationButton.addEventListener("click", getMyPosition);

//Celsius Fahrenheit Conversion
let tempCelcius = -2;
let tempFahr = (tempCelcius * 9) / 5 + 32;

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#currenttemperature");
  temperatureElement.innerHTML = `${tempFahr}`;
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#currenttemperature");
  temperatureElement.innerHTML = `${tempCelcius}`;
}
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

search("Helsinki");
