// Import or define the displayWeather function
export function displayWeather(data) {
    const weatherDetails = document.getElementById("weather-details");
    const locationName = document.getElementById("location");
    const tempElement = document.getElementById("temp");
    const descriptionElement = document.getElementById("description");
    const humidityElement = document.getElementById("humidity");
    const windElement = document.getElementById("wind");
    const rainStatusElement = document.getElementById("rain-status");
    const weatherIconElement = document.getElementById("weather-icon");

    // Show weather details
    if (weatherDetails) weatherDetails.classList.remove("hidden");

    // Update data
    if (locationName) locationName.textContent = `${data.name}, ${data.sys.country}`;
    if (tempElement) tempElement.innerHTML = `${Math.round(data.main.temp)}°C`;
    if (descriptionElement) {
        descriptionElement.textContent = capitalizeFirstLetter(data.weather[0].description);
    }
    if (humidityElement) humidityElement.textContent = `${data.main.humidity}%`;
    if (windElement) windElement.textContent = `${(data.wind.speed * 3.6).toFixed(1)} km/h`;

    // Handle rainfall visibility
    if (rainStatusElement) {
        if (data.rain && data.rain["1h"]) {
            rainStatusElement.textContent = `Rainfall: ${data.rain["1h"]} mm`;
            rainStatusElement.style.display = "block";
        } else {
            rainStatusElement.style.display = "none";
        }
    }

    // Dynamically update the weather icon
    const weatherCondition = data.weather[0].main.toLowerCase();
    let weatherIconClass = "fas fa-cloud"; // Default icon

    if (weatherCondition.includes("clear")) {
        weatherIconClass = "fas fa-sun text-yellow-400"; // Sunny
    } else if (weatherCondition.includes("cloud")) {
        weatherIconClass = "fas fa-cloud text-gray-500"; // Cloudy
    } else if (weatherCondition.includes("rain")) {
        weatherIconClass = "fas fa-cloud-rain text-blue-500"; // Rainy
    } else if (weatherCondition.includes("snow")) {
        weatherIconClass = "fas fa-snowflake text-blue-300"; // Snow
    } else if (weatherCondition.includes("thunderstorm")) {
        weatherIconClass = "fas fa-bolt text-yellow-600"; // Thunderstorm
    } else if (weatherCondition.includes("haze") || weatherCondition.includes("mist")) {
        weatherIconClass = "fas fa-smog text-gray-400"; // Haze or Mist
    }

    // Apply the icon class dynamically
    if (weatherIconElement) weatherIconElement.className = `${weatherIconClass} responsive-icon`;
}

// Helper Function
function capitalizeFirstLetter(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

// Fetch Weather Data
async function fetchWeather(city) {
    const apiKey = "689eb33c48d88f1fb4acbc7ea86949b1"; // Replace with your OpenWeatherMap API key
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        const data = await response.json();

        if (response.ok) {
            displayWeather(data);
        } else {
            alert(data.message || "City not found. Please check the name.");
        }
    } catch (error) {
        alert("Error fetching weather data. Please check your network connection and try again.");
        console.error(error);
    }
}

// Handle Search Button Click
document.getElementById("search-button").addEventListener("click", () => {
    const cityInput = document.getElementById("city");
    const city = cityInput ? cityInput.value.trim() : "";

    if (city) {
        fetchWeather(city);
    } else {
        alert("Please enter a city name.");
    }
});

// Add Responsive Class to Icons Dynamically
function updateIconResponsiveness() {
    const weatherIconElement = document.getElementById("weather-icon");
    if (weatherIconElement) {
        if (window.innerWidth < 600) {
            weatherIconElement.classList.add("small-icon");
        } else {
            weatherIconElement.classList.remove("small-icon");
        }
    }
}

// Attach event listener for responsiveness
window.addEventListener("resize", updateIconResponsiveness);

// Initial Check for Responsiveness
updateIconResponsiveness();
