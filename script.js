const API_KEY = `526d4f3f9db553dbe47791977e104b29`;
const form = document.querySelector("form");
const weather = document.querySelector("#weather");
const search = document.querySelector("#search");

const getWeather = async (city) => {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('City not found. Please enter a valid city name.');
        }
        
        const data = await response.json();
        showWeather(data);
    } catch (error) {
        showError(error.message);
    }
}

const showWeather = (data) => {
    weather.innerHTML =
        `
            <div>
                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
            </div>
            <div>
                <h2>${data.main.temp}℃</h2>
                <h4>${data.weather[0].main}</h4>
            </div>
    `
}

const showError = (errorMessage) => {
    weather.innerHTML = `<div class="error">${errorMessage}</div>`;
}

form.addEventListener(
    "submit",
    function (event) {
        getWeather(search.value);
        event.preventDefault();
    }
);

