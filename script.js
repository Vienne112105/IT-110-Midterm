
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

// Display weather data
function displayWeatherData(data) {
    // Basic information
    cityName.textContent = data.name;
    countryName.textContent = data.sys.country;
    
    // Temperature and weather
    temperature.textContent = Math.round(data.main.temp);
    weatherDesc.textContent = data.weather[0].description;
    
    // Weather icon
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weatherIcon.alt = data.weather[0].description;
    
    // Weather details
    windSpeed.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`; // Convert m/s to km/h
    humidity.textContent = `${data.main.humidity}%`;
    feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
    visibility.textContent = `${Math.round(data.visibility / 1000)} km`; // Convert m to km
    pressure.textContent = `${data.main.pressure} hPa`;
    cloudiness.textContent = `${data.clouds.all}%`;
    
    // UV Index (not available in basic weather API, using placeholder)
    uvIndex.textContent = 'N/A';
    
    // Show results
    weatherResults.classList.remove('hidden');
}

// UI Helper Functions
function showLoading() {
    loadingSpinner.classList.remove('hidden');
    weatherResults.classList.add('hidden');
    errorMessage.classList.add('hidden');
}

function hideLoading() {
    loadingSpinner.classList.add('hidden');
}

function showError(message) {
    errorMessage.querySelector('p').textContent = message;
    errorMessage.classList.remove('hidden');
    weatherResults.classList.add('hidden');
}

function hideError() {
    errorMessage.classList.add('hidden');
}

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    // Check if API key is configured
    if (!API_KEY === '352aee8a9cdf69245e06d72aef48ab13') {
        showError('API key not configured.');
    }
    
    // Focus on input field
    cityInput.focus();
});

// Additional utility functions
function formatDate(timestamp) {
    return new Date(timestamp * 1000).toLocaleDateString();
}

function formatTime(timestamp) {
    return new Date(timestamp * 1000).toLocaleTimeString();
}

// Error handling for network issues
window.addEventListener('online', function() {
    hideError();
});

window.addEventListener('offline', function() {
    showError('You are currently offline. Please check your internet connection.');
});
