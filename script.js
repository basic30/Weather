// script.js
const apiKey = "689eb33c48d88f1fb4acbc7ea86949b1"; // Your OpenWeatherMap API key

const searchButton = document.getElementById("search-button");
const cityInput = document.getElementById("city");
const weatherDetails = document.getElementById("weather-details");

const locationName = document.getElementById("location");
const tempElement = document.getElementById("temp");
const descriptionElement = document.getElementById("description");
const humidityElement = document.getElementById("humidity");
const windElement = document.getElementById("wind");

searchButton.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        alert("Please enter a city name.");
    }
});

async function fetchWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        const data = await response.json();

        if (data.cod === 200) {
            displayWeather(data);
        } else {
            alert(data.message);
        }
    } catch (error) {
        alert("Error fetching weather data. Please try again.");
    }
}

function displayWeather(data) {
    weatherDetails.classList.remove("hidden");

    locationName.textContent = `${data.name}, ${data.sys.country}`;
    tempElement.textContent = Math.round(data.main.temp);
    descriptionElement.textContent = data.weather[0].description
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    humidityElement.textContent = data.main.humidity;
    windElement.textContent = (data.wind.speed * 3.6).toFixed(1); // Convert m/s to km/h
    }
