var request = require("request");
var cheerio = require("cheerio");
var db = require("../models");


module.exports = function(app) {

    var featured = [];
    var secondary = []

    app.get("/scrape", function(req, res) {

     request("https://www.theringer.com/", function(error, response, html) {


         // Cheerio
         var $ = cheerio.load(html);

         // h2.c-entry-box--compact__title
         $("div.c-entry-box--compact").each(function(i, element) {


             var title = $(element).find("h2.c-entry-box--compact__title").text()
             var link = $(element).children("a").attr("href")
             var img = $(element).find("img").attr("src")

             if (featured.length < 5) {
                 featured.push({
                     fTitle: title,
                     fLink: link,
                     img: img
                 });
             } 
             // else {
             //     featured.push({
             //         sTitle: title,
             //         sLink: link
             //     });
             // }

             db.Article.create(featured)
                 // .then(function(dbArticle) {
                 //     console.log(dbArticle);
                 // })
                 .catch(function(err) {
                     return res.json(err);
                 });
         });

         // After looping through each element found, log the featured to the console
         // console.log(featured);
         // console.log(featured, "============");
         console.log(featured)
         res.render("home", { featured: featured })
         // res.render("home", { featured: featured  , {secondary:secondary}})
     });

 });

    app.post("/saved/:id", function(req, res) {
      db.Article.findOneAndUpdate({_id: req.params.id}, { saved: true});
// {note: dbNote._id },
    }) 

    app.get("/saved", function(req, res) {
      db.Article.find({saved: true}).then(function(dbArticle) {
        console.log(dbArticle)
        res.render("saved", dbArticle)
      })
    })


};