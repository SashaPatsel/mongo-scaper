// Dependencies
var express = require("express");
var mongojs = require("mongojs");

// Require request and cheerio. This makes the scraping possible
var request = require("request");
var cheerio = require("cheerio");

// Initialize Express
var app = express();

// Database configuration


app.use(express.static("public"));
// var db = require("./models");
var mongoose = require("mongoose");
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/ringerSim", {
});

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// Hook mongojs configuration to the db variable
// Require all models
var db = require("./models");

// require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);




// Listen on port 1993
app.listen(1993, function() {
  console.log("App running on port 1993!");
});

