// Creating the map object
let myMap;

<<<<<<< HEAD
// Function to initialize the map
function initializeMap() {
  myMap = L.map("map", {
    center: [37.0902, -95.7129], // Centered on the United States
    zoom: 4 // Zoom level adjusted to show the entire country
  });
=======
    // Load the data from CSC file
    d3.csv('static/data/Fraud_Database.csv').then(data => {
        // Process the data
>>>>>>> main

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

<<<<<<< HEAD
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
=======
            let filteredData = data.filter(d => d.category === selectedOption);

            // General Info Panel
            let panelBody = d3.select("#sample-metadata");
            panelBody.html("");

            //Display the info from the selected option (first name)
            let selectedInfo = filteredData[0];
            Object.entries(selectedInfo).forEach(([key, value]) => {
                panelBody.append("p").text(`${key}: ${value}`);
            });

            updateCharts(filteredData);
        }

        function updateCharts(filteredData) {

            //First chart
            let trace1 = {
                x: filteredData.map(d => d.gender),
                y: filteredData.map(d => d.amt),
                type: "bar"
            };
        
            let data1 = [trace1];

            let layout1 = {
                title: `Transactions for ${selectedOption}`,
                xaxis: { title: "Transaction by Gender" },
                yaxis: { title: "Amount" }
            };

            // Create the chart
            Plotly.newPlot("chart1", data1, layout1);

            //Second chart
            let trace2 = {
                x: filteredData.map(d => d.state),
                y: filteredData.map(d => d.amt),
                type: "line"
            };
        
            let data2 = [trace2];

            let layout2 = {
                title: `City Population for ${selectedOption}`,
                xaxis: { title: "Transaction by State" },
                yaxis: { title: "Amount" }
            };

            // Create the chart
            Plotly.newPlot("chart2", data2, layout2);

            //Third chart
            let trace3 = {
                x: filteredData.map(d => d.job),
                y: filteredData.map(d => d.amt),
                type: "scatter",
                mode: "markers"
            };

            let data3 = [trace3];

            let layout3 = {
                title: `Fraudulent Transactions for ${selectedOption}`,
                xaxis: { title: "Transaction by Job" },
                yaxis: { title: "Amount" }
            };

            // Create the chart
            Plotly.newPlot("chart3", data3, layout3)
        

        //Display the plot
        optionChanged();

        }

    }).catch(error => console.log("Error fetching data:", error));

});
>>>>>>> main
