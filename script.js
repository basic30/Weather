const apiKey = "689eb33c48d88f1fb4acbc7ea86949b1"; // Your OpenWeatherMap API key

const searchButton = document.getElementById("search-button");
const cityInput = document.getElementById("city");
const weatherDetails = document.getElementById("weather-details");

const locationName = document.getElementById("location");
const tempElement = document.getElementById("temp");
const descriptionElement = document.getElementById("description");
const humidityElement = document.getElementById("humidity");
const windElement = document.getElementById("wind");

// Add rain and icons
const rainStatusElement = document.createElement("p");
rainStatusElement.id = "rain-status";
weatherDetails.appendChild(rainStatusElement);

const temperatureIcon = document.createElement("img");
temperatureIcon.src = "https://cdn-icons-png.flaticon.com/512/869/869869.png"; // Sun icon URL
temperatureIcon.alt = "Sun";
temperatureIcon.className = "icon";

const humidityIcon = document.createElement("img");
humidityIcon.src = "https://cdn-icons-png.flaticon.com/512/728/728093.png"; // Humidity icon URL
humidityIcon.alt = "Humidity";
humidityIcon.className = "icon";

const rainIcon = document.createElement("span"); // Use text emoji 🌧
rainIcon.textContent = "🌧";

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
    tempElement.textContent = `${Math.round(data.main.temp)}°C`;
    if (!tempElement.contains(temperatureIcon)) {
        tempElement.appendChild(temperatureIcon);
    }

    descriptionElement.textContent = data.weather[0].description
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
    if (!humidityElement.contains(humidityIcon)) {
        humidityElement.appendChild(humidityIcon);
    }

    windElement.textContent = `Wind Speed: ${(data.wind.speed * 3.6).toFixed(1)} km/h`;

    // Check and display rain status
    if (data.rain && data.rain["1h"]) {
        rainStatusElement.textContent = `Rainfall (Last 1 Hour): ${data.rain["1h"]} mm `;
        if (!rainStatusElement.contains(rainIcon)) {
            rainStatusElement.appendChild(rainIcon);
        }
    } else {
        rainStatusElement.textContent = "Rainfall: No rain recorded ";
        if (!rainStatusElement.contains(rainIcon)) {
            rainStatusElement.appendChild(rainIcon);
        }
    }
}
