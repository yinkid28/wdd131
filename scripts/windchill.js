// windchill.js - Calculate the wind chill factor

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Get the temperature and wind speed elements
    const tempElement = document.getElementById("temperature");
    const windElement = document.getElementById("wind-speed");
    const chillElement = document.getElementById("wind-chill");
    
    // Extract the numeric values
    const temp = parseFloat(tempElement.textContent);
    const windSpeed = parseFloat(windElement.textContent);
    
    // Check if conditions are met for wind chill calculation
    // Temperature must be <= 10°C and wind speed > 4.8 km/h
    if (temp <= 10 && windSpeed > 4.8) {
        // Calculate wind chill using the formula
        const windChill = calculateWindChill(temp, windSpeed);
        
        // Display the result
        chillElement.textContent = `${windChill.toFixed(1)} °C`;
    } else {
        // If conditions aren't met, display N/A
        chillElement.textContent = "N/A";
    }
    
    // Set the current year in the footer
    document.getElementById("current-year").textContent = new Date().getFullYear();
    
    // Set the last modified date in the footer
    document.getElementById("last-modified").textContent = document.lastModified;
});

// The wind chill calculation function - one line as required
function calculateWindChill(temp, windSpeed) {
    return 13.12 + 0.6215 * temp - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temp * Math.pow(windSpeed, 0.16);
}