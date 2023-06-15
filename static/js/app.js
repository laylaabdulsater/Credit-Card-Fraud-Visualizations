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

//Function to Dislay the stacked bar chart
function displayPieChart(){

  //Define the API endpoint
  let fraudMerchURL = '/api/Fraud_Merch';

  //Load the data
  d3.json(fraudMerchURL).then(function(data){ 
    //Parse the data
    data.forEach(d=> {
      d.amt= +d.amt;
    });

    //Create D3 Pie Layout
    pie = d3.pie()
      .value(d=>d.amt)
      .sort(null);

    //Specify the colors for the pie slices
    let colorScale = d3.scaleOrdinal()
      .domain(data.map(d=>d.category))
      .range(d3.schemeCategory10);

    //Select the char container element
    let chartContainer = d3.select("#chart");

    //Clear the existing chart
    chartContainer.html("");

    // Append the chart to the chart container
    let svg = chartContainer.append("svg")
      .attr("width", 800)
      .attr("height", 800)
      .append("g")
      .attr("transform", "translate (400, 400)");
    
    //Generate the pie slices
    let arcs = svg.selectAll("arc")
      .data(pie(data))
      .enter()
      .append("g");

    //Add the pie slices as pie elements
    arcs.append("path")
      .attr("d", d3.arc().innerRadius(0).outerRadius(150))
      .attr("fill", d=> colorScale(d.data.category))
      .attr("stroke", "white")
      .style("stroke-width", "2px");

    //Add legend
    let legend = svg.selectAll(".legend")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr("transform", (d, i) => `translate (250,${i*25})`);

    legend.append("rect")
      .attr("x", -18)
      .attr("y", -10)
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", d=> colorScale(d.category));

    legend.append("text")
      .attr("x", 15)
      .attr("y", 9)
      .attr("dy", "0.35em")
      .text(d=> d.category);    
    }).catch(error => console.log("Error loading the Pie chart:", error));
}

// Create Bar Chart
function displayGenderChart(){
let fraudPersonalURL = '/api/fraud_personal';

  // Load the JSON data using d3
  d3.json(fraudPersonalURL).then(function(data) {
  // Get the canvas element
  const ctx = document.getElementById('genderChart').getContext('2d');
  // Fetch the CSV file
  fetch('Fraud_Personal.csv')
    .then(response => response.text())
    .then(csvData => {
      // Parse the CSV data using Papa Parse
      const parsedData = Papa.parse(csvData, { header: true }).data;
      // Extract male and female data
      let maleCount = 0;
      let femaleCount = 0;
      parsedData.forEach(row => {
        if (row.gender === 'M') {
          maleCount++;
        } else if (row.gender === 'F') {
          femaleCount++;
        }
      });
      // Define the data for the bar chart
      const data = {
        labels: ['M', 'F'],
        datasets: [{
          label: 'Number of People',
          data: [maleCount, femaleCount],
          backgroundColor: ['blue', 'pink'],
          borderWidth: 1
        }]
      };
      // Create the bar chart
      const genderChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
          scales: {
            y: {
              beginAtZero: true,
              max: Math.max(maleCount, femaleCount) // Adjust the maximum value if needed
            }
          }
        }
      });
    })
    .catch(error => console.error('Error fetching CSV file:', error));
})};

// Function to handle dropdown menu selection change event
function optionChanged(selectedOption) {
  if (selectedOption === "option1") {
     // Initialize the map if it's not already initialized
     if (!myMap) {
      initializeMap();
    }
    // Display Fraud Density Map
    document.getElementById("map").style.display = "block"; // Show the map
    document.getElementById("chart-container").style.display = "none"; // Hide the chart
    displayFraudDensityMap();
  } else if (selectedOption === "option2") {
    document.getElementById("map").style.display="none"; //Hide the map
    document.getElementById("chart-container").style.display = "block"; //Show the chart
    displayPieChart();
  } else {
    // Hide the map for other options
    document.getElementById("map").style.display = "none";
    document.getElementById("chart-container").style.display = "none"; 
  }
}