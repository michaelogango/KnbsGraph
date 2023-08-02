const express = require('express');
const app = express();
const port = 3000;
const graphData = require('./graph.json');


app.set('views', 'views');
app.set('view engine', 'hbs');
app.use(express.static('public'));

app.use(express.json());

app.post('/add-data', (request, response) => {
    const { year, item, price } = request.body;
    const graphData = readGraphData();
  
    try {
      // Check if the year exists in the graphData, if not, create an empty array for it
      if (!graphData.data[year]) {
        graphData.data[year] = [];
      }
  
      // Set the "id" field before adding the new data
      const id = graphData.data[year].length; // Use the current length as the ID (index)
      const newData = { id, name: item, price };
  
      // Add the new data to the corresponding year
      graphData.data[year].push(newData);
  
      // Update the graph.json file with the new data
      const fs = require('fs');
      fs.writeFileSync('./graph.json', JSON.stringify(graphData, null, 2));
  
      response.sendStatus(200);
    } catch (error) {
      console.error('Error adding data:', error);
      response.sendStatus(500);
    }
  });
  
app.get('/', (request, response) => {
    response.render('home');
});

// Function to read graph data from graph.json file
function readGraphData() {
  try {
    const graphData = require('./graph.json');
    return graphData;
  } catch (error) {
    console.error('Error reading graph data:', error);
    return { data: {} };
  }
}

app.get('/data', (request, response) => {
  const graphData = readGraphData();

  // Send the data as JSON response
  response.json(graphData.data);
});

app.post('/add-data', (request, response) => {
  const { year, item, price } = request.body;
  const graphData = readGraphData();

  try {
    // Check if the year exists in the graphData, if not, create an empty array for it
    if (!graphData.data[year]) {
      graphData.data[year] = [];
    }

    // Set the "id" field before adding the new data
    const id = graphData.data[year].length; // Use the current length as the ID (index)
    const newData = { id, name: item, price };

    // Add the new data to the corresponding year
    graphData.data[year].push(newData);

    // Update the graph.json file with the new data
    const fs = require('fs');
    fs.writeFileSync('./graph.json', JSON.stringify(graphData, null, 2));

    response.sendStatus(200);
  } catch (error) {
    console.error('Error adding data:', error);
    response.sendStatus(500);
  }
});


app.listen(port);
console.log(' hello server listening on port 3000');

