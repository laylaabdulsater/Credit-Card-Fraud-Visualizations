// Creating the map object
let myMap;

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
  // Initialize the map
  initializeMap();

  // Define the CSV file path
  let csvFilePath = 'Fraud_address.csv';

  // Load the CSV file using d3 and parse the data
  d3.csv(csvFilePath).then(function(data) {
    // Create a new marker cluster group
    let markers = L.markerClusterGroup();

    // Loop through the data and add markers to the marker cluster group
    data.forEach(d => {
      let lat = parseFloat(d.lat);
      let lng = parseFloat(d.long);

      if (!isNaN(lat) && !isNaN(lng)) {
        // Create a circle marker for each data point
        let marker = L.circleMarker([lat, lng], {
          radius: 5, // Adjust the radius as needed
          fillOpacity: 0.6
        });

        markers.addLayer(marker);
      }
    });

    // Add our marker cluster layer to the map
    myMap.addLayer(markers);
  }).catch(error => console.log("Error loading CSV file:", error));
}

// Function to handle dropdown menu selection change event
function optionChanged(selectedOption) {
  if (selectedOption === "option1") {
    // Display Fraud Density Map
    document.getElementById("map").style.display = "block"; // Show the map
    displayFraudDensityMap();
  } else {
    // Hide the map for other options
    document.getElementById("map").style.display = "none";
  }
}