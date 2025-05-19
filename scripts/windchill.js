// Set current year and last modified date in the footer
document.getElementById('current-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = document.lastModified;

// Get temperature and wind speed values from the page
const temperature = parseFloat(document.getElementById('temperature').textContent);
const windSpeed = parseFloat(document.getElementById('wind-speed').textContent);

// Function to calculate wind chill
function calculateWindChill(temp, wind) {
    return 13.12 + 0.6215 * temp - 11.37 * Math.pow(wind, 0.16) + 0.3965 * temp * Math.pow(wind, 0.16);
}

// Display the wind chill
window.addEventListener('load', () => {
    // Get the wind chill element
    const windChillElement = document.getElementById('wind-chill');
    
    // Check if conditions are met for wind chill calculation (metric)
    if (temperature <= 10 && windSpeed > 4.8) {
        // Calculate and display wind chill
        const windChill = calculateWindChill(temperature, windSpeed);
        windChillElement.textContent = windChill.toFixed(1) + " °C";
    } else {
        // Display N/A if conditions are not met
        windChillElement.textContent = "N/A";
    }
});