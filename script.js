const apiKey = "689eb33c48d88f1fb4acbc7ea86949b1"; // Your OpenWeatherMap API key

const searchButton = document.getElementById("search-button");
const cityInput = document.getElementById("city");
const weatherDetails = document.getElementById("weather-details");

const locationName = document.getElementById("location");
const tempElement = document.getElementById("temp");
const descriptionElement = document.getElementById("description");
const humidityElement = document.getElementById("humidity");
const windElement = document.getElementById("wind");
const rainStatusElement = document.getElementById("rain-status");

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

    // Update temperature (no need to add ☀ since it's in HTML)
    tempElement.textContent = `${Math.round(data.main.temp)}°C`;

    // Update weather description
    descriptionElement.textContent = data.weather[0].description
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    // Update humidity (no need to add 💧 since it's in HTML)
    humidityElement.textContent = `${data.main.humidity}%`;

    // Update wind speed (no need to add 💨 since it's in HTML)
    windElement.textContent = `${(data.wind.speed * 3.6).toFixed(1)} km/h`;

    // Check and display rain status (no need to add 🌧 since it's in HTML)
    if (data.rain && data.rain["1h"]) {
        rainStatusElement.textContent = `Rainfall (Last 1 Hour): ${data.rain["1h"]} mm`;
    } else {
        rainStatusElement.textContent = "Rainfall: No rain recorded";
    }
}
