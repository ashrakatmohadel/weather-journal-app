// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Require Express to run server and routes
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Start up an instance of app
const app = express();
// port
const port = 10;

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
//comment `running on: http://localhost:10`
app.listen(port, () => {
  console.log(`running on: http://localhost:${port}`);
});
// Callback function to complete GET '/all', status succeeded
app.get("/all", (req, res) => {
  res.send(projectData).status(200);
});
// Post Route, status succeeded
app.post("/postData", (req, res) => {
  projectData = {
    temp: req.body.temp,
    date: req.body.date,
    content: req.body.content,
  };
  res.send(projectData).status(200);
});
