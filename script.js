export function displayWeather(data) {
    console.log(data);  // Check if the data is being passed correctly
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
