// URL на REST API
const apiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m';

// Функция за взимане на данни от API
async function fetchData() {
    try {
        // Правим заявка към API-то
        const response = await fetch(apiUrl);

        // Проверяваме дали заявката е успешна
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Парсваме отговора като JSON
        const data = await response.json();

        // Визуализираме данните
        populateCurrentWeather(data.current_weather);
        populateHourlyWeather(data.hourly);
    } catch (error) {
        // Ако има грешка, я извеждаме в конзолата
        console.error('Error fetching data:', error);
    }
}

// Функция за попълване на текущите данни
function populateCurrentWeather(current) {
    const currentWeatherDiv = document.getElementById('currentWeather');
    currentWeatherDiv.innerHTML = `
        <div class="weather-item"><strong>Time:</strong> ${current.time}</div>
        <div class="weather-item"><strong>Temperature:</strong> ${current.temperature} °C</div>
        <div class="weather-item"><strong>Wind Speed:</strong> ${current.wind_speed} km/h</div>
    `;
}

// Функция за попълване на почасовите данни
function populateHourlyWeather(hourly) {
    const hourlyWeatherDiv = document.getElementById('hourlyWeather');
    const times = hourly.time;
    const temperatures = hourly.temperature_2m;
    const humidities = hourly.relative_humidity_2m;
    const windSpeeds = hourly.wind_speed_10m;

    for (let i = 0; i < times.length; i++) {
        const hourlyDiv = document.createElement('div');
        hourlyDiv.classList.add('weather-item');
        hourlyDiv.innerHTML = `
            <div><strong>Time:</strong> ${times[i]}</div>
            <div><strong>Temperature:</strong> ${temperatures[i]} °C</div>
            <div><strong>Relative Humidity:</strong> ${humidities[i]}%</div>
            <div><strong>Wind Speed:</strong> ${windSpeeds[i]} km/h</div>
        `;
        hourlyWeatherDiv.appendChild(hourlyDiv);
    }
}

// Извикваме функцията за взимане на данни
fetchData();
