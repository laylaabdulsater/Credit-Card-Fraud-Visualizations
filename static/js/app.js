// Creating the map object
let myMap;
// Creating the marker cluster group
let markers = L.markerClusterGroup();

// Function to initialize the map
function initializeMap() {
  myMap = L.map("map", {
    center: [37.0902, -95.7129], // Centered on the United States
    zoom: 4 // Zoom level adjusted to show the entire country
  });

  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
}

// Function to display the fraud density map
function displayFraudDensityMap() {
  // Define the JSON URL
  let fraudAddressURL = '/api/fraud_address';

  // Load the JSON data using d3
  d3.json(fraudAddressURL).then(function(data) {
    console.log(data); // Log the data to the console

    data.forEach(function(d) {
      var marker = L.marker([d.lat, d.lng]);
      console.log([lat, lng])
      if (!isNaN(d.lat) && !isNaN(d.lng)) {
        // Create a marker for each data point
        let marker = L.marker([d.lat, d.lng]);
      
        // Add the marker to the marker cluster group
        markers.addLayer(marker);
      }
    });

    // Add the marker cluster group to the map
    map.addLayer(markers);
  }).catch(error => console.log("Error loading JSON data:", error));
}

// Function to handle dropdown menu selection change event
function optionChanged(selectedOption) {
  if (selectedOption === "option1") {
    // Initialize the map if it's not already initialized
    if (!myMap) {
      initializeMap();
    }

    // Display Fraud Density Map
    document.getElementById("map").style.display = "block"; // Show the map
    displayFraudDensityMap();
  } else {
    // Hide the map for other options
    document.getElementById("map").style.display = "none";
  }
}

// Function to handle dropdown menu selection change event
function optionChanged(selectedOption) {
  if (selectedOption === "option1") {
    // Initialize the map if it's not already initialized
    if (!myMap) {
      initializeMap();
    }

    // Display Fraud Density Map
    document.getElementById("map").style.display = "block"; // Show the map
    displayFraudDensityMap();
  } else {
    // Hide the map for other options
    document.getElementById("map").style.display = "none";
  }
}

