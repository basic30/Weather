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

// Display Weather Function
function displayWeather(data) {
    // Get the weather details section and make it visible
    const weatherDetails = document.getElementById("weather-details");
    const locationName = document.getElementById("location");
    const tempElement = document.getElementById("temp");
    const descriptionElement = document.getElementById("description");
    const humidityElement = document.getElementById("humidity");
    const windElement = document.getElementById("wind");
    const rainStatusElement = document.getElementById("rain-status");

    weatherDetails.classList.remove("hidden");

    // Set location name (city, country)
    locationName.textContent = `${data.name}, ${data.sys.country}`;

    // Determine weather condition and choose the corresponding icon
    const weatherCondition = data.weather[0].main.toLowerCase();
    let weatherIcon = "";
    if (weatherCondition.includes("clear")) {
        weatherIcon = "☀"; // Sunny
    } else if (weatherCondition.includes("cloud")) {
        weatherIcon = "🌥"; // Cloudy
    } else if (weatherCondition.includes("rain")) {
        weatherIcon = "🌧"; // Rainy
    } else if (weatherCondition.includes("snow")) {
        weatherIcon = "❄"; // Snow 
    } else if (weatherCondition.includes("haze")) {
        weatherIcon = "🌫"; // Haze
    } else {
        weatherIcon = "🌤"; // Default (partly cloudy)
    }

    // Update the temperature with the icon
    tempElement.innerHTML = `${Math.round(data.main.temp)}°C <span class="icon">${weatherIcon}</span>`;

    // Format and display the weather description
    descriptionElement.textContent = data.weather[0].description
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    // Update humidity
    humidityElement.textContent = `${data.main.humidity}%`;

    // Update wind speed (converted from m/s to km/h)
    windElement.textContent = `${(data.wind.speed * 3.6).toFixed(1)} km/h`;

    // Conditionally display the rain status if data is available
    if (data.rain && data.rain["1h"]) {
        rainStatusElement.classList.remove("hidden");
        document.getElementById("rainfall-value").textContent = `${data.rain["1h"]} mm`;
    } else {
        rainStatusElement.classList.add("hidden");
    }
}
