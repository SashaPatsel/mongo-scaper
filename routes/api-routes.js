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
            // // if (articles.length < 5) {
              if (img.startsWith("data")) {
                img = "https://dfkfj8j276wwv.cloudfront.net/images/41/ec/3a/44/41ec3a44-37f8-4378-9cb6-8e2027563858/d31d6c3628a592d9504336c9a9c8897fd64f24bead2d50445c23991f5e708368f9404a50c21db8b99e261078adb6e624cbfed6f12532fde267941984ffb7f090.jpeg"
              }

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
                //Please tell me there is an alternative to this :). (tried to render an error page on the catch but it didn't work)
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

        return db.Article.findOneAndUpdate({ _id: req.params.id }, { $push: { comment: dbComment._id } }, { new: true });
        })
        .then(function(dbComment) {
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
    console.log("127",dbArticle.comment[0].text);
    res.send({comments: dbArticle})
  })
  .catch(function(err) {
    res.json(err)
  })

});

app.post("/deletecomments/:id", function(req, res) {

    db.Comment.remove({_id: req.params.id})
        .then(function(dbComment) {
          console.log("delete id", dbComment)
        // return db.Article.findOneAndUpdate({ _id: req.params.id }, { $push: { comment: dbComment._id } }, { new: true });
        })
        // .then(function(dbComment) {
        //     res.json(dbComment);
        // })
        // .catch(function(err) {
        //     // If an error occurs, send it back to the client
        //     res.json(err);
        // });

})
};