var express = require("express");
var bodyParser = require("body-parser");
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

            //add category heading
            // if (articles.length < 5) {
            articles.push({
                fTitle: title,
                subHead: subHead,
                fLink: link,
                img: img,
                featured: true
            });
            // }
            storeArticles()

            function storeArticles() {
                db.Article.create(articles)
                try {
                    throw console.log("try")
                } catch (err) {
                    console.log(err)
                } finally {
                    console.log("finally")
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
            res.render("home", { articles: dbArticle })
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
            res.render("saved", { articles: dbArticle })
        })
})
app.post("/unsaved/:id", function(req, res) {
    db.Article.findOneAndUpdate({ _id: req.params.id }, { saved: false })
        .then(function(dbSaved) {
            // {note: dbNote._id },
            console.log("======================", dbSaved)
        });
})

app.post("/comments/:id", function(req, res) {

    db.Comment.create(req.body)
        .then(function(dbComment) {
          console.log(req.body)
          console.log("106", dbComment)
        return db.Article.findOneAndUpdate({ _id: req.params.id }, { comment: dbComment._id }, { new: true });
        })
        .then(function(dbComment) {
            // If the User was updated successfully, send it back to the client
            console.log(dbComment)
            res.json(dbComment);
        })
        .catch(function(err) {
            // If an error occurs, send it back to the client
            res.json(err);
        });

})



app.get("/comments/:id", function(req, res) {

  db.Article
  .findOne({ _id: req.params.id})
  .populate("comment")
  .then(function(dbArticle) {
    res.json(dbArticle);
  })
  .catch(function(err) {
    res.json(err)
  })

});
};