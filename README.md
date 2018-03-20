# The Ringer Scraper

The Ringer Scraper uses data from (theringer.com)'s home page to display all the articles currently posted on that page. All articles are linked in the same way as (theringer.com)'s to their original posting.

Users on this app can save their favorite articles as well as comment on them. Clicking "refresh articles" in the navbar at the top of the screen allows users to ensure they are seeing the most recent content from (theringer.com).


## Getting Started

To use this app, clone it down on your own device. 


### Installing

Navigate to the app in your terminal, and enter `npm i` to make sure you've installed all the appropriate packages.

Once installed, enter `node server.js` into your terminal (make sure you're still in the app directory).


### Functionality

#### The app:
<img src="images/Screenshot 2018-03-19 19.16.18.png" height="400px" width="300">

<img src="images/Screenshot 2018-03-19 19.29.10.png" height="200px" width="250">

#### Code:
The Scrape:
```
 var title = $(element).find("h2.c-entry-box--compact__title").text()

var link = $(element).children("a").attr("href")
            
var img = $(element).find("img").attr("src")
            
var subHead = $(element).find("p.p-dek").text()
```

A GET route for the artilces, and a POST route for the save:
```
$(document).on("click", "#scraper", function() {
    $.ajax({
    method: "GET",
    url: "/scraper"
  }).then(function(data) {
    console.log(data)
  })
})

$(document).on("click", ".saver", function() {
  event.preventDefault()
  var thisId = $(this).data("id");

  $.ajax({
    method: "POST",
    url:"/saved/" + thisId,
  }).then(function(data) {
    console.log(data)
  })
})

```



## Built With

* [Mongodb]
* [Mongoose]
* [jQuery]
* [Node.js]
* [Cheerio]
* [Express]


## Authors

* **Sasha Patsel** - *Initial work* - (https://github.com/SashaPatsel)


