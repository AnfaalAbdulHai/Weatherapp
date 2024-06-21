const currentWeatherDiv = document.querySelector(".current-weather");
const weatherCardsDiv = document.querySelector(".weather-cards");

const API_KEY = "27103de87788b3f37aa005e057fbecc4"; 

const createWeatherCard = (cityName, weatherItem, index) => {
    if(index === 0) { 
        return `<div class="details">
                    <h2>${cityName} (${weatherItem.dt_txt.split(" ")[0]})</h2>
                    <h6>Temperature: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h6>
                    <h6>Wind: ${weatherItem.wind.speed} M/S</h6>
                    <h6>Humidity: ${weatherItem.main.humidity}%</h6>
                </div>
                <div class="icon">
                    <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}.png" alt="weather-icon">
                    <h6>${weatherItem.weather[0].description}</h6>
                </div>`;
    } else { 
        return `<li class="card">
                    <h3>(${weatherItem.dt_txt.split(" ")[0]})</h3>
                    <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}.png" alt="weather-icon">
                    <h6>Temp: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h6>
                    <h6>Wind: ${weatherItem.wind.speed} M/S</h6>
                    <h6>Humidity: ${weatherItem.main.humidity}%</h6>
                </li>`;
    }
}

const getWeatherDetails = (cityName, latitude, longitude) => {
    const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

    fetch(WEATHER_API_URL).then(response => response.json()).then(data => {
        const uniqueForecastDays = [];
        const fiveDaysForecast = data.list.filter(forecast => {
            const forecastDate = new Date(forecast.dt_txt).getDate();
            if (!uniqueForecastDays.includes(forecastDate)) {
                return uniqueForecastDays.push(forecastDate);
            }
        });

        currentWeatherDiv.innerHTML = "";
        weatherCardsDiv.innerHTML = "";

        fiveDaysForecast.forEach((weatherItem, index) => {
            const html = createWeatherCard(cityName, weatherItem, index);
            if (index === 0) {
                currentWeatherDiv.insertAdjacentHTML("beforeend", html);
            } else {
                weatherCardsDiv.insertAdjacentHTML("beforeend", html);
            }
        });        
    }).catch(() => {
        alert("An error occurred while fetching the weather forecast!");
    });
}

getWeatherDetails("Karachi","24.85","67.02")

const getCityCoordinates = () => {
    const cityInputElement = document.getElementById('cityinput');
    const cityName = cityInputElement.value.trim();
    if (cityName === "") return;
    const API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;
    
    fetch(API_URL).then(response => response.json()).then(data => {
        if (!data.length) return alert(`No coordinates found for ${cityName}`);
        const { lat, lon, name } = data[0];
        console.log(data)
        getWeatherDetails(name, lat, lon);
    }).catch(() => {
        alert("An error occurred while fetching the coordinates!");
    });
}
// // Weather Application

// let div = document.getElementById('box');
// let input = document.getElementById('userValue');

// // const getUserVal =()=>{
//     fetch(`http://api.openweathermap.org/geo/1.0/direct?q=karachi&limit=5&appid=27103de87788b3f37aa005e057fbecc4`)  
//     .then((response)=>response.json())
//     .then((response)=>{
//         // for(var i = 0;i<response.weather.length;i++){
//             console.log(response[0].lon)
//             // div.innerHTML += `<div class="card" style="width: 18rem;">
//             // <div class="card-body">
//             // <h5 class="card-title">${response.weather.main.temp}</h5>
//             // <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//             // <a href="#" class="btn btn-primary">Go somewhere</a>
//             // </div>
//             // </div>`
//         // }
//         fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${response[0].lat}&lon=${response[0].lon}&appid=27103de87788b3f37aa005e057fbecc4`)  
//     .then((response)=>response.json())
//     .then((response)=>{
//         // for(var i = 0;i<response.weather.length;i++){
//             console.log(response)
//             // div.innerHTML += `<div class="card" style="width: 18rem;">
//             // <div class="card-body">
//             // <h5 class="card-title">${response.weather.main.temp}</h5>
//             // <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//             // <a href="#" class="btn btn-primary">Go somewhere</a>
//             // </div>
//             // </div>`
//         // }
//     })
    
//     .catch((err)=>console.log(err))
//     })
    
//     .catch((err)=>console.log(err))
// // }

// const cityInput = document.querySelector(".city-input");
// const searchButton = document.querySelector(".search-button");
// const locationButton = document.querySelector(".location-btn");