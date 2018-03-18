$(document).on("click", "#scraper", function() {
    $.ajax({
    method: "GET",
    url: "/scraper"
  }).then(function(data) {
    console.log(data)
  })
})

$(document).on("click", ".saver", function() {
  
  var thisId = $(this).data("id");

  $.ajax({
    method: "POST",
    url:"/saved/" + thisId,
  }).then(function(data) {
    console.log(data)
  })
})

$(document).on("click", ".unsaver", function() {
  
  var thisId = $(this).data("id");

  $.ajax({
    method: "POST",
    url:"/unsaved/" + thisId,
  }).then(function(data) {
    console.log(data)
  })
})