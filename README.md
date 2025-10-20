IT-110 Weather Checker Application
=====================================

Group Information:
------------------
Group Name: IT-110 Weather Checker Team
Members:
Veveinne Mike Sunido
Ivan Kleinth Estremos


Project Description:
--------------------
Comprehensive Weather Checker application that provides real-time weather information for any location worldwide. 
The application features a clean, intuitive interface that allows users to search for weather conditions by city name or use their current location.

Key Features:
- Real-time weather data from OpenWeatherMap API
- Location-based weather search
- Current location detection
- Detailed weather information display
- Responsive design for all devices
- Error handling for network issues
- Modern, clean UI with smooth animations

API Information:
----------------
API Used: OpenWeatherMap API
Documentation: https://openweathermap.org/api
API Endpoint: https://api.openweathermap.org/data/2.5/weather

File Structure:
---------------
- index.html (Portfolio Homepage)
- app.html (Main Weather Application)
- styles.css (CSS Styling)
- script.js (JavaScript Logic)
- README.txt (This file)

Special Instructions:
--------------------
1. Open index.html in a web browser to view the team portfolio
2. Click "Try Our Weather App" to access the weather application
3. Make sure you have an internet connection to fetch weather data
4. The application requires a valid OpenWeatherMap API key to function
5. For best experience, use a modern web browser (Chrome, Firefox, Safari, Edge)

Browser Compatibility:
----------------------
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

Function Interaction Documentation:
===================================

This section documents how every function in the Weather Checker application interacts with each other to provide the final output. The application follows a modular architecture where functions work together in a specific sequence to deliver weather information to users.

1. APPLICATION INITIALIZATION FLOW:
===================================

1.1 DOMContentLoaded Event Listener (Lines 174-182)
   - Triggers when the page loads completely
   - Calls: showError() if API key is not configured
   - Calls: cityInput.focus() to focus on input field
   - Sets up initial application state

1.2 Event Listeners Setup (Lines 28-35)
   - searchBtn.addEventListener('click', handleSearch) - Search button click
   - currentLocationBtn.addEventListener('click', handleCurrentLocation) - Location button click
   - cityInput.addEventListener('keypress', ...) - Enter key press in input field
   - These create the user interaction entry points

2. SEARCH FUNCTIONALITY FLOW:
=============================

2.1 handleSearch() Function (Lines 38-57)
   - Entry point for city-based weather search
   - Input validation: checks if city name is provided
   - Calls: showLoading() to display loading spinner
   - Calls: fetchWeatherData(city) to get weather data
   - Calls: displayWeatherData(weatherData) to show results
   - Calls: hideError() to clear any previous errors
   - Calls: hideLoading() to hide spinner
   - Error handling: calls showError() if fetch fails

2.2 fetchWeatherData(city) Function (Lines 91-107)
   - Constructs API URL with city name and API key
   - Makes HTTP request to OpenWeatherMap API
   - Handles different HTTP status codes:
     * 404: City not found error
     * 401: Invalid API key error
     * Other: Generic API failure error
   - Returns: Parsed JSON weather data
   - Throws: Error objects for error handling

3. LOCATION-BASED SEARCH FLOW:
==============================

3.1 handleCurrentLocation() Function (Lines 60-81)
   - Entry point for GPS-based weather search
   - Checks: navigator.geolocation availability
   - Calls: showLoading() to display loading spinner
   - Calls: getCurrentPosition() to get GPS coordinates
   - Calls: fetchWeatherByCoordinates(lat, lon) with coordinates
   - Calls: displayWeatherData(weatherData) to show results
   - Calls: hideError() to clear any previous errors
   - Calls: hideLoading() to hide spinner
   - Error handling: calls showError() if location access fails

3.2 getCurrentPosition() Function (Lines 84-88)
   - Wraps navigator.geolocation.getCurrentPosition in a Promise
   - Returns: Promise that resolves with position object
   - Used by: handleCurrentLocation() to get coordinates

3.3 fetchWeatherByCoordinates(lat, lon) Function (Lines 110-120)
   - Constructs API URL with latitude and longitude
   - Makes HTTP request to OpenWeatherMap API
   - Returns: Parsed JSON weather data
   - Throws: Error objects for error handling

4. DATA DISPLAY FLOW:
====================

4.1 displayWeatherData(data) Function (Lines 123-150)
   - Main function for rendering weather information
   - Updates DOM elements with weather data:
     * cityName.textContent = data.name
     * countryName.textContent = data.sys.country
     * temperature.textContent = Math.round(data.main.temp)
     * weatherDesc.textContent = data.weather[0].description
     * weatherIcon.src = weather icon URL
     * windSpeed.textContent = converted wind speed
     * humidity.textContent = humidity percentage
     * feelsLike.textContent = feels like temperature
     * visibility.textContent = visibility in km
     * pressure.textContent = atmospheric pressure
     * cloudiness.textContent = cloud coverage
     * uvIndex.textContent = 'N/A' (placeholder)
   - Calls: weatherResults.classList.remove('hidden') to show results

5. UI STATE MANAGEMENT FUNCTIONS:
=================================

5.1 showLoading() Function (Lines 153-157)
   - Shows loading spinner
   - Hides weather results and error messages
   - Called by: handleSearch() and handleCurrentLocation()

5.2 hideLoading() Function (Lines 159-161)
   - Hides loading spinner
   - Called by: handleSearch() and handleCurrentLocation() in finally blocks

5.3 showError(message) Function (Lines 163-167)
   - Displays error message to user
   - Hides weather results
   - Called by: handleSearch(), handleCurrentLocation(), and error handlers

5.4 hideError() Function (Lines 169-171)
   - Hides error message
   - Called by: handleSearch() and handleCurrentLocation() on success


6. NETWORK STATUS HANDLING:
===========================

6.1 Online Event Listener (Lines 194-196)
   - Triggers when browser comes back online
   - Calls: hideError() to clear offline error messages

6.2 Offline Event Listener (Lines 198-200)
   - Triggers when browser goes offline
   - Calls: showError() to display offline message

7. ENHANCEMENT FEATURES:
========================

7.1 Sample Cities Array (Lines 203-206)
   - Contains array of popular cities for testing
   - Used by: placeholder rotation feature

7.2 Placeholder Rotation (Lines 208-215)
   - Rotates placeholder text every 3 seconds
   - Uses: sampleCities array
   - Updates: cityInput.placeholder with different city examples

8. COMPLETE INTERACTION FLOW DIAGRAM:
=====================================

User Input → Event Listener → Main Handler Function
    ↓
Input Validation → showLoading()
    ↓
API Call (fetchWeatherData OR fetchWeatherByCoordinates)
    ↓
Data Processing → displayWeatherData()
    ↓
UI Update → hideLoading() + hideError()
    ↓
Final Output Display

9. ERROR HANDLING CHAIN:
=========================

Error Occurs → catch block → showError(message) → hideLoading()
    ↓
User sees error message
    ↓
User can retry → New input → Repeat flow

10. DATA TRANSFORMATION PIPELINE:
=================================

Raw API Data → displayWeatherData() → DOM Element Updates
    ↓
Temperature: Math.round(data.main.temp)
Wind Speed: Math.round(data.wind.speed * 3.6) // m/s to km/h
Visibility: Math.round(data.visibility / 1000) // m to km
Feels Like: Math.round(data.main.feels_like)
    ↓
Formatted Display Values

This modular architecture ensures that each function has a specific responsibility while working together to provide a seamless weather checking experience. The separation of concerns allows for easy maintenance, testing, and future enhancements.
