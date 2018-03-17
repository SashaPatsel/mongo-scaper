var request = require("request");
var cheerio = require("cheerio");



module.exports = function(app) {

  var featured = [];
  var secondary = []
  app.get("/scrape", function(req, res) {
    
    request("https://www.theringer.com/", function(error, response, html) {

 
  // Cheerio
  var $ = cheerio.load(html);
  
  // h2.c-entry-box--compact__title
  $("div.c-entry-box--compact").each(function(i, element) {


    var articles = $(element).find("h2.c-entry-box--compact__title").text()
    var link = $(element).children("a").attr("href")
    var img = $(element).find("img").attr("src")
    // Push the image's URL (saved to the imgLink var) into the featured array\
    
    if (featured.length < 5) {
        featured.push({ 
          articles: articles,
          link: link,
          img: img 
         });
    } else {
        secondary.push({ 
          articles: articles,
          link: link
         });
    }
          db.Article.create(featured)
        .then(function(dbArticle) {
          console.log(dbArticle);
        })
        .catch(function(err) {
          return res.json(err);
        });
  });

  // After looping through each element found, log the featured to the console
  // console.log(featured);
    // console.log(featured, "============");
       res.render("home", {featured:featured})
       // , {secondary:secondary}
});

  });


};
