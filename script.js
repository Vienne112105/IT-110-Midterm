
const API_KEY = '352aee8a9cdf69245e06d72aef48ab13';
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// DOM Elements
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const currentLocationBtn = document.getElementById('currentLocationBtn');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorMessage = document.getElementById('errorMessage');
const weatherResults = document.getElementById('weatherResults');

// Weather result elements
const cityName = document.getElementById('cityName');
const countryName = document.getElementById('countryName');
const temperature = document.getElementById('temperature');
const weatherIcon = document.getElementById('weatherIcon');
const weatherDesc = document.getElementById('weatherDesc');
const windSpeed = document.getElementById('windSpeed');
const humidity = document.getElementById('humidity');
const feelsLike = document.getElementById('feelsLike');
const visibility = document.getElementById('visibility');
const pressure = document.getElementById('pressure');
const uvIndex = document.getElementById('uvIndex');
const cloudiness = document.getElementById('cloudiness');

// Event Listeners
searchBtn.addEventListener('click', handleSearch);
currentLocationBtn.addEventListener('click', handleCurrentLocation);

//Search function
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

async function handleSearch() {
    const city = cityInput.value.trim();
    
    if (!city) {
        showError('Please enter a city name');
        return;
    }
    
    try {
        showLoading();
        const weatherData = await fetchWeatherData(city);
        displayWeatherData(weatherData);
        hideError();
    } catch (error) {
        console.error('Error fetching weather data:', error);
        showError('Could not fetch weather data. Please check your internet connection and try again.');
    } finally {
        hideLoading();
    }
}

// Current location function
async function handleCurrentLocation() {
    if (!navigator.geolocation) {
        showError('Geolocation is not supported by this browser');
        return;
    }
    
    try {
        showLoading();
        
        const position = await getCurrentPosition();
        const { latitude, longitude } = position.coords;
        
        const weatherData = await fetchWeatherByCoordinates(latitude, longitude);
        displayWeatherData(weatherData);
        hideError();
    } catch (error) {
        console.error('Error getting current location:', error);
        showError('Could not get your current location. Please try searching for a city instead.');
    } finally {
        hideLoading();
    }
}

// Get current position with promise
function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

// Fetch weather data by city name
async function fetchWeatherData(city) {
    const url = `${API_BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
        if (response.status === 404) {
            throw new Error('City not found. Please check the spelling and try again.');
        } else if (response.status === 401) {
            throw new Error('Invalid API key. Please check your API configuration.');
        } else {
            throw new Error(`API request failed with status: ${response.status}`);
        }
    }
    
    return await response.json();
}

// Fetch weather data by coordinates
async function fetchWeatherByCoordinates(lat, lon) {
    const url = `${API_BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
    }
    
    return await response.json();
}

