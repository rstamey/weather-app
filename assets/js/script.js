
const apiKey = 'c8ed3103db22ce79700bf2f392bad417';
const apiUrl = 'https://api.openweathermap.org/data/2.5/';

async function getWeatherData(city) {
  const response = await fetch(`${apiUrl}weather?q=${city}&appid=${apiKey}&units=metric`);
  const data = await response.json();
  return data;
}


async function getForecastData(city) {
  const response = await fetch(`${apiUrl}forecast?q=${city}&appid=${apiKey}&units=metric`);
  const data = await response.json();
  return data;
}


function displayCurrentWeather(data) {
  const city = data.name;
  const date = new Date(data.dt * 1000).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const icon = data.weather[0].icon;
  const temperature = data.main.temp;
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;

  
  document.getElementById('current-weather-container').innerHTML = `
    <h2>${city}</h2>
    <p>Date: ${date}</p>
    <img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">
    <p>Temperature: ${temperature} °C</p>
    <p>Humidity: ${humidity}%</p>
    <p>Wind Speed: ${windSpeed} km/h</p>
  `;
}

function displayForecast(data) {
  const forecastList = data.list.slice(0, 5); 


  const forecastHTML = forecastList.map(entry => {
    const date = new Date(entry.dt * 1000).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const icon = entry.weather[0].icon;
    const temperature = entry.main.temp;
    const humidity = entry.main.humidity;
    const windSpeed = entry.wind.speed;

    return `
      <div>
        <p>Date: ${date}</p>
        <img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">
        <p>Temperature: ${temperature} °C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} km/h</p>
      </div>
    `;
  }).join('');


  document.getElementById('forecast-container').innerHTML = forecastHTML;
}

async function searchCity() {
  const cityInput = document.getElementById('city-input').value;
  

  const currentWeatherData = await getWeatherData(cityInput);
  displayCurrentWeather(currentWeatherData);

  const forecastData = await getForecastData(cityInput);
  displayForecast(forecastData);

}