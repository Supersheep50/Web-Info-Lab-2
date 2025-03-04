async function getData(cityName) {
    try {
        const response = await fetch("/weatherinfo.json");
        const data = await response.json();
        return data.find(city => city.cityName.toLowerCase() === cityName.toLowerCase()) || null;
    } catch (error) {
        console.error("Couldn't fetch data", error);
    }
}

async function updateData(cityName) {
    localStorage.setItem("selectedCity", cityName);
    const weather = await getData(cityName);
    if (!weather) return;

    if (document.getElementById("temperature")) {
        document.getElementById("temperature").innerText = `The current temperature in ${cityName} is ${weather.temperatureCelsius}°C`;
    }
    if (document.getElementById("humidity")) {
        document.getElementById("humidity").innerText = `The current humidity in ${cityName} is ${weather.humidity * 100}%`;
    }
    if (document.getElementById("uvIndex")) {
        document.getElementById("uvIndex").innerText = `The current UV Index in ${cityName} is ${weather.uvIndex}`;
    }
    if (document.getElementById("windspeed")) {
        document.getElementById("windspeed").innerText = `The current windspeed in ${cityName} is ${weather.windSpeed} kmph`;
    }
}


document.addEventListener("DOMContentLoaded", () => {
    const cityName = localStorage.getItem("selectedCity") || "Dublin"; 
    updateData(cityName);

    const form = document.getElementById("weatherForm");
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            const cityInput = document.getElementById("cityInput").value.trim();
            if (cityInput) {
                updateData(cityInput);
            }
        });
    }
});
