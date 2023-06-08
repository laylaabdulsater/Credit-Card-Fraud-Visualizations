document.addEventListener('DOMContentLoaded', function() {
    // Code to execute when DOM is ready

    // Load the data from CSC file
    d3.csv('static/data/creditcardfraud.csv').then(data => {
        // Process the data

        // Create the dropdown menu
        let dropdown = d3.select("#selDataset");

        // Populate the dropdown menu
        let categories = [...new Set(data.map(d => d.category))];
        categories.forEach(category => {
            dropdown.append("option").attr("value", category).text(category);
        });

        // Add event listener to the dropdown menu change
        dropdown.on("change", optionChanged);

        //Function to update the plots
        function optionChanged () {
            let selectedOption = dropdown.property("value")

            let filteredData = data.filter(d => d.first === selectedOption);

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
                x: filteredData.map(d => d.trans_date_trans_time),
                y: filteredData.map(d => d.amt),
                type: "bar"
            };
        
            let data1 = [trace1];

            let layout1 = {
                title: `Transactions for ${selectedOption}`,
                xaxis: { title: "Transaction Date" },
                yaxis: { title: "Amount" }
            };

            // Create the chart
            Plotly.newPlot("chart1", data1, layout1);

            //Second chart
            let trace2 = {
                x: filteredData.map(d => d.trans_date_trans_time),
                y: filteredData.map(d => d.city_pop),
                type: "line"
            };
        
            let data2 = [trace2];

            let layout2 = {
                title: `City Population for ${selectedOption}`,
                xaxis: { title: "Transaction Date" },
                yaxis: { title: "City Population" }
            };

            // Create the chart
            Plotly.newPlot("chart2", data2, layout2);

            //Third chart
            let trace3 = {
                x: filteredData.map(d => d.trans_date_trans_time),
                y: filteredData.map(d => d.is_fraud),
                type: "scatter",
                mode: "markers"
            };

            let data3 = [trace3];

            let layout3 = {
                title: `Fraudulent Transactions for ${selectedOption}`,
                xaxis: { title: "Transaction Date" },
                yaxis: { title: "Is Fraudulent" }
            };

            // Create the chart
            Plotly.newPlot("chart3", data3, layout3)
        }

        //Display the plot
        optionChanged();

    }).catch(error => console.log("Error fetching data:", error));

});
