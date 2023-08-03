const express = require('express');
const app = express();
const port = 3000;
const graphData = require('./graph.json');


app.set('views', 'views');
app.set('view engine', 'hbs');
app.use(express.static('public'));


app.get('/', (request, response) => {
    response.render('home');
});

app.get('/data', (request, response) => {
    // Convert the dummyData object to JSON-serializable format
    const jsonData = JSON.parse(JSON.stringify(graphData.data));
    // Send the data as JSON response
    response.json(jsonData);
});
// app.get('/data', (request, response) => {
//     //The data here is just for demo
//     // Send the graph data as JSON response
//     console.log(graphData)
//     response.json(graphData.data);
//   });


app.listen(port);
console.log(' hello server listening on port 3000');



// const bodyParser = require('body-parser');
 const fs = require('fs');

// const jsonParser = bodyParser.json();
// const fileName = 'graph.json';

// Load data from file
// let rawData = fs.readFileSync(fileName);
// let data = JSON.parse(rawData);

// // This is a RESTful GET web service
// app.get('/students', (request, response) => {
//     data.sort((a, b) => (a.name > b.name) ? 1 : -1 );
//     response.send(data);
// });

// This is a RESTful POST web service
// app.post('/students', jsonParser, (request, response) => {
//     data.push(request.body);
//     fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
//     response.end();
// });
// util functions
const saveData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync(graphData, stringifyData)
}
const getData = () => {
    const jsonData = fs.readFileSync(graphData)
    return JSON.parse(jsonData)   
}
// delete - using delete method
app.delete('/data/${year}', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      var existItems = getData()
      const itemYear = req.params['year'];
      delete existItems[itemYear]; 
      saveData(existItems);
      res.send(`accounts with id ${itemYear} has been deleted`)
    }, true);
  })