function showWeather(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = ` ${response.data.name}`;

  let currentDate = new Date();
  let formattedDate = formatDate(currentDate);
  let dateElement = document.querySelector(".date");
  dateElement.innerHTML = formattedDate;

  let temperature = Math.round(response.data.main.temp);
  let h3 = document.querySelector("h3");
  h3.innerHTML = `${temperature}°C`;

  let icon = response.data.weather[0].icon;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${icon}@2x.png`)

  let description = response.data.weather[0].description;
  let descriptionElement = document.querySelector(".description");
  descriptionElement.innerHTML = description;

  let humidity = response.data.main.humidity;
  let humidityElement = document.getElementById("humidity");
  humidityElement.innerHTML = `Humidity: ${humidity}%`;

  let wind = response.data.wind.speed;
  let windElement = document.getElementById("wind");
  windElement.innerHTML = `Wind: ${wind} km/h`;
}

function retrievePosition(position) {
  let apiKey = "62bc298785543e137bc6756e514eb1c3";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  axios.get(url).then(showWeather);
}


function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = date.getDay();

  let formattedDate = `${days[day]} | ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  return formattedDate;
}

function searchCity(event) {
  event.preventDefault();

  let searchInput = document.getElementById('search-city-input');
  let city = searchInput.value;
  let apiKey = "62bc298785543e137bc6756e514eb1c3";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  axios.get(url).then(showWeather);
}

let button = document.querySelector("button");
button.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(retrievePosition);
});

let form = document.getElementById('search-form');
form.addEventListener('submit', searchCity);