// Dependencies
var express = require("express");
var mongojs = require("mongojs");

// Require request and cheerio. This makes the scraping possible
var request = require("request");
var cheerio = require("cheerio");

// Initialize Express
var app = express();

// Database configuration
var databaseUrl = "scraper";
var collections = ["scrapedData"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});


request("https://www.theringer.com/", function(error, response, html) {

  // Load the HTML into cheerio
  var $ = cheerio.load(html);

  // Make an empty array for saving our scraped info
  var results = [];

  // Cheerio
  
  // h2.c-entry-box--compact__title
  $("div.c-entry-box--compact").each(function(i, element) {


    var articles = $(element).find("h2.c-entry-box--compact__title").text()
    var link = $(element).children("a").attr("href")
    var img = $(element).find("img").attr("src")
    // Push the image's URL (saved to the imgLink var) into the results array
    results.push({ 
      articles: articles,
      link: link,
      img: img 
     });
  });

  // After looping through each element found, log the results to the console
  console.log(results);
});


// Listen on port 3000
app.listen(1993, function() {
  console.log("App running on port 1993!");
});