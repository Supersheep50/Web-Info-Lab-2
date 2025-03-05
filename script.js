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
        document.getElementById("temperature").innerText = `The current temperature in ${cityName} is: `;
        updateTemperatureDisplay(weather.temperatureCelsius); 
            }
    if (document.getElementById("humidity")) {
        document.getElementById("humidity").innerText = `The current humidity in ${cityName} is ${weather.humidity * 100}%`;
    }
    if (document.getElementById("uvIndex")) {
        document.getElementById("uvIndex").innerText = `The current UV Index in ${cityName} is ${weather.uvIndex}`;
    }
    if (document.getElementById("windspeed")) {
        document.getElementById("windspeed").innerText = `The current windspeed in ${cityName} is ${weather.windSpeed}`;
    }
    let tempIcon = document.getElementById("temperature-icon");
    if (tempIcon) {
        if (weather.temperatureCelsius > 20) {
            tempIcon.style.color = "orange"; 
        } else {
            tempIcon.style.color = "blue"; 
        }
    }

    let humidityIcon = document.getElementById("humidity-icon");
    if (humidityIcon) {
        if (weather.humidity > 0.7) {
            humidityIcon.style.color = "blue"; 
        } else if (weather.humidity > 0.4) {
            humidityIcon.style.color = "yellow";
        } else {
            humidityIcon.style.color = "green"; 
        }
    }

    let uvIcon = document.getElementById("uv-icon");
    if (uvIcon) {
        if (weather.uvIndex > 6) {
            uvIcon.style.color = "red";
        } else if (weather.uvIndex > 3) {
            uvIcon.style.color = "orange"; 
        } else {
            uvIcon.style.color = "green"; 
        }
    }

    let windIcon = document.getElementById("wind-icon");
    if (windIcon) {
        if (weather.windSpeed > 20) {
            windIcon.style.color = "red"; 
        } else {
            windIcon.style.color = "blue";
        }
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
                window.location.href = "./pages/wind.html";
            }
        });
    }
});

function updateTemperatureDisplay(temperatureCelcius){
    const toggleSwitch = document.getElementById('temp-toggle');
    const unitElement = document.getElementById('unit');
    const temperatureValue = document.getElementById('temperature-value');
    
    if(toggleSwitch.checked){

        const farenheitTemp = (temperatureCelcius * 9/5) + 32;
        temperatureValue.textContent = farenheitTemp.toFixed(2);
        unitElement.textContent = 'Farenheit';

    }else {
        temperatureValue.textContent = temperatureCelcius.toFixed(2);
        unitElement.textContent = 'Celcius';
    }
    
}

document.getElementById('temp-toggle').addEventListener('change', () => {
    const cityName = localStorage.getItem("selectedCity") || "Dublin";
    updateData(cityName);
} );  


