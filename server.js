// Dependencies
var express = require("express");
var mongojs = require("mongojs");
var bodyParser = require("body-parser");
// Require request and cheerio. This makes the scraping possible
var request = require("request");
var cheerio = require("cheerio");

// Initialize Express
var app = express();


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");
mongoose.Promise = Promise;

// if (process.env.MONGODB_URI) {
//   mongoose.connect(process.env.MONGODB_URI);
// } 

// else {
//   mongoose.connect("mongodb://localhost/ringerSim", {
//   });
// }

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

var db = require("./models");
// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// Hook mongojs configuration to the db variable
// Require all models

// require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);




// Listen on port 1993
app.listen(1993, function() {
  console.log("App running on port 1993!");
});

