$(document).on("click", "#scraper", function() {
    $.ajax({
    method: "GET",
    url: "/scraper"
  }).then(function(data) {
    console.log(data)
  })
})

$(document).on("click", ".saver", function() {
  
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "POST",
    url:"/saved/" + thisId
  }).then(function(data) {
    console.log(data)
  })
})