
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
