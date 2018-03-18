var request = require("request");
var cheerio = require("cheerio");
var db = require("../models");


module.exports = function(app) {

    var articles = [];
    // var secondary = []

    app.get("/scrape", function(req, res) {

        request("https://www.theringer.com/", function(error, response, html) {


            // Cheerio
            var $ = cheerio.load(html);

            // h2.c-entry-box--compact__title
            $("div.c-entry-box--compact").each(function(i, element) {


                var title = $(element).find("h2.c-entry-box--compact__title").text()
                var link = $(element).children("a").attr("href")
                var img = $(element).find("img").attr("src")
                var subHead = $(element).find("p.p-dek").text()

                // if (articles.length < 5) {
                    articles.push({
                        fTitle: title,
                        subHead: subHead,
                        fLink: link,
                        img: img,
                        featured: true
                    });
                // }
                function storeArticles() {
                  db.Article.create(articles)
                    try {
                    throw console.log("try")
                    }
                    catch(err) {
                    console.log(err)
                    }
                    finally {
                    console.log("chicken")
                    }
                }
                // .catch(function(err) {
                //         return res.json(err);
                //     }).finally(function(){
                //         // res.render("error")
                //         console.log("chicken")


                //     });
            });
            // console.log(articles)
            res.render("home", { articles: articles })

        });

    });

    app.get("/", function(req, res) {
     db.Article.find({})
     .then(function(dbArticle) {
       res.render("home", {articles: dbArticle})
     })
    })   

    app.post("/saved/:id", function(req, res) {
        db.Article.findOneAndUpdate({ _id: req.params.id }, { saved: true })
            .then(function(dbSaved) {
                // {note: dbNote._id },
                console.log("======================", dbSaved)
            });
    })


    app.get("/saved", function(req, res) {
        db.Article.find({ saved: true })
            .then(function(dbArticle) {
                console.log(dbArticle)
                res.render("saved", {articles: dbArticle})
            })
    })
        app.post("/unsaved/:id", function(req, res) {
        db.Article.findOneAndUpdate({ _id: req.params.id }, { saved: false })
            .then(function(dbSaved) {
                // {note: dbNote._id },
                console.log("======================", dbSaved)
            });
    })


};